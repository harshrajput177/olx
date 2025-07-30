import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../Style/ViewProduct-css/ViewProduct.css";
import ChatBox from "./ChatBox";
import { useAuth } from "../AuthContext/AuthContextApi";
import ChatIcon from '@mui/icons-material/Chat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [addedToWishlist, setAddedToWishlist] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/products/getone/${id}`
        );
        setProduct(res.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleWishlist = async () => {
    if (!user) {
      alert("Please login to add to wishlist.");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/wishlist/add`,
        { productId: product._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAddedToWishlist(true);
      alert("Product added to wishlist!");
    } catch (err) {
      console.error("Failed to add to wishlist:", err);
      alert("Something went wrong while adding to wishlist.");
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="View-product-page">
      <div className="View-product-header">
        <span className="View-back-link">&#8592; Product Details</span>
      </div>

      <div className="View-product-container">
        <div className="View-product-image">
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${product.images?.[0]}`}
            alt={product.productName}
            className="View-image-placeholder"
          />
          <div className="View-image-tabs">
            {product.images?.map((img, i) => (
              <button key={i} className="View-tab">
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${img}`}
                  alt={`img-${i}`}
                  height={30}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="View-product-info">
          <div className="alldetails-product">
            <div className="View-price">&#8377; {product.price}</div>
            <div className="View-summary">{product.description}</div>
            <div className="View-location">{product.location}</div>
            <div className="View-posted">
              {new Date(product.createdAt).toLocaleDateString()}
            </div>
          </div>

          <div className="vertical-divider"></div>

          <div className="View-seller-box">
            <div className="View-seller-title">Seller Details</div>
            <div className="View-seller-name">
              <div className="View-avatar">
                {product.sellerName?.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="View-name">{product.sellerName}</div>
                <div className="View-since">Member</div>
              </div>
            </div>

            <button
              className="View-chat-btn"
              onClick={() => {
                if (!user) {
                  alert("Please login to chat with the seller.");
                  return;
                }
                setShowChat(true);
              }}
            >
              <ChatIcon style={{ marginRight: "6px" }} />
              Chat with Seller
            </button>

            <button
              className="View-fav-btn"
              onClick={handleWishlist}
              disabled={addedToWishlist}
            >
              <FavoriteBorderIcon
                style={{ color: addedToWishlist ? "red" : "gray" }}
              />
              {addedToWishlist ? "Added to Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>

      <div className="View-product-details">
        <div className="detail-item">
          <span className="View-label">Product Name</span>
          <span className="View-value">{product.productName}</span>
        </div>
        <div className="View-detail-item">
          <span className="View-label">Main Category</span>
          <span className="View-value">{product.mainCategory}</span>
        </div>
        <div className="View-detail-item">
          <span className="View-label">Sub Category</span>
          <span className="View-value">{product.subCategory}</span>
        </div>
        <div className="View-detail-item">
          <span className="View-label">Location</span>
          <span className="View-value">{product.location}</span>
        </div>
        <div className="View-detail-item">
          <span className="View-label">Type</span>
          <span className="View-value">{product.type}</span>
        </div>
      </div>

      {showChat && (
        <ChatBox
            sellerId={product?.seller?._id} 
          currentUserId={user._id}
          sellerName={product.sellerName}
          adId={`AD-${product._id?.slice(-5)}`}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  );
};

export default ProductDetails;
