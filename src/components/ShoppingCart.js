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

  const [isCheckout, setIsCheckout] = useState(false);
  const [cardDetails, setCardDetails] = useState({ 
    cardNumber: '', 
    expiry: '', 
    cvv: '',
    cardName: '',
    email: ''
  });
  const [purchaseId, setPurchaseId] = useState(null);

  const formatPrice = (price) => `$${price.toFixed(2)}`;

  const handleInputChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    return cardDetails.cardNumber.trim() !== '' && 
           cardDetails.expiry.trim() !== '' && 
           cardDetails.cvv.trim() !== '' &&
           cardDetails.cardName.trim() !== '' &&
           cardDetails.email.trim() !== '';
  };

  const handleBuy = () => {
    if (isFormValid()) {
      // Generate order number
      const orderNumber = 'ORD' + Math.floor(100000 + Math.random() * 900000);
      setPurchaseId(orderNumber);
      // Reset form
      setCardDetails({ 
        cardNumber: '', 
        expiry: '', 
        cvv: '',
        cardName: '',
        email: ''
      });
    }
  };

  const handleBackToCart = () => {
    setIsCheckout(false);
    setPurchaseId(null);
  };

  const handleCloseAfterPurchase = () => {
    clearCart();
    closeCart();
    setIsCheckout(false);
    setPurchaseId(null);
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
                    <h3>Thanks for purchase!</h3>
                    <p>Your order number: <strong>{purchaseId}</strong></p>
                    <div className="confirmation-actions">
                      <button onClick={handleCloseAfterPurchase} className="close-confirmation-btn">
                        Close
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="checkout-container">
                    <div className="checkout-header">
                      <button onClick={handleBackToCart} className="back-btn">
                        ← Back to Cart
                      </button>
                      <h3>Payment Details</h3>
                    </div>
                    
                    <div className="order-summary">
                      <div className="order-total">
                        <span>Order Total:</span>
                        <span>{formatPrice(getCartTotal())}</span>
                      </div>
                    </div>

                    <div className="checkout-form">
                      <form>
                        <div className="form-group">
                          <label>Cardholder Name</label>
                          <input
                            type="text"
                            name="cardName"
                            placeholder="Full Name on Card"
                            value={cardDetails.cardName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label>Card Number</label>
                          <input
                            type="text"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardDetails.cardNumber}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div className="form-row">
                          <div className="form-group">
                            <label>Expiry Date</label>
                            <input
                              type="text"
                              name="expiry"
                              placeholder="MM/YY"
                              value={cardDetails.expiry}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>CVV</label>
                            <input
                              type="text"
                              name="cvv"
                              placeholder="123"
                              value={cardDetails.cvv}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            name="email"
                            placeholder="your.email@example.com"
                            value={cardDetails.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <button 
                          type="button" 
                          onClick={handleBuy} 
                          className={`buy-btn ${!isFormValid() ? 'disabled' : ''}`}
                          disabled={!isFormValid()}
                        >
                          Complete Purchase
                        </button>
                      </form>
                    </div>
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