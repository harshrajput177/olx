// Footer.jsx
import React from 'react';
import '../Style/Footer.css'; // External CSS
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>Popular Categories</h4>
          <a href="#">Cars</a>
          <a href="#">Mobiles</a>
        </div>
        <div className="footer-column">
          <h4>About Us</h4>
          <a href="#">About Marketplace</a>
          <a href="#">Careers</a>
        </div>
        <div className="footer-column">
          <h4>Marketplace</h4>
          <a href="#">Help</a>
          <a href="#">Legal & Privacy</a>
        </div>
        <div className="footer-column">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><FacebookRoundedIcon /></a>
            <a href="#"><InstagramIcon /></a>
            <a href="#"><XIcon /></a>
          </div>
        </div>
      </div>
      <hr />
      <p className="copyright">
        © 2025 Marketplace. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
