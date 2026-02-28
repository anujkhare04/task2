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

    // Allow global ADMIN to bypass department restrictions
    if (req.user.role === "ADMIN") {
      return next();
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
