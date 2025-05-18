import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ProductListingPage from './components/ProductListingPage';
import ProductDetailPage from './components/ProductDetailPage';
import './App.css';
import ShoppingCart from './components/ShoppingCart';
import Register from './components/Register';
import Login from './components/Login';

import { CartProvider } from './components/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app">
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
            <Route path="/cart" element={
              <>
                <Navbar />
                <ShoppingCart />
              </>
            } />

              <Route path="/register" element={
              <>
                <Login />
              </>
            } />

              <Route path="/login" element={
              <>
                <Login />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
