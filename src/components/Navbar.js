// components/Navbar.js
import React, { useState } from 'react';
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
          <a href="#">Home</a>
          <a href="#">Collections</a>
          <a href="#">New</a>
        </div>
      </div>
      
      <div className="navbar-center">
        <div className="categories">
          <div>MEN</div>
          <div>WOMEN</div>
          <div>KIDS</div>
        </div>
        <div className="search-container">
          <input type="text" placeholder="Search" className="search-input" />
        </div>
      </div>
      <div className="navbar-right">
        <img src="imgs/favorite.png" alt="Icon 1" className="icon-image1" />
        <img src="imgs/cart.png" alt="Icon 2" className="icon-image2" />
        <img src="imgs/user.png" alt="Icon 3" className="icon-image3" />
      </div>
    </nav>
  );
};

export default Navbar;