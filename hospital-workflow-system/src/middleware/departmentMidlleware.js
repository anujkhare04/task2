const departmentMiddleware = (allowedDepartments) => {
  const allowed = Array.isArray(allowedDepartments)
    ? allowedDepartments
    : [allowedDepartments];

  return (req, res, next) => {

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    if (!allowed.includes(req.user.department)) {
      return res.status(403).json({
        success: false,
        message: "Access denied for your department"
      });
    }

    next();
  };
};

module.exports=departmentMiddleware
