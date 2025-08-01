const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },

  // For password-based users
  password: { type: String },

  // For OTP-based verification
  otp: String,
  otpExpires: Date,
  isVerified: { type: Boolean, default: false },

  // For Google-authenticated users
  googleId: { type: String },      // Firebase UID
  avatar: { type: String },        // Profile picture URL
}, {
  timestamps: true,
});

module.exports = mongoose.model("User", userSchema);

