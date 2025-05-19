import React, { useState } from 'react';
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

  const [isCheckout, setIsCheckout] = useState(false); // State to toggle checkout form
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiry: '', cvv: '' });
  const [purchaseId, setPurchaseId] = useState(null); // State to store purchase ID

  const formatPrice = (price) => `$${price.toFixed(2)}`;

  const handleInputChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleBuy = () => {
    // Generate a random purchase ID
    const randomPurchaseId = Math.floor(100000 + Math.random() * 900000);
    setPurchaseId(randomPurchaseId);
    clearCart(); // Clear the cart after purchase
  };

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
            {!isCheckout ? (
              <>
                <div className="cart-items">
                  {cart.map(item => (
                    <div key={item.cartItemId} className="cart-item">
                      <div className="cart-item-image">
                        <img src={item.imagePath} alt={item.name} />
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
                    <button className="checkout-btn" onClick={() => setIsCheckout(true)}>
                      Checkout
                    </button>
                  </div>
                  
                  <Link to="/products" onClick={closeCart} className="continue-shopping">
                    Continue Shopping
                  </Link>
                </div>
              </>
            ) : (
              <>
                {purchaseId ? (
                  <div className="purchase-confirmation">
                    <h3>Thank you for your purchase!</h3>
                    <p>Your purchase ID is: <strong>{purchaseId}</strong></p>
                    <button onClick={closeCart} className="close-cart-btn">
                      Close
                    </button>
                  </div>
                ) : (
                  <div className="checkout-form">
                    <h3>Enter Payment Details</h3>
                    <form>
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number"
                        value={cardDetails.cardNumber}
                        onChange={handleInputChange}
                        required
                      />
                      <input
                        type="text"
                        name="expiry"
                        placeholder="Expiry Date (MM/YY)"
                        value={cardDetails.expiry}
                        onChange={handleInputChange}
                        required
                      />
                      <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={cardDetails.cvv}
                        onChange={handleInputChange}
                        required
                      />
                      <button type="button" onClick={handleBuy} className="buy-btn">
                        Buy
                      </button>
                    </form>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;