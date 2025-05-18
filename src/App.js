import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ProductListingPage from './components/ProductListingPage';
import ProductDetailPage from './components/ProductDetailPage';
import './App.css';

// Using the more compatible Routes/Route pattern
function App() {
  return (
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
          <Route path="/collections" element={
            <>
              <Navbar />
              <div>Collections Page</div>
            </>
          } />
          <Route path="/new" element={
            <>
              <Navbar />
              <div>New Items Page</div>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;