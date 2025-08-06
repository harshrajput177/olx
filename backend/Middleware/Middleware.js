const jwt = require("jsonwebtoken");
const userModel = require("../Model/UserSchema");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized: Token missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID from token
    const user = await userModel.findById(decoded.id).select("_id name email");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = user;

    next(); // Proceed to controller
  } catch (error) {
    console.error("Auth Error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired" });
    }

    return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;
