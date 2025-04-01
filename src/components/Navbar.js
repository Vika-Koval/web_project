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
        <button className="icon-button">⭘</button>
        <button className="icon-button">◎</button>
        <button className="icon-button">👤</button>
      </div>
    </nav>
  );
};

export default Navbar;