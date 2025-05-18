// pages/HomePage.js
import React, { useState, useEffect } from 'react';
import FeaturedCollection from '../components/FeaturedCollection.js';
import Footer from '../components/Footer.js';
import Navbar from '../components/Navbar.js';
import './HomePage.css';

const HomePage = () => {
  
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [collectionIndex, setCollectionIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [newThisWeekItems, setNewThisWeekItems] = useState([]);
  const [collectionItems, setCollectionItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all data from our JSON Server
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch products
        const productsResponse = await fetch('http://localhost:3001/products');
        const productsData = await productsResponse.json();
        setProducts(productsData);
        
        // Fetch newThisWeek items
        const newThisWeekResponse = await fetch('http://localhost:3001/newThisWeek');
        const newThisWeekData = await newThisWeekResponse.json();
        setNewThisWeekItems(newThisWeekData);
        
        // Fetch collection items
        const collectionsResponse = await fetch('http://localhost:3001/collections');
        const collectionsData = await collectionsResponse.json();
        setCollectionItems(collectionsData);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getNewCollectionItems = () => {
    if (!products || products.length === 0) {
      return [];
    }
    
    let newItems = products.filter(product => product.isNew === true);
    
    if (activeFilter !== 'ALL') {
      newItems = newItems.filter(item => item.gender === activeFilter);
    }
    
    return newItems;
  };

  const getCurrentCollectionItems = () => {
    const items = getNewCollectionItems();
    if (!items || items.length === 0) return [];
    
    const start = collectionIndex;
    const end = Math.min(start + 2, items.length);
    
    if (end - start < 2 && start > 0) {
      return items.slice(0, Math.min(2, items.length));
    }
    
    return items.slice(start, end);
  };

  const handleCollectionNavigation = (direction) => {
    const items = getNewCollectionItems();
    if (!items || items.length <= 2) return; 
    
    if (direction === 'prev') {
      setCollectionIndex(prevIndex => 
        prevIndex === 0 ? Math.max(0, items.length - 2) : Math.max(0, prevIndex - 2)
      );
    } else {
      setCollectionIndex(prevIndex => 
        prevIndex + 2 >= items.length ? 0 : prevIndex + 2
      );
    }
  };

  // Filter products for display based on active filter
  const [filteredProducts, setFilteredProducts] = useState({
    newCollectionItems: [],
    newThisWeekItems: [],
    collectionItems: []
  });

  useEffect(() => {
    const filterProducts = () => {
      const newCollectionFromJson = getNewCollectionItems();
      
      if (activeFilter === 'ALL') {
        return {
          newCollectionItems: newCollectionFromJson,
          newThisWeekItems: newThisWeekItems,
          collectionItems: collectionItems
        };
      } else {
        return {
          newCollectionItems: newCollectionFromJson,
          newThisWeekItems: newThisWeekItems.filter(
            item => item.category === activeFilter
          ),
          collectionItems: collectionItems.filter(
            item => item.category === activeFilter
          )
        };
      }
    };

    setFilteredProducts(filterProducts());
  }, [activeFilter, products, newThisWeekItems, collectionItems]);

  const [weekItemIndex, setWeekItemIndex] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    setWeekItemIndex(0);
  }, [activeFilter]);

  const handleWeekNavigation = (direction) => {
    const items = filteredProducts.newThisWeekItems;
    if (!items || items.length <= itemsPerPage) return; 
    
    if (direction === 'prev') {
      setWeekItemIndex(prevIndex => 
        prevIndex === 0 ? Math.max(0, items.length - itemsPerPage) : Math.max(0, prevIndex - itemsPerPage)
      );
    } else {
      setWeekItemIndex(prevIndex => 
        prevIndex + itemsPerPage >= items.length ? 0 : prevIndex + itemsPerPage
      );
    }
  };

  const getCurrentWeekItems = () => {
    const items = filteredProducts.newThisWeekItems;
    if (!items || items.length === 0) return [];
    
    const start = weekItemIndex;
    const end = Math.min(start + itemsPerPage, items.length);
    
    return items.slice(start, end);
  };

  const ProductGrid = ({ items }) => (
    <div className="product-grid">
      {items.map(item => (
        <div key={item.id} className="product-card">
          <div className="product-image-wrapper">
            <img src={item.image} alt={item.name} />
          </div>
          <div className="product-info">
            <h3 className="product-name">{item.name}</h3>
            <p className="product-price">${item.price.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const [visibleRows, setVisibleRows] = useState(1);
  const itemsPerRow = 3;

  const getVisibleCollectionItems = () => {
    const items = filteredProducts.collectionItems;
    if (!items || items.length === 0) return [];
    
    return items.slice(0, visibleRows * itemsPerRow);
  };

  // Show loading state while fetching data
  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  // Show error message if data fetch failed
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="home-page">
      {/* Pass activeFilter and setActiveFilter to Navbar */}
      <Navbar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

      <section className="new-collection">
        <div className="search-container">
          <input type="text" placeholder="Search" className="search-input" />
        </div>
        <div className="collection-container">
          <div className="title-container">
            <h2>NEW<br />COLLECTION</h2>
            <p>Summer<br />2025</p>
            <div className="shop-navigation">
              <button className="shop-btn">Go To Shop <span>→</span></button>
              <div className="navigation-arrows">
                <button 
                  className={`arrow-button ${collectionIndex === 0 ? 'active' : ''}`}
                  onClick={() => handleCollectionNavigation('prev')}
                >〈</button>
                <button 
                  className="arrow-button"
                  onClick={() => handleCollectionNavigation('next')}
                >〉</button>
              </div>
            </div>
          </div>
          <div className="collection-images">
            <div className="featured-items">
              {getCurrentCollectionItems().map((item) => (
                <div key={item.id} className="featured-item">
                  <img 
                    src={item.imagePath} 
                    alt={item.name} 
                    className="featured-image" 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="new-this-week">
        <div className="section-header">
          <h2 style={{
            fontFamily: 'Beatrice Deck Trial, sans-serif',
            fontSize: '50px',
            fontWeight: 'bold'
          }}>
            NEW THIS WEEK
          </h2>
          <span className="item-count" style={{ color: "blue", textTransform: "uppercase" }}>
            ({filteredProducts.newThisWeekItems.length})
          </span>
          <a href="#" className="view-all">See All</a>
        </div>

        <div className="week-products-grid">
          {filteredProducts.newThisWeekItems.length > 0 ? (
            getCurrentWeekItems().map(item => (
              <div key={item.id} className="week-product-item">
                <div className="week-product-image-container">
                  <img src={item.image} alt={item.name} className="week-product-image" />
                  <button className="week-add-button">+</button>
                </div>
                <div className="week-product-details">
                  <p className="week-product-category">{item.type}</p>
                  <h3 className="week-product-name">{item.name}</h3>
                  <p className="week-product-price">${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-items-message">No items available for this filter</div>
          )}
        </div>

        {filteredProducts.newThisWeekItems.length > itemsPerPage && (
          <div className="week-pagination">
            <button 
              className="week-arrow prev" 
              onClick={() => handleWeekNavigation('prev')}
            >←</button>
            <button 
              className="week-arrow next" 
              onClick={() => handleWeekNavigation('next')}
            >→</button>
          </div>
        )}
      </section>
      
      <section className="collections">
        <div className="section-header">
          <div className="title-and-categories">
            <h2>XIV COLLECTIONS 23-24</h2>
          </div>
          <div className="filter-sort">
            <div className="filter">
              <span>Filter(s)</span>
              ...
            </div>
            <div className="sort">
              <span>Sort by</span>
              ...
            </div>
          </div>
        </div>

        <div className="product-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '20px' 
        }}>
          {filteredProducts.collectionItems
            .slice(0, visibleRows * itemsPerRow)
            .map(item => (
              <div key={item.id} className="product-card">
                <div className="product-image-wrapper">
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: 'auto' }} />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{item.name}</h3>
                  <p className="product-price">${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))
          }
        </div>
        
        {filteredProducts.collectionItems.length > visibleRows * itemsPerRow && (
          <div className="load-more-container" style={{ textAlign: 'center', margin: '20px 0' }}>
            <button 
              className="load-more-button" 
              onClick={() => setVisibleRows(prevRows => prevRows + 1)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              Show More
            </button>
          </div>
        )}
      </section>
      
      <section className="about-section">
        <h2 className="about-title">OUR APPROACH TO FASHION DESIGN</h2>
        <p className="about-text">
          at elegant vogue , we blend creativity with craftsmanship to create fashion that 
          transcends trends and stands the test of time each design is meticulously crafted, 
          ensuring the highest quelity exqulsite finish
        </p>
        <div className="about-images">
          <img src="/images/design1.avif" alt="Fashion Design" className="about-image" />
          <img src="/images/design2.avif" alt="Fashion Design" className="about-image" />
          <img src="/images/design3.avif" alt="Fashion Design" className="about-image" />
          <img src="/images/design5.avif" alt="Fashion Design" className="about-image" />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HomePage;