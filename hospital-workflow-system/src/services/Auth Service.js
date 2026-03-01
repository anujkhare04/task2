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
  const { email, password, name } = req.body;

  if (!email || !password || !name ) {
    throw new ApiError("Missing required fields", 400);
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
