// CartContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the cart context
const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Provider component to wrap your app with
export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage if available
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('shopping-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('shopping-cart', JSON.stringify(cart));
  }, [cart]);
  
  // Add a product to the cart
  const addToCart = (product, quantity = 1, selectedSize, selectedColor) => {
    setCart(prevCart => {
      // Check if this product with the same size and color already exists in the cart
      const existingItemIndex = prevCart.findIndex(item => 
        item.id === product.id && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
      );
      
      if (existingItemIndex >= 0) {
        // If it exists, update the quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      } else {
        // Otherwise, add as a new item
        return [...prevCart, { 
          ...product, 
          quantity, 
          selectedSize, 
          selectedColor,
          cartItemId: `${product.id}-${selectedSize}-${selectedColor}-${Date.now()}`
        }];
      }
    });
    
    // Open the cart after adding item
    setIsCartOpen(true);
  };
  
  // Remove a product from cart
  const removeFromCart = (cartItemId) => {
    setCart(prevCart => prevCart.filter(item => item.cartItemId !== cartItemId));
  };
  
  // Update quantity of a cart item
  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart(prevCart => prevCart.map(item => 
      item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
  };
  
  // Get total number of items in cart
  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  
  // Get total price of all items in cart
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  
  // Toggle cart visibility
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  
  // Close cart
  const closeCart = () => {
    setIsCartOpen(false);
  };
  
  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartCount,
      getCartTotal,
      isCartOpen,
      toggleCart,
      closeCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;