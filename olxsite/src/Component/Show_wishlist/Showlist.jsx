import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Show_wishlist/Showlist.css";
import img1 from "../../Images/empty-wishlist-12057813-9824483.webp"

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");
   const res = await axios.get(`${BASE_URL}/api/wishlist`, {
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
            src={img1}
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
      ? `${BASE_URL}/uploads/${item.images[0]}`
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

























// 8. Limit New Users Posting
// Pehle 5 ads ke liye manual review karo.

// Daily limit laga do (e.g., 2 free ads /day) for new users.

// ✅ Funda: Scammers bulk me ads dalke logon ko fasate hain.



// 7. Ratings & Reviews System
// Seller/buyer dono ka rating system ho.

// 3 star se niche wale automatically verify/review mode me chale jayein.

// ✅ Funda: Transparency increases trust & filters bad actors.



// 5. Chat Protection + Warning Messages
// Chatbox ke andar smart warnings dikhाओ:

// “Never pay in advance without verifying seller”

// “Avoid sharing OTP or personal info”




// 4. Report & Ban System
// हर listing/post ke niche “Report Scam” button ho.

// Frequent reported users ko auto-ban ya manually review karo.



// 9. Fraud Education Page / Blog
// Ek separate “Stay Safe” page banao jahan:

// Top scam types

// Red flags





// 1. User Verification System (KYC/OTP + ID)
// Basic KYC (Aadhar/PAN upload + selfie verification): हर seller को verified badge दो।

// Mobile number OTP + Email verification: बिना verify किए कोई listing allowed ना हो।

// ✅ Funda: “Verified Seller” badge automatically trust build करता है.