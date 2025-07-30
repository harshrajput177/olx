const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String },
  otp: String,
  otpExpires: Date,
  isVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
