const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/roleMiddleware");
const departmentMiddleware = require("../middleware/departmentMidlleware");
const {
  assignDepartmentController,
  listDepartmentUsersController,
} = require("../controllers/departmentController");

// Admin can assign a user to a department
router.patch(
  "/users/:id/department",
  auth,
  adminOnly,
  assignDepartmentController,
);

// Staff can view users only within their department
router.get(
  "/users",
  auth,
  departmentMiddleware([
    "Registration department",
    "Radiology department",
    "Billing department",
    "Reports department",
  ]),
  listDepartmentUsersController,
);

module.exports = router;
