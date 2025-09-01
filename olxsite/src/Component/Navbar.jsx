import React, { useState } from "react";
import SellModal from "./SellModal";
import AuthModal from "./Landing/AuthModel/AuthModel";
import "../Style/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Component/AuthContext/AuthContextApi";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { motion, AnimatePresence } from "framer-motion";
import ChatIcon from '@mui/icons-material/Chat';

const categories = ["Premium", "Cars", "Mobiles", "Fashion", "Property"];

export default function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [location, setLocation] = useState("Wazidpur, Noida");
  const [searchText, setSearchText] = useState("");

  const handleLoginClick = () => setAuthOpen(true);
  const handleCloseAuth = () => setAuthOpen(false);
  const handleSellClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const toggleProfile = () => setProfileOpen(!profileOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    // navigate to search page with query + location
    navigate(`/search?query=${encodeURIComponent(searchText)}&location=${encodeURIComponent(location)}`);
  };

  return (
    <>
      <header className="mp-nav-wrapper">
        <div className="mp-nav">
          {/* Left logo */}
          <div className="mp-nav-left">
            <span className="mp-logo">Market</span>
          </div>

          {/* Center - Location + Search */}
          <div className="mp-search-container">
            <select
              className="mp-location-select"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option>Wazidpur, Noida</option>
              <option>Delhi</option>
              <option>Gurgaon</option>
              <option>Ghaziabad</option>
            </select>

      
          </div>

          {/* Right side */}
          <div className="mp-nav-right">
            {isLoggedIn && (
              <div className="profile-icon-wrapper" onClick={toggleProfile}>
                <AccountCircleIcon className="AccountCircleIcon" />
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      className="profile-dropdown"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="profile-header">
                        <div className="profile-icon-circle">U</div>
                        <div className="profile-info">
                          <span>Unknown</span>
                          <p>View and edit profile</p>
                        </div>
                      </div>
                      <ul className="profile-menu">
                        <li><Link to="/Premium">Premium Purchase</Link></li>
                        <li>Premium Business Listing</li>
                        <li><Link to="/Wishlist">View Wishlist</Link></li>
                        <li><Link to="/ourlisting">Your Business Listing</Link></li>
                        <li>Help</li>
                        <li onClick={() => { logout(); setProfileOpen(false); }}>Logout</li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {isLoggedIn && (
              <Link to="/chat">
                <ChatIcon className="chat-icon" />
              </Link>
            )}

            <div>
              <Link to="/Wishlist">
                <FavoriteBorderIcon className="wishlist-show" />
              </Link>
            </div>

            {!isLoggedIn && (
              <button className="mp-login-link" onClick={handleLoginClick}>
                Login
              </button>
            )}

            {isLoggedIn && (
              <button className="mp-sell-btn" onClick={handleSellClick}>
                <span className="mp-sell-plus">+</span> SELL
              </button>
            )}
          </div>
        </div>
      </header>

      {isModalOpen && <SellModal categories={categories} onClose={handleCloseModal} />}
      {authOpen && <AuthModal onClose={handleCloseAuth} />}
    </>
  );
}


