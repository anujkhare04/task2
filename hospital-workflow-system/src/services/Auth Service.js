const usermodel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

const ALLOWED_DEPARTMENTS = [
  "Registration department",
  "Radiology department",
  "Billing department",
  "Reports department",
];

// ================= REGISTER =================
const register = async (req) => {
  const { email, password, name, role, department } = req.body;

  if (!email || !password || !name || !role) {
    throw new ApiError("Missing required fields", 400);
  }

  // Check if first admin
  if (role === "ADMIN") {
    const adminExists = await usermodel.findOne({ role: "ADMIN" });
    if (adminExists) {
      throw new ApiError("Only one Admin is allowed", 400);
    }
  }

  // If not first admin → only admin can create users
  if (role !== "ADMIN") {
    if (!req.user || req.user.role !== "ADMIN") {
      throw new ApiError("Only Admin can register STAFF", 403);
    }
  }

  if (role === "STAFF") {
    if (!department) {
      throw new ApiError("Department is required for STAFF", 400);
    }

    if (!ALLOWED_DEPARTMENTS.includes(department)) {
      throw new ApiError("Invalid department", 400);
    }
  }

  const existingUser = await usermodel.findOne({ email });
  if (existingUser) {
    throw new ApiError("User already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await usermodel.create({
    name,
    email,
    password: hashedPassword,
    role,
    department: role === "STAFF" ? department : null,
  });

  const token = jwt.sign(
    {
      id: newUser._id,
      role: newUser.role,
      department: newUser.department,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    token,
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      department: newUser.department,
    },
  };
};

// ================= LOGIN =================
const login = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError("Email and password are required", 400);
  }

  const user = await usermodel.findOne({ email });
  if (!user) {
    throw new ApiError("User not found", 404);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError("Invalid credentials", 401);
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      department: user.department,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
    },
  };
};

// ================= PROFILE =================
const profile = async (req) => {
  if (!req.user) {
    throw new ApiError("Unauthorized", 401);
  }

  const user = await usermodel
    .findById(req.user.id)
    .select("-password");

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  return user;
};

module.exports = { register, login, profile };
