const userModel = require("../models/user");
const AuthMiddleware = require("./authMiddleware");

const AdminMiddleware = async (req, res, next) => {
  try {
    const usersCount = await userModel.countDocuments();

    // If no users exist → allow first admin creation
    if (usersCount === 0) {
      req.isAdmin = true;
      return next();
    }

    // Require authentication
    AuthMiddleware(req, res, (err) => {
      if (err) return next(err);

      if (!req.user || req.user.role !== "ADMIN") {
        return res.status(403).json({
          success: false,
          message: "Only admin can register Staff",
        });
      }

      req.isAdmin = true;
      return next();
    });

  } catch (error) {
    return next(error);
  }
};

module.exports = AdminMiddleware;