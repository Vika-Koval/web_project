// components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-button" onClick={() => setShowMenu(!showMenu)}>
          <span>≡</span>
        </button>
        <div className={`menu-links ${showMenu ? 'show' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/collections">Collections</Link>
          <Link to="/new">New</Link>
        </div>
      </div>

      <div className="navbar-right">
        <img src="/imgs/favorite.png" alt="Icon 1" className="icon-image1" />
        <Link to="/products">
          <img src="/imgs/cart.png" alt="Cart" className="icon-image2" />
        </Link>
        <img src="/imgs/user.png" alt="Icon 3" className="icon-image3" />
      </div>
    </nav>
  );
};

export default Navbar;