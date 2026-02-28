const jwt = require("jsonwebtoken");
const usermodel = require("../models/user");

const AuthMiddleware = async (req, res, next) => {
  try {
    let token;

    // 1️⃣ Check Authorization header (Bearer)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // 2️⃣ Common alternate header (Postman "x-access-token")
    if (!token && req.headers["x-access-token"]) {
      token = req.headers["x-access-token"];
    }

    // 3️⃣ Custom header "token"
    if (!token && req.headers.token) {
      token = req.headers.token;
    }

    // 4️⃣ If not in header, check cookies
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "JWT secret not configured",
      });
    }

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await usermodel
      .findById(decoded.id)
      .select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // 4️⃣ Attach user to request
    req.user = user;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = AuthMiddleware;
