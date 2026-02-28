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

const listUsers = async () => {
  const users = await userModel.find().select("-password");
  return users.map(sanitizeUser);
};

const updateUser = async (id, payload) => {
  const user = await userModel.findById(id);

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  if (user.role === "ADMIN") {
    throw new ApiError("Cannot modify the permanent admin", 403);
  }

  if (payload.role && payload.role !== "STAFF") {
    throw new ApiError("Only STAFF role is allowed for updates", 400);
  }

  if (payload.department && !ALLOWED_DEPARTMENTS.includes(payload.department)) {
    throw new ApiError("Invalid department", 400);
  }

  ["name", "email", "department"].forEach((field) => {
    if (payload[field] !== undefined) {
      user[field] = payload[field];
    }
  });

  await user.save();
  return sanitizeUser(user);
};

const deleteUser = async (id) => {
  const user = await userModel.findById(id);

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  if (user.role === "ADMIN") {
    throw new ApiError("Cannot delete the permanent admin", 403);
  }

  await userModel.findByIdAndDelete(id);

  return { message: "User deleted successfully" };
};

module.exports = {
  listUsers,
  updateUser,
  deleteUser,
};
