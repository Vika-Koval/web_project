import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from './WishlistContext';
import { useCart } from './CartContext';
import Navbar from './Navbar'; // Додано імпорт Navbar
import Footer from './Footer';
import './WishlistPage.css';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    const cartItem = {
      ...product,
      selectedSize: product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'M',
      quantity: 1,
    };
    addToCart(cartItem);
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
  };

  return (
    <>
      <Navbar /> {/* Додано Navbar */}
      <div className="wishlist-page">
        <div className="wishlist-container">
          <div className="wishlist-header">
            <h1 className="wishlist-title">MY WISHLIST</h1>
            {wishlistItems.length > 0 && (
              <button 
                className="clear-wishlist-btn"
                onClick={clearWishlist}
              >
                Clear All
              </button>
            )}
          </div>

          {wishlistItems.length === 0 ? (
            <div className="empty-wishlist">
              <div className="empty-wishlist-content">
                <div className="empty-heart">♡</div>
                <h2>Your wishlist is empty</h2>
                <p>Add items you like to your wishlist. Review them anytime and easily move them to the cart.</p>
                <Link to="/products" className="continue-shopping-btn">
                  Continue Shopping
                </Link>
              </div>
            </div>
          ) : (
            <div className="wishlist-content">
              <div className="wishlist-count">
                {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} in your wishlist
              </div>
              
              <div className="wishlist-grid">
                {wishlistItems.map(item => (
                  <div key={item.id} className="wishlist-item">
                    <div className="wishlist-item-image">
                      <Link to={`/product/${item.id}`}>
                        <img 
                          src={item.imagePath || item.image} 
                          alt={item.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/images/placeholder.png';
                          }}
                        />
                      </Link>
                      <button 
                        className="remove-from-wishlist"
                        onClick={() => handleRemoveFromWishlist(item.id)}
                        title="Remove from wishlist"
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className="wishlist-item-details">
                      <Link to={`/product/${item.id}`} className="item-link">
                        <div className="item-category">{item.category}</div>
                        <div className="item-name">{item.name}</div>
                        <div className="item-price">${item.price.toFixed(2)}</div>
                      </Link>
                      
                      <div className="wishlist-item-actions">
                        {item.inStock ? (
                          <button 
                            className="add-to-cart-btn"
                            onClick={() => handleAddToCart(item)}
                          >
                            Add to Cart
                          </button>
                        ) : (
                          <button className="out-of-stock-btn" disabled>
                            Out of Stock
                          </button>
                        )}
                        
                        <button 
                          className="view-product-btn"
                          onClick={() => window.location.href = `/product/${item.id}`}
                        >
                          View Product
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default WishlistPage;