import React, { useState, useEffect } from "react";
import "../../Style/MarketPLace.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";

export default function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const imageUrl =
    product.images && product.images.length > 0
      ? `${BASE_URL}/uploads/${product.images[0]}`
      : "https://via.placeholder.com/200x150?text=No+Image";



      useEffect(() => {
  const fetchWishlistStatus = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("❌ No token found, skipping wishlist check");
      return;
    }

    try {
      const res = await axios.get(`${BASE_URL}/api/wishlist/check/${product._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsWishlisted(res.data.isWishlisted);
    } catch (err) {
      console.error("Wishlist check error:", err.response?.data?.message || err.message);
    }
  };

  if (product?._id) fetchWishlistStatus();
}, [product._id, BASE_URL]);

   

 const handleWishlistClick = async (e) => {
  e.preventDefault();
  if (loading) return;

  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("❌ No token found. Please log in.");
    // Optionally redirect to login or show a toast
    return;
  }

  setLoading(true);
  try {
    const endpoint = isWishlisted ? "remove" : "add";
    await axios.post(
      `${BASE_URL}/api/wishlist/${endpoint}`,
      { productId: product._id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setIsWishlisted(!isWishlisted);
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

