const userModel = require("../models/user");
const ApiError = require("../utils/ApiError");

const ALLOWED_ROLES = ["ADMIN", "STAFF"];
const ALLOWED_DEPARTMENTS = [
  "Registration department",
  "Radiology department",
  "Billing department",
  "Reports department",
];

/**
 * Assign or update a user's role.
 * - Only ADMIN or STAFF are allowed.
 * - Enforces a single permanent ADMIN.
 * - STAFF must belong to a valid department.
 */
const assignRole = async (userId, role, department = null) => {
  if (!ALLOWED_ROLES.includes(role)) {
    throw new ApiError("Invalid role. Only ADMIN or STAFF are allowed.", 400);
  }

  const user = await userModel.findById(userId);
  if (!user) {
    throw new ApiError("User not found", 404);
  }

  // Prevent demoting the permanent admin
  if (user.role === "ADMIN" && role !== "ADMIN") {
    throw new ApiError("Cannot change the permanent admin role", 403);
  }

  // Enforce single admin across the system
  if (role === "ADMIN") {
    const existingAdmin = await userModel.findOne({ role: "ADMIN" });
    if (existingAdmin && existingAdmin._id.toString() !== userId) {
      throw new ApiError("An admin already exists. Only one admin is allowed.", 400);
    }
    // Admins don't need a department
    user.department = null;
  }

  if (role === "STAFF") {
    if (!department) {
      throw new ApiError("Department is required for STAFF role", 400);
    }

    if (!ALLOWED_DEPARTMENTS.includes(department)) {
      throw new ApiError("Invalid department", 400);
    }

    user.department = department;
  }

  user.role = role;
  await user.save();

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    department: user.department,
    updatedAt: user.updatedAt,
  };
};

module.exports = { assignRole };
