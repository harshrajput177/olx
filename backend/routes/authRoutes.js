const express = require("express");
const router = express.Router();
const authController = require("../Controller/authController");
const authMiddleware = require("../Middleware/Middleware");

// Public Routes
router.post("/send-otp", authController.sendOTP);
router.post("/register", authController.register);
router.post("/verify", authController.verifyOTP);
router.post("/login", authController.login);
router.post("/google-login", authController.googleLogin);

// Protected Route (example)
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      user: req.user, // user info from middleware
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching profile" });
  }
});

module.exports = router;
