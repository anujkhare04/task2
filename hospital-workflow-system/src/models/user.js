
const mongoose = require("mongoose");


const userschema = mongoose.Schema(
  {
    email: {
      type: String,
    },

    phoneNumber: {
      type: Number,
      required: true,
    },

    fullname: {
      firstname: {
        type: String,
        required: true,
      },
      middlename: {
        type: String,
      },
      lastname: {
        type: String,
        required: true,
      },
    },

    password: {
      type: String,
      required: true,
    },

    role: {
  type: String,
  enum: ["ADMIN", "STAFF"],
  required: true
},

department: {
  type: String,
  enum: ["Registration", "Radiology", "Billing", "Reports"],
  required: function () {
    return this.role === "STAFF";
  }
}
  },

  {
    timestamps: true,
  },
);

const usermodel = userschema.model("usermodel", userschema);

module.exports = usermodel;
