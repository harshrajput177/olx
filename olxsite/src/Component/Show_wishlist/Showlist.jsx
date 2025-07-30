import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Show_wishlist/Showlist.css";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/wishlist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Wishlist response:", res.data);
 
        // ✅ Ensure it's an array
        if (Array.isArray(res.data)) {
          setWishlistItems(res.data);
        } else {
          setWishlistItems([]);
        }
      } catch (err) {
        console.error("Failed to load wishlist", err);
        setWishlistItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div className="Show-wishlist-page">
      <h2>❤️ My Wishlist</h2>

      {loading ? (
        <p>Loading wishlist...</p>
      ) : wishlistItems.length === 0 ? (
        <div className="empty-wishlist">
          <img
            src="/images/empty-wishlist.png"
            alt="Empty Wishlist"
            className="empty-wishlist-img"
          />
          <p>Your wishlist is empty</p>
        </div>
      ) : (
        <div className="Show-wishlist-grid">
          {wishlistItems.map((item) => (
            <div className="Show-wishlist-card" key={item._id}>
            <img
  src={
    item.images && item.images.length > 0
      ? `http://localhost:5000/uploads/${item.images[0]}`
      : "/placeholder.jpg"
  }
  alt={item.productName}
  className="Show-wishlist-img"
/>

              <div className="Show-wishlist-info">
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
                <p>{item.description?.slice(0, 80)}...</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
