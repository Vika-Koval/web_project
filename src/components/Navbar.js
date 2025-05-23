import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext'; 
import { useWishlist } from './WishlistContext'; 
import './Navbar.css';

const Navbar = ({ activeFilter, setActiveFilter, handleCategoryClick }) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { toggleCart, getCartCount } = useCart(); 
  const { getWishlistCount } = useWishlist();

  const handleLinkClick = (path) => {
    setShowMenu(false); 
    navigate(path);     
  };

  const handleCartClick = (e) => {
    e.preventDefault(); 
    toggleCart();
  };

  const handleWishlistClick = () => {
    navigate('/wishlist'); 
  };

  const handleUserIconClick = () => {
    navigate('/user'); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-button" onClick={() => setShowMenu(!showMenu)}>
          <span>≡</span>
        </button>
        <div className={`menu-links ${showMenu ? 'show' : ''}`}>
          <Link to="/" onClick={() => handleLinkClick('/')}>Home</Link>
          <Link to="/products" onClick={() => handleLinkClick('/products')}>Products</Link>
        </div>
      </div>
      <div className="navbar-right">
        <button 
          onClick={handleWishlistClick} 
          className="wishlist-link"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, position: 'relative' }}
        >
          <img src="/imgs/favorite.png" alt="Wishlist" className="icon-image1" />
          {getWishlistCount() > 0 && (
            <span className="wishlist-count-badge">
              {getWishlistCount()}
            </span>
          )}
        </button>
        <button 
          onClick={handleCartClick} 
          className="cart-link"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, position: 'relative' }}
        >
          <img src="/imgs/cart.png" alt="Cart" className="icon-image2" />
          {getCartCount() > 0 && (
            <span className="cart-count-badge">
              {getCartCount()}
            </span>
          )}
        </button>
        <button 
          onClick={handleUserIconClick} 
          className="user-link"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <img src="/imgs/user.png" alt="User Icon" className="icon-image3" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;