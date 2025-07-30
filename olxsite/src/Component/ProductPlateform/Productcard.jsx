import React, { useState, useEffect } from "react";
import "../../Style/MarketPLace.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";

export default function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);

  const imageUrl =
    product.images && product.images.length > 0
      ? `${import.meta.env.VITE_API_BASE_URL}/uploads/${product.images[0]}`
      : "https://via.placeholder.com/200x150?text=No+Image";



      useEffect(() => {
  const fetchWishlistStatus = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/wishlist/check/${product._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("✅ Wishlist check:", res.data);
      setIsWishlisted(res.data.isWishlisted);
    } catch (err) {
      console.error("Wishlist check error:", err.response?.data?.message || err.message);
    }
  };

  if (product?._id) fetchWishlistStatus(); // Only if product._id is defined
}, [product._id]);


  const handleWishlistClick = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      if (isWishlisted) {
        await axios.post(
          `http://localhost:5000/api/wishlist/remove`,
          { productId: product._id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        await axios.post(
          `http://localhost:5000/api/wishlist/add`,
          { productId: product._id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }
      setIsWishlisted(!isWishlisted); // 🔁 Toggle local state
    } catch (err) {
      console.error("Wishlist error:", err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-card">
      <img src={imageUrl} alt={product.productName} className="product-image" />

      <div className="header-heart">
        <div className="card-header">{product.productName}</div>
        <span
          onClick={handleWishlistClick}
          style={{
            cursor: loading ? "not-allowed" : "pointer",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          {isWishlisted ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </span>
      </div>

      <div className="card-body">
        <p className="price">₹ {product.price.toLocaleString()}</p>
        <p className="product-description">{product.description}</p>
        <div className="meta">
          <span>{product.location || "No location specified"}</span>
          <span>{new Date(product.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}

