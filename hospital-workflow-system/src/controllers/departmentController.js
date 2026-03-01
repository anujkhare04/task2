const departmentService = require("../services/departmentService");

// PATCH /api/department/users/:id/department
const assignDepartmentController = async (req, res, next) => {
  try {
    const updated = await departmentService.assignDepartment(
      req.params.id,
      req.body.department,
    );
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

// GET /api/department/users
const listDepartmentUsersController = async (req, res, next) => {
  try {
    const users = await departmentService.listUsersInDepartment(
      req.user,
      req.query.department,
    );
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  assignDepartmentController,
  listDepartmentUsersController,
};
