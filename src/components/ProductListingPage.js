// ProductListingPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import './ProductListingPage.css';
import productsData from './product.json';

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('NEW');
  // Removed activeQuickFilter state since we no longer need it
  const [activeGender, setActiveGender] = useState('ALL');
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  
  // Initialize products from our JSON data
  useEffect(() => {
    setProducts(productsData.products);
    setFilteredProducts(productsData.products);
  }, []);

  // Apply filters whenever dependencies change
  useEffect(() => {
    let result = products;
    
    // Filter by selected sizes
    if (selectedSizes.length > 0) {
      result = result.filter(product => 
        product.sizes.some(size => selectedSizes.includes(size))
      );
    }
    
    // Filter by in-stock status
    if (showInStockOnly) {
      result = result.filter(product => product.inStock);
    }
    
    // Filter by gender
    if (activeGender !== 'ALL') {
      result = result.filter(product => product.gender === activeGender);
    }
    
    // Filter by category
    if (activeCategory === 'NEW') {
      result = result.filter(product => product.isNew);
    } else if (activeCategory !== 'ALL') {
      result = result.filter(product => product.category === activeCategory);
    }
    
    // We've removed quick filters as requested
    
    // Apply search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.gender.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredProducts(result);
  }, [products, selectedSizes, showInStockOnly, activeCategory, activeGender, searchQuery]);

  // Toggle size selection
  const toggleSize = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };
  
  // Handle gender change
  const handleGenderChange = (gender) => {
    setActiveGender(gender);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Toggle in-stock only filter
  const toggleInStockFilter = () => {
    setShowInStockOnly(!showInStockOnly);
  };

  return (
    <div className="products-page">
      <div className="products-container">
        
        <h1 className="products-title">PRODUCTS</h1>

        <div className="products-layout">
          <div className="filters-sidebar">
            <h3>Filters</h3>
            
            <div className="filter-section">
              <h4>Gender</h4>
              <div className="gender-buttons">
                <button 
                  className={`gender-button ${activeGender === 'ALL' ? 'active' : ''}`}
                  onClick={() => handleGenderChange('ALL')}
                >ALL</button>
                <button 
                  className={`gender-button ${activeGender === 'MEN' ? 'active' : ''}`}
                  onClick={() => handleGenderChange('MEN')}
                >MEN</button>
                <button 
                  className={`gender-button ${activeGender === 'WOMEN' ? 'active' : ''}`}
                  onClick={() => handleGenderChange('WOMEN')}
                >WOMEN</button>
                <button 
                  className={`gender-button ${activeGender === 'KIDS' ? 'active' : ''}`}
                  onClick={() => handleGenderChange('KIDS')}
                >KIDS</button>
              </div>
            </div>
            
            <div className="filter-section">
              <h4>Size</h4>
              <div className="size-buttons">
                <button 
                  className={selectedSizes.includes('XS') ? 'active' : ''}
                  onClick={() => toggleSize('XS')}
                >XS</button>
                <button 
                  className={selectedSizes.includes('S') ? 'active' : ''}
                  onClick={() => toggleSize('S')}
                >S</button>
                <button 
                  className={selectedSizes.includes('M') ? 'active' : ''}
                  onClick={() => toggleSize('M')}
                >M</button>
                <button 
                  className={selectedSizes.includes('L') ? 'active' : ''}
                  onClick={() => toggleSize('L')}
                >L</button>
                <button 
                  className={selectedSizes.includes('XL') ? 'active' : ''}
                  onClick={() => toggleSize('XL')}
                >XL</button>
              </div>
            </div>
            
            <div className="filter-section">
              <h4>Availability</h4>
              <div className="checkbox-filter">
                <input 
                  type="checkbox" 
                  id="inStock"
                  checked={showInStockOnly}
                  onChange={toggleInStockFilter}
                />
                <label htmlFor="inStock">In Stock Only</label>
              </div>
            </div>
            
            <div className="filter-section">
              <h4>Category</h4>
              <ul className="category-list">
                <li 
                  className={activeCategory === 'ALL' ? 'active' : ''}
                  onClick={() => handleCategoryChange('ALL')}
                >
                  ALL
                </li>
                <li 
                  className={activeCategory === 'NEW' ? 'active' : ''}
                  onClick={() => handleCategoryChange('NEW')}
                >
                  NEW
                </li>
                {['DRESSES', 'SHIRTS', 'JEANS', 'JACKETS'].map(category => (
                  <li 
                    key={category} 
                    className={activeCategory === category ? 'active' : ''}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Colors section removed as requested */}
            
            <div className="filter-section">
              <h4>Price Range</h4>
              <div className="price-range">
                <input type="range" min="0" max="100" className="price-slider" />
                <div className="price-inputs">
                  <input type="number" placeholder="Min" />
                  <span>-</span>
                  <input type="number" placeholder="Max" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="products-main">
            <div className="search-section">
              <div className="search-box">
                <input 
                  type="text" 
                  placeholder="Search" 
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            
            {/* Quick filters removed as requested */}
            
            <div className="products-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <Link to={`/product/${product.id}`} key={product.id} className="product-card">
                    <div className="product-image">
                      <img 
                        src={product.imagePath} 
                        alt={product.name}
                      />
                      {!product.inStock && <div className="out-of-stock">Out of Stock</div>}
                      {product.isNew && <div className="new-tag">New</div>}
                    </div>
                    <div className="product-meta">
                      <div className="product-category">{product.category}</div>
                      <div className="product-gender">{product.gender}</div>
                      <div className="product-name">{product.name}</div>
                      <div className="product-price">${product.price.toFixed(2)}</div>
                      <div className="product-rating">
                        {"★".repeat(Math.floor(product.rating))}
                        {"☆".repeat(5 - Math.floor(product.rating))}
                        <span>{product.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="no-products">No products match your filters</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductListingPage;