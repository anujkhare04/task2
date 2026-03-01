const userModel = require("../models/user");
const ApiError = require("../utils/ApiError");

const ALLOWED_DEPARTMENTS = [
  "Registration department",
  "Radiology department",
  "Billing department",
  "Reports department",
];

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  department: user.department,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

/**
 * Assign a user to a department (admin only).
 */
const assignDepartment = async (userId, department) => {
  if (!department) {
    throw new ApiError("Department is required", 400);
  }

  if (!ALLOWED_DEPARTMENTS.includes(department)) {
    throw new ApiError("Invalid department", 400);
  }

  const user = await userModel.findById(userId);
  if (!user) {
    throw new ApiError("User not found", 404);
  }

  if (user.role === "ADMIN") {
    throw new ApiError("Cannot assign department to ADMIN", 403);
  }

  user.department = department;
  await user.save();

  return sanitizeUser(user);
};

/**
 * List all users in the requester's department.
 * Admins can optionally view any department by passing req.user.department (null) -> error handled.
 */
const listUsersInDepartment = async (requestingUser, overrideDepartment) => {
  if (!requestingUser) {
    throw new ApiError("Unauthorized", 401);
  }

  // Admins may override department via query param; staff are limited to their own
  const departmentToQuery =
    requestingUser.role === "ADMIN"
      ? overrideDepartment || requestingUser.department
      : requestingUser.department;

  if (!departmentToQuery) {
    throw new ApiError("Department is missing for this user", 400);
  }

  if (!ALLOWED_DEPARTMENTS.includes(departmentToQuery)) {
    throw new ApiError("Invalid department", 400);
  }

  const users = await userModel
    .find({ department: departmentToQuery })
    .select("-password");

  return users.map(sanitizeUser);
};

module.exports = {
  assignDepartment,
  listUsersInDepartment,
};
