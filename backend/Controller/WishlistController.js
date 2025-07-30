const mongoose = require("mongoose");
const Wishlist = require("../Model/WhislistSchema");

// ✅ Add to Wishlist
exports.addToWishlist = async (req, res) => {
  const userId = req.user._id || req.user.id;
  const { productId } = req.body;

  try {
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [productId] });
    } else if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
    }

    await wishlist.save();
    res.status(200).json({ success: true, message: "Added to wishlist" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Remove from Wishlist
exports.removeFromWishlist = async (req, res) => {
  const userId = req.user._id || req.user.id;
  const { productId } = req.body;

  try {
    const wishlist = await Wishlist.findOne({ user: userId });

    if (wishlist) {
      wishlist.products = wishlist.products.filter(
        (id) => id.toString() !== productId
      );
      await wishlist.save();
    }

    res.status(200).json({ success: true, message: "Removed from wishlist" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getWishlist = async (req, res) => {
  const userId = req.user.id;

  try {
    const wishlist = await Wishlist.findOne({ user: userId }).populate("products");

    if (!wishlist) {
      return res.status(200).json([]);
    }

        res.json(wishlist.products);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


// ✅ Check if a Product is Wishlisted
exports.checkWishlist = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.user._id || req.user.id;

  try {
    const wishlist = await Wishlist.findOne({
      user: new mongoose.Types.ObjectId(userId),
      products: { $in: [new mongoose.Types.ObjectId(productId)] },
    });

    res.status(200).json({ isWishlisted: !!wishlist });
  } catch (err) {
    console.error("Wishlist check error:", err.message);
    res.status(500).json({ message: "Error checking wishlist" });
  }
};
