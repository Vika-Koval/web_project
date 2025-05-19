import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ProductListingPage from './components/ProductListingPage';
import ProductDetailPage from './components/ProductDetailPage';
import './App.css';
import ShoppingCart from './components/ShoppingCart';

import { CartProvider } from './components/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          {/* ShoppingCart component added outside the Routes to always be available */}
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

             <Route path="/user" element={
              <>
                <Register />
              </>
            } />

              <Route path="/login" element={
              <>
                <Login />
              </>
            } />
            {/* No need for a separate cart route anymore */}
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
