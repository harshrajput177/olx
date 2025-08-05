import React, { useState } from "react";
import SellModal from "./SellModal";
import AuthModal from "./Landing/AuthModel/AuthModel";
import "../Style/Navbar.css";
import {Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Component/AuthContext/AuthContextApi";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { motion, AnimatePresence } from "framer-motion";


const categories = ["Premium", "Cars", "Mobiles", "Fashion", "Property"];

export default function Navbar() {
  
  const navigate = useNavigate();
  const { isLoggedIn , logout} = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLoginClick = () => setAuthOpen(true);
  const handleCloseAuth = () => setAuthOpen(false);
  const handleSellClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const toggleProfile = () => setProfileOpen(!profileOpen);


  return (
    <>
      <header className="mp-nav-wrapper">
        <div className="mp-nav">
          <div className="mp-nav-left">
            <span className="mp-logo">Marketplace</span>
          </div>

   

   <nav className="mp-nav-center">
  {categories.map((c) => {
    const path =
      c === "Premium"
        ? "/Premium"
        : c === "Property"
        ? "/Property"
        : `/category/${encodeURIComponent(c)}`;

    return (
      <Link key={c} to={path} className="mp-nav-link">
        {c}
      </Link>
    );
  })}
</nav>



          <div className="mp-nav-right">

         {isLoggedIn && (
  <div className="profile-icon-wrapper" onClick={toggleProfile}>
    <AccountCircleIcon />
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
            <li onClick={() => {
              logout();
              setProfileOpen(false);
            }}>Logout</li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)}


            <div  ><Link to="/Wishlist"><FavoriteBorderIcon className="wishlist-show"/></Link></div>
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


