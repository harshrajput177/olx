const express = require("express");
const router = express.Router();

const {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  checkWishlist,
} = require("../Controller/WishlistController");

const authMiddleware = require("../Middleware/Middleware");

router.post("/add", authMiddleware, addToWishlist);
router.post("/remove", authMiddleware, removeFromWishlist);
router.get("/", authMiddleware, getWishlist);
router.get("/check/:productId", authMiddleware, checkWishlist);

module.exports = router;

