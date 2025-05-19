import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { useWishlist } from './WishlistContext';
import './ProductListingPage.css';

const ProductListingPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('NEW');
  const [activeGender, setActiveGender] = useState('ALL');
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [currentPriceRange, setCurrentPriceRange] = useState({ min: 0, max: 100 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Add navigate hook
  const navigate = useNavigate();
  
  // Use wishlist hook
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  useEffect(() => {
    // Fetch products from JSON server from all sections
    const fetchAllProducts = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all three sections in parallel
        const [productsResponse, newThisWeekResponse, collectionsResponse] = await Promise.all([
          fetch('http://localhost:3001/products'),
          fetch('http://localhost:3001/newThisWeek'),
          fetch('http://localhost:3001/collections')
        ]);
        
        // Check if any responses have errors
        if (!productsResponse.ok) {
          throw new Error(`HTTP error fetching products! Status: ${productsResponse.status}`);
        }
        if (!newThisWeekResponse.ok) {
          throw new Error(`HTTP error fetching newThisWeek! Status: ${newThisWeekResponse.status}`);
        }
        if (!collectionsResponse.ok) {
          throw new Error(`HTTP error fetching collections! Status: ${collectionsResponse.status}`);
        }
        
        // Parse all responses
        const productsData = await productsResponse.json();
        const newThisWeekData = await newThisWeekResponse.json();
        const collectionsData = await collectionsResponse.json();
        
        // Combine all products into a single array
        const combinedProducts = [
          ...productsData,
          ...newThisWeekData,
          ...collectionsData
        ];
        
        // Modify jeans products to be out of stock and not new
        const modifiedProducts = combinedProducts.map(product => {
          if (product.category === 'JEANS') {
            return { ...product, inStock: false, isNew: false };
          }
          return product;
        });
        
        // Set the combined products
        setAllProducts(modifiedProducts);
        setFilteredProducts(modifiedProducts);
        
        // Set max price based on data
        if (modifiedProducts.length > 0) {
          const maxPrice = Math.max(...modifiedProducts.map(product => product.price));
          setPriceRange({ min: 0, max: maxPrice });
          setCurrentPriceRange({ min: 0, max: maxPrice });
          
          // Log product information
          console.log("=== PRODUCT DATA ANALYSIS ===");
          console.log(`Total products: ${modifiedProducts.length}`);
          console.log(`- From products section: ${productsData.length}`);
          console.log(`- From newThisWeek section: ${newThisWeekData.length}`);
          console.log(`- From collections section: ${collectionsData.length}`);
          
          // Analyze unique gender values
          const genders = [...new Set(modifiedProducts.map(p => p.gender))];
          console.log("Unique genders in data:", genders);
          
          // Count products by gender
          const genderCounts = {};
          modifiedProducts.forEach(p => {
            const gender = p.gender || 'UNDEFINED';
            genderCounts[gender] = (genderCounts[gender] || 0) + 1;
          });
          console.log("Products count by gender:", genderCounts);
          
          // Get unique categories
          const categories = [...new Set(modifiedProducts.map(p => p.category))];
          console.log("Available categories:", categories);
          
          // Log first product structure
          console.log("First product:", JSON.stringify(modifiedProducts[0], null, 2));
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAllProducts();
  }, []);

  // Apply filters whenever dependencies change
  useEffect(() => {
    let result = allProducts;
    
    // Filter by selected sizes
    if (selectedSizes.length > 0) {
      result = result.filter(product => 
        product.sizes && Array.isArray(product.sizes) &&
        product.sizes.some(size => selectedSizes.includes(size))
      );
    }
    
    // Filter by in-stock status
    if (showInStockOnly) {
      result = result.filter(product => product.inStock);
    }
    
    // Filter by gender
    if (activeGender !== 'ALL') {
      console.log("Filtering by gender:", activeGender);
      
      // Check gender value in each product
      result = result.filter(product => {
        // Check if gender field exists
        if (!product.gender) return false;
        
        const productGender = String(product.gender).toUpperCase().trim();
        const filterGender = activeGender.toUpperCase().trim();
        
        // Different checks to find a match
        if (filterGender === 'MEN') {
          return ['MEN', 'MAN', 'MALE', 'M', 'MENS', "MEN'S", 'ЧОЛОВІЧИЙ', 'ЧОЛОВІК', 'Ч'].includes(productGender);
        } 
        else if (filterGender === 'WOMEN') {
          return ['WOMEN', 'WOMAN', 'FEMALE', 'F', 'W', 'WOMENS', "WOMEN'S", 'ЖІНОЧИЙ', 'ЖІНКА', 'Ж'].includes(productGender);
        }
        else if (filterGender === 'KIDS') {
          return ['KIDS', 'KID', 'CHILD', 'CHILDREN', 'ДИТЯЧИЙ', 'ДІТИ'].includes(productGender);
        }
        
        // If not found in variants above, use simple check
        return productGender === filterGender || 
               productGender.includes(filterGender) || 
               filterGender.includes(productGender);
      });
      
      console.log(`Found ${result.length} products after gender filtering`);
    }
    
    // Filter by category
    if (activeCategory === 'NEW') {
      result = result.filter(product => product.isNew);
    } else if (activeCategory !== 'ALL') {
      result = result.filter(product => product.category === activeCategory);
    }
    
    // Filter by price range
    result = result.filter(product => 
      product.price >= currentPriceRange.min && 
      product.price <= currentPriceRange.max
    );
    
    // Apply search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        (product.name && product.name.toLowerCase().includes(query)) ||
        (product.category && product.category.toLowerCase().includes(query)) ||
        (product.gender && product.gender.toLowerCase().includes(query)) ||
        (product.type && product.type.toLowerCase().includes(query)) ||
        (product.tags && Array.isArray(product.tags) && product.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }
    
    // Remove duplicates based on id
    const uniqueProducts = Array.from(
      new Map(result.map(item => [item.id, item])).values()
    );
    
    setFilteredProducts(uniqueProducts);
  }, [allProducts, selectedSizes, showInStockOnly, activeCategory, activeGender, searchQuery, currentPriceRange]);

  // Function to handle wishlist toggle
  const handleWishlistToggle = (e, product) => {
    e.preventDefault(); // Prevent default behavior
    e.stopPropagation(); // Stop event from propagating to parent elements
    toggleWishlist(product);
  };
  
  // Function to handle product card click
  const handleProductClick = (e, productId) => {
    navigate(`/product/${productId}`);
  };

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
    console.log("Changed gender to:", gender);
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
  
  // Handle price range slider changes
  const handlePriceSliderChange = (e, type) => {
    if (type === 'min') {
      setCurrentPriceRange(prev => ({ 
        ...prev, 
        min: Number(e.target.value) 
      }));
    } else {
      setCurrentPriceRange(prev => ({ 
        ...prev, 
        max: Number(e.target.value) 
      }));
    }
  };
  
  // Handle min price input change
  const handleMinPriceChange = (e) => {
    const value = Number(e.target.value);
    if (value >= priceRange.min && value <= currentPriceRange.max) {
      setCurrentPriceRange((prev) => ({ ...prev, min: value }));
    }
  };
  
  // Handle max price input change
  const handleMaxPriceChange = (e) => {
    const value = Number(e.target.value);
    if (value >= currentPriceRange.min && value <= priceRange.max) {
      setCurrentPriceRange((prev) => ({ ...prev, max: value }));
    }
  };

  // Get all unique categories from products
  const getUniqueCategories = () => {
    if (!allProducts || allProducts.length === 0) return ['DRESSES', 'SHIRTS', 'JEANS', 'JACKETS', 'OUTFITS', 'SUITS'];
    
    const categories = [...new Set(allProducts
      .filter(product => product.category)
      .map(product => product.category))];
    
    return categories;
  };

  return (
    <div className="products-page">
      <div className="products-container">
        
        <h1 className="products-title">PRODUCTS</h1>

        {isLoading ? (
          <div className="loading">Loading products...</div>
        ) : error ? (
          <div className="error">Error: {error}</div>
        ) : (
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
                <h4>Price Range</h4>
                <div className="price-range">
                  <div className="range-slider">
                    <input
                      type="range"
                      min={priceRange.min}
                      max={priceRange.max}
                      value={currentPriceRange.min}
                      onChange={(e) => handlePriceSliderChange(e, 'min')}
                      className="price-slider"
                    />
                    <input
                      type="range"
                      min={priceRange.min}
                      max={priceRange.max}
                      value={currentPriceRange.max}
                      onChange={(e) => handlePriceSliderChange(e, 'max')}
                      className="price-slider"
                    />
                  </div>
                  <div className="price-inputs">
                    <input
                      type="number"
                      placeholder="Min"
                      value={currentPriceRange.min}
                      onChange={handleMinPriceChange}
                      min={priceRange.min}
                      max={currentPriceRange.max}
                    />
                    <span>-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={currentPriceRange.max}
                      onChange={handleMaxPriceChange}
                      min={currentPriceRange.min}
                      max={priceRange.max}
                    />
                  </div>
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
                  {getUniqueCategories().map(category => (
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
              
              <div className="filter-section">
                <h4>Size</h4>
                <div className="size-options">
                  {['XS', 'S', 'M', 'L', 'XL', '2XL'].map(size => (
                    <button
                      key={size}
                      className={`size-button ${selectedSizes.includes(size) ? 'active' : ''}`}
                      onClick={() => toggleSize(size)}
                    >
                      {size}
                    </button>
                  ))}
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
                <div className="product-count">
                  {filteredProducts.length} products found
                </div>
              </div>
              
              <div className="products-grid">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map(product => (
                    <div 
                      key={product.id} 
                      className="product-card"
                      onClick={(e) => handleProductClick(e, product.id)}
                    >
                      <div className="product-image">
                        <img 
                          src={product.imagePath || product.image} 
                          alt={product.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/images/placeholder.png';
                          }}
                        />
                        {/* Wishlist button */}
                        <button 
                          className={`wishlist-button ${isInWishlist(product.id) ? 'active' : ''}`}
                          onClick={(e) => handleWishlistToggle(e, product)}
                          title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                        >
                          <span className="heart-icon">
                            {isInWishlist(product.id) ? '♥' : '♡'}
                          </span>
                        </button>
                        
                        {!product.inStock && (
                          <div className="out-of-stock" style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            backgroundColor: '#e53935',
                            color: 'white',
                            padding: '5px 10px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            zIndex: 2
                          }}>
                            Out of Stock
                          </div>
                        )}
                        {product.isNew && product.inStock && (
                          <div className="new-tag" style={{
                            position: 'absolute',
                            top: '10px',
                            left: '10px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            padding: '5px 10px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            zIndex: 2
                          }}>
                            New
                          </div>
                        )}
                      </div>
                      <div className="product-meta">
                        <div className="product-category">{product.category}</div>
                        <div className="product-gender">{product.gender}</div>
                        {product.type && <div className="product-type">{product.type}</div>}
                        <div className="product-name">{product.name}</div>
                        <div className="product-price">${product.price.toFixed(2)}</div>
                        {product.rating && (
                          <div className="product-rating">
                            {"★".repeat(Math.floor(product.rating))}
                            {"☆".repeat(5 - Math.floor(product.rating))}
                            <span>{product.rating.toFixed(1)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-products">No products match your filters</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductListingPage;