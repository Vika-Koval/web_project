// ShoppingCart.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import './ShoppingCart.css';

const ShoppingCart = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal, 
    isCartOpen, 
    closeCart 
  } = useCart();

  // Format price to show 2 decimal places
  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  // If cart is not open, don't render
  if (!isCartOpen) {
    return null;
  }

  return (
    <div className="shopping-cart-overlay">
      <div className="shopping-cart">
        <div className="cart-header">
          <h2>Your Shopping Cart</h2>
          <button className="close-cart-btn" onClick={closeCart}>&times;</button>
        </div>
        
        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <Link to="/products" onClick={closeCart} className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.cartItemId} className="cart-item">
                  <div className="cart-item-image">
                    <img 
                      src={item.imagePath} 
                      alt={item.name} 
                    />
                  </div>
                  <div className="cart-item-details">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-meta">
                      {item.selectedColor && (
                        <div className="cart-item-color">
                          Color: {item.selectedColor.charAt(0).toUpperCase() + item.selectedColor.slice(1)}
                        </div>
                      )}
                      {item.selectedSize && (
                        <div className="cart-item-size">
                          Size: {item.selectedSize}
                        </div>
                      )}
                    </div>
                    <div className="cart-item-price">{formatPrice(item.price)}</div>
                    
                    <div className="cart-item-quantity">
                      <button 
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >-</button>
                      <span>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      >+</button>
                    </div>
                    
                    <button 
                      className="remove-item-btn"
                      onClick={() => removeFromCart(item.cartItemId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <div className="cart-total">
                <span>Total:</span>
                <span>{formatPrice(getCartTotal())}</span>
              </div>
              
              <div className="cart-actions">
                <button className="clear-cart-btn" onClick={clearCart}>
                  Clear Cart
                </button>
                <button className="checkout-btn">
                  Checkout
                </button>
              </div>
              
              <Link to="/products" onClick={closeCart} className="continue-shopping">
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;