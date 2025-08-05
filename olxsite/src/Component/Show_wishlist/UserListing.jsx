import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Show_wishlist/UserListing.css"; // Reuse wishlist styling

const YourListings = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 👇 Use your deployed backend base URL
  const BASE_URL = "https://backend-olx-j9e3.onrender.com";

  useEffect(() => {
    const fetchUserListings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/api/products/mylistings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Your Listings response:", res.data);

        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Failed to load listings", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserListings();
  }, []);

  return (
    <div className="wishlist-page">
      <h2>📦 Your Listings</h2>

      {loading ? (
        <p>Loading your products...</p>
      ) : products.length === 0 ? (
        <div className="empty-wishlist">
          <img
            src="/images/no-products.png"
            alt="No Listings"
            className="empty-wishlist-img"
          />
          <p>You haven't listed any products yet.</p>
        </div>
      ) : (
        <div className="wishlist-grid">
          {products.map((item) => (
            <div className="wishlist-card" key={item._id}>
              <img
                src={
                  item.images && item.images.length > 0
                    ? `${BASE_URL}/uploads/${item.images[0]}`
                    : "/placeholder.jpg"
                }
                alt={item.productName}
                className="wishlist-img"
              />
              <div className="wishlist-info">
                <h3>{item.productName}</h3>
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

export default YourListings;

