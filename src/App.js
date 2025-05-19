import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ProductListingPage from './components/ProductListingPage';
import ProductDetailPage from './components/ProductDetailPage';
import WishlistPage from './components/WishlistPage';
import './App.css';
import ShoppingCart from './components/ShoppingCart';
import Register from './components/Register';
import Login from './components/Login';
import { CartProvider } from './components/CartContext';
import { WishlistProvider } from './components/WishlistContext';

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <div className="app">
            <ShoppingCart />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={
                <>
                  <Navbar />
                  <ProductListingPage />
                </>
              } />
              <Route path="/product/:productId" element={
                <>
                  <Navbar />
                  <ProductDetailPage />
                </>
              } />
              <Route path="/wishlist" element={
                <>
                  <WishlistPage />
                </>
              } />
              <Route path="/user" element={
                <>
                  <Navbar />
                  <Register />
                </>
              } />
              <Route path="/login" element={
                <>
                  <Navbar />
                  <Login />
                </>
              } />
            </Routes>
          </div>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;