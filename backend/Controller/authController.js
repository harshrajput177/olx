const User = require("../Model/UserSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendOTP = require("../Utils/Sendotp");

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Please verify OTP first" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: "Email not verified" });
    }

    user.name = name;
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.status(200).json({ message: "Registration complete" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
};



exports.sendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });

    const otp = generateOTP();
    const otpExpires = Date.now() + 5 * 60 * 1000;

    if (!user) {
      // if no user, create temp user with just email, otp
      user = new User({ email, otp, otpExpires, isVerified: false });
    } else {
      if (user.isVerified) {
        return res.status(400).json({ message: "Email already verified. Please login." });
      }

      // overwrite OTP and expiry
      user.otp = otp;
      user.otpExpires = otpExpires;
    }

    await user.save();
    await sendOTP(email, otp);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("Send OTP Error:", err);
    res.status(500).json({ message: "Error sending OTP" });
  }
};

// ✅ OTP Verification — Step 2
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.isVerified) {
      return res.status(404).json({ message: "No pending verification found" });
    }

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified and account activated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error verifying OTP" });
  }
};

// ✅ Login — Step 3
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !user.isVerified) {
      return res.status(401).json({ message: "Invalid credentials or email not verified" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

res.status(200).json({
  message: "Login successful",
  token,
  user: {
    _id: user._id,
    name: user.name,
    email: user.email,
  }
});

  } catch (err) {
    res.status(500).json({ message: "Login error" });
  }
};
