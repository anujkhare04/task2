const roleService = require("../services/roleService");

// PATCH /api/admin/users/:id/role
const assignRoleController = async (req, res, next) => {
  try {
    const updated = await roleService.assignRole(
      req.params.id,
      req.body.role,
      req.body.department,
    );
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

module.exports = { assignRoleController };
