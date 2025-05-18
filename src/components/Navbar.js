import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext'; // Import useCart hook
import './Navbar.css';

const Navbar = ({ activeFilter, setActiveFilter, handleCategoryClick }) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const navigate = useNavigate();
  const { toggleCart } = useCart(); // Get toggleCart function from context

  const handleLinkClick = (path) => {
    setShowMenu(false); // Close menu when link is clicked
    navigate(path);     // Programmatically navigate to the path
  };

  // Function to handle cart icon click
  const handleCartClick = (e) => {
    e.preventDefault(); // Prevent default navigation
    toggleCart(); // Toggle cart visibility
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
        <img src="/imgs/favorite.png" alt="Icon 1" className="icon-image1" />
        {/* Replaced Link with a button styled as a link */}
        <button 
          onClick={handleCartClick} 
          className="cart-link"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <img src="/imgs/cart.png" alt="Cart" className="icon-image2" />
        </button>
        <img src="/imgs/user.png" alt="Icon 3" className="icon-image3" />
      </div>
    </nav>
  );
};

export default Navbar;