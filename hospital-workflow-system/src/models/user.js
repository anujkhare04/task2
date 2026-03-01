const mongoose = require("mongoose");

const userschema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["ADMIN", "STAFF","USER"],
      default: null,
    },

    department: {
      type: String,
      enum: [
        "Registration department",
        "Radiology department",
        "Billing department",
        "Reports department",
      ],
     default: null
    },
  },

  {
    timestamps: true,
  },
);

const usermodel = mongoose.model("usermodel", userschema);

module.exports = usermodel;
