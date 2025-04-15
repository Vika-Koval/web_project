// pages/ProductListingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import './ProductListingPage.css';

const ProductListingPage = () => {
  // Products data - in a real application, this would come from an API or context
  const products = [
    {
      id: 1,
      name: 'Mini Dress',
      price: 29.00,
      imagePath: '/images/Мінісукня.png'
    }
  ];

  return (
    <div className="products-page">
      <div className="products-container">
        
        <h1 className="products-title">PRODUCTS</h1>

        <div className="products-layout">
          <div className="filters-sidebar">
            <h3>Filters</h3>
            
            <div className="filter-section">
              <h4>Size</h4>
              <div className="size-buttons">
                <button>XS</button>
                <button>S</button>
                <button>M</button>
                <button>L</button>
                {/* <button>XL</button>
                <button>2X</button> */}
              </div>
            </div>
            
            <div className="filter-section">
              <h4>Availability</h4>
              <div className="expand-icon">›</div>
            </div>
            
            <div className="filter-section">
              <h4>Category</h4>
              <div className="expand-icon">›</div>
            </div>
            
            <div className="filter-section">
              <h4>Colors</h4>
              <div className="expand-icon">›</div>
            </div>
            
            <div className="filter-section">
              <h4>Price Range</h4>
              <div className="expand-icon">›</div>
            </div>
            
            <div className="filter-section">
              <h4>Collections</h4>
              <div className="expand-icon">›</div>
            </div>
            
            <div className="filter-section">
              <h4>Tags</h4>
              <div className="expand-icon">›</div>
            </div>
            
            <div className="filter-section">
              <h4>Ratings</h4>
              <div className="expand-icon">›</div>
            </div>
          </div>
          
          <div className="products-main">
            <div className="search-section">
              <div className="search-box">
                <input type="text" placeholder="Search" />
              </div>
            </div>
            
            <div className="category-tabs">
              <button className="tab-button active">NEW</button>
              <button className="tab-button">SHIRTS</button>
              <button className="tab-button">POLO SHIRTS</button>
              <button className="tab-button">SHIRTS</button>
              <button className="tab-button">JEANS</button>
              <button className="tab-button">JACKETS</button>
            </div>
            
            <div className="quick-filters">
              <button className="quick-filter active">BEST SELLERS</button>
              <button className="quick-filter">T-SHIRTS</button>
              <button className="quick-filter">JEANS</button>
              <button className="quick-filter">SETS</button>
              <button className="quick-filter">JACKETS</button>
            </div>
            
            <div className="products-grid">
              {products.map(product => (
                <Link to={`/product/${product.id}`} key={product.id} className="product-card">
                  <div className="product-image" style={{ 
                    height: '400px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'transparent'
                  }}>
                    <img 
                      src={product.imagePath} 
                      alt={product.name}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'contain',
                        objectPosition: 'center',
                        background: 'transparent'
                      }}
                    />
                    {/* 360° View label removed */}
                  </div>
                  <div className="product-meta">
                    <div className="product-category">{product.category}</div>
                    <div className="product-name">{product.name}</div>
                    <div className="product-price">${product.price.toFixed(2)}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductListingPage;