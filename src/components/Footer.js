import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>INFO</h3>
          <p><a href="#">FAQS</a></p>
          <p><a href="#">PRIVACY</a></p>
          <p><a href="#">PAYMENTS</a></p>
        </div>
        
        <div className="footer-section">
          <h3>CONTACT</h3>
          <p><a href="mailto:info@example.com">info@example.com</a></p>
          <p><a href="tel:+1234567890">+1 234 567 890</a></p>
        </div>
        
        <div className="footer-section">
          <h3>SOCIALS</h3>
          <p><a href="#">FB</a></p>
          <p><a href="#">INST</a></p>
          <p><a href="#">TW</a></p>
        </div>
        
        <div className="footer-section logo-section">
          <div className="logo-text">
            <div>XIV</div>
            <div>QR</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;