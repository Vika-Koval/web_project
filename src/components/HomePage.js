// pages/HomePage.js
import React, { useState, useEffect } from 'react';
import FeaturedCollection from '../components/FeaturedCollection.js';
import Footer from '../components/Footer.js';
import Navbar from '../components/Navbar.js';
import './HomePage.css';

const HomePage = () => {
  // Add state to track the active filter
  const [activeFilter, setActiveFilter] = useState('ALL');

  // Define all products with category information
  const allProducts = {
    // New Collection Items
    newCollectionItems: [
      {
        id: 1,
        image: '/imgs/girl.png',
        name: 'Women\'s Summer Dress',
        category: 'Women',
        featured: true
      },
      {
        id: 2,
        image: '/imgs/girl2.png',
        name: 'Casual Women\'s Outfit',
        category: 'Women',
        featured: true
      },
      {
        id: 101,
        image: '/images/men3.avif',
        name: 'Men\'s Casual Outfit',
        category: 'Men',
        featured: true
      },
      {
        id: 102,
        image: '/images/men2.avif',
        name: 'Premium Men\'s Suit',
        category: 'Men',
        featured: true
      },
      {
        id: 201,
        image: '/images/kid1.jpg',
        name: 'Kids Play Outfit',
        category: 'KIDS',
        featured: true
      },
      {
        id: 202,
        image: '/images/kid2.jpg',
        name: 'School Collection',
        category: 'KIDS',
        featured: true
      }
    ],

    // New This Week Items
    newThisWeekItems: [
      {
        id: 3,
        image: '/images/printed-shirt.png',
        category: 'Men',
        type: 'Printed T-Shirt',
        name: 'Embroidered Geometric Print',
        price: 89.99
      },
      {
        id: 4,
        image: '/images/basic-tee.png',
        category: 'Men',
        type: 'Cotton T-Shirt',
        name: 'Basic White T-Shirt',
        price: 39.99
      },
      {
        id: 5,
        image: '/images/graphic-tee.png',
        category: 'Men',
        type: 'Printed T-Shirt',
        name: 'Abstract Print T-Shirt',
        price: 49.99
      },
      {
        id: 6,
        image: "/images/minimal-shirt.png",
        category: 'Men',
        type: 'Designer T-Shirt',
        name: 'Full Sleeve Design',
        price: 59.99
      },
      // Women's items for "New This Week"
      {
        id: 103,
        image: "/images/women_shirt_1.avif",
        category: 'Women',
        type: 'Summer Blouse',
        name: 'Floral Pattern Blouse',
        price: 69.99
      },
      {
        id: 104,
        image: "/images/women_shirt_2.avif",
        category: 'Women',
        type: 'Summer Dress',
        name: 'Light Cotton Dress',
        price: 89.99
      },
      {
        id: 105,
        image: "/images/women_shirt3.avif",
        category: 'Women',
        type: 'Summer Dress',
        name: 'Light Cotton Dress',
        price: 89.99
      },
      {
        id: 106,
        image: "/images/women_shirt4.avif",
        category: 'Women',
        type: 'Summer Dress',
        name: 'Light Cotton Dress',
        price: 89.99
      },
      // Kids' items for "New This Week"
      {
        id: 203,
        image: "/images/kids_shirt_1.jpg",
        category: 'KIDS',
        type: 'Cotton T-Shirt',
        name: 'Cartoon Print T-Shirt',
        price: 29.99
      },
      {
        id: 204,
        image: "/images/kids_shirt_2.jpg",
        category: 'KIDS',
        type: 'Cotton T-Shirt',
        name: 'Cartoon Print T-Shirt',
        price: 29.99
      },
      {
        id: 205,
        image: "/images/kids_shirt_3.jpg",
        category: 'KIDS',
        type: 'Cotton T-Shirt',
        name: 'Cartoon Print T-Shirt',
        price: 29.99
      },
    
      {
        id: 206,
        image: "/images/kids_shirt4.jpg",
        category: 'KIDS',
        type: 'Summer Set',
        name: 'Casual Play Set',
        price: 49.99
      }
    ],

    // Collection Items
    collectionItems: [
      // Men's items
      {
        id: 7,
        image: '/images/camo-shirt.png',
        name: 'Green Henley T-Shirt',
        category: 'Men',
        price: 89.99
      },
      {
        id: 8,
        image: '/images/white-outfit.png',
        name: 'Light Beige T-Height T-Shirt',
        category: 'Men',
        price: 99.99
      },
      {
        id: 9,
        image: '/images/cream-shirt.png',
        name: 'Cream Heavy T-Shirt',
        category: 'Men',
        price: 69.99
      },
      // Women's items
      {
        id: 10,
        image: '/images/women_t1.avif',
        name: 'Elegant Summer Blouse',
        category: 'Women',
        price: 79.99
      },
      {
        id: 11,
        image: '/images/women_t2.avif',
        name: 'Floral Pattern Dress',
        category: 'Women',
        price: 109.99
      },
      {
        id: 12,
        image: '/images/women_t3.avif',
        name: 'Lightweight Denim Jacket',
        category: 'Women',
        price: 129.99
      },
      // Kids' items
      {
        id: 13,
        image: '/images/kid_1.jpg',
        name: 'Colorful Kids T-Shirt',
        category: 'KIDS',
        price: 39.99
      },
      {
        id: 14,
        image: '/images/kid_2.jpg',
        name: 'Comfortable Cotton Pants',
        category: 'KIDS',
        price: 49.99
      },
      {
        id: 15,
        image: '/images/kid_3.jpg',
        name: 'Sporty Kids Hoodie',
        category: 'KIDS',
        price: 59.99
      }
    ]
  };

  // State for filtered products
  const [filteredProducts, setFilteredProducts] = useState({
    newCollectionItems: [],
    newThisWeekItems: [],
    collectionItems: []
  });

  // Filter products when activeFilter changes
  useEffect(() => {
    // Function to filter products based on active filter
    const filterProducts = () => {
      if (activeFilter === 'ALL') {
        // For "ALL", display a mix of items
        return {
          // For featured collection, show 2 items
          newCollectionItems: allProducts.newCollectionItems.slice(0, 2),
          // For "new this week", show 4 items
          newThisWeekItems: allProducts.newThisWeekItems.slice(0, 4),
          // For regular collection, show all items
          collectionItems: allProducts.collectionItems
        };
      } else {
        // For specific category, filter by that category
        return {
          newCollectionItems: allProducts.newCollectionItems.filter(
            item => item.category === activeFilter
          ).slice(0, 2), // Limit to 2 items
          
          newThisWeekItems: allProducts.newThisWeekItems.filter(
            item => item.category === activeFilter
          ).slice(0, 4), // Limit to 4 items
          
          collectionItems: allProducts.collectionItems.filter(
            item => item.category === activeFilter
          )
        };
      }
    };

    setFilteredProducts(filterProducts());
  }, [activeFilter]);

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
            <p>Summer<br />2024</p>
            <div className="shop-navigation">
              <button className="shop-btn">Go To Shop <span>→</span></button>
              <div className="navigation-arrows">
                <button className="arrow-button active">〈</button>
                <button className="arrow-button">〉</button>
              </div>
            </div>
          </div>
          <div className="collection-images">
            <FeaturedCollection items={filteredProducts.newCollectionItems} />
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
          {filteredProducts.newThisWeekItems.map(item => (
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
          ))}
        </div>

        <div className="week-pagination">
          <button className="week-arrow prev">←</button>
          <button className="week-arrow next">→</button>
        </div>
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

        {/* Display filtered collection items */}
        <ProductGrid items={filteredProducts.collectionItems} />
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