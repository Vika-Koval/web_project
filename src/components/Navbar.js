import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ activeFilter, setActiveFilter, handleCategoryClick }) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    setShowMenu(false); // Close menu when link is clicked
    navigate(path);     // Programmatically navigate to the path
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-button" onClick={() => setShowMenu(!showMenu)}>
          <span>≡</span>
        </button>
        <div className={`menu-links ${showMenu ? 'show' : ''}`}>
          <Link to="/" onClick={() => handleLinkClick('/')}>Home</Link>
          <Link to="/collections" onClick={() => handleLinkClick('/collections')}>Collections</Link>
          <Link to="/new" onClick={() => handleLinkClick('/new')}>New</Link>
        </div>
      </div>
      <div className="navbar-right">
        <img src="/imgs/favorite.png" alt="Icon 1" className="icon-image1" />
        <Link to="/products" onClick={() => handleLinkClick('/products')} className="cart-link">
          <img src="/imgs/cart.png" alt="Cart" className="icon-image2" />
        </Link>
        <img src="/imgs/user.png" alt="Icon 3" className="icon-image3" />
      </div>
    </nav>
  );
};

export default Navbar;