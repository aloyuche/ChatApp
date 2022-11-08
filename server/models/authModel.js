const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String },
    phoneNumber: { type: String, required: true },
    avatarUrl: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
