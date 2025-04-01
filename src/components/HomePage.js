// pages/HomePage.js
import React from 'react';
import ProductGrid from '../components/ProductGrid.js';
import FeaturedCollection from '../components/FeaturedCollection.js';
import './HomePage.css';

const HomePage = () => {
  const newCollectionItems = [
    {
      id: 1,
      image: '/images/white-outfit.jpg',
      name: 'White Outfit Collection',
      price: 149.99
    },
    {
      id: 2,
      image: '/images/black-shirt.jpg',
      name: 'Graphic Black T-Shirt',
      price: 59.99
    }
  ];
  
  const newThisWeekItems = [
    {
      id: 3,
      image: '/images/printed-shirt.jpg',
      name: 'Embroidered Geometric Print',
      price: 89.99
    },
    {
      id: 4,
      image: '/images/basic-tee.jpg',
      name: 'Basic White T-Shirt',
      price: 39.99
    },
    {
      id: 5,
      image: '/images/graphic-tee.jpg',
      name: 'Abstract Print T-Shirt',
      price: 49.99
    },
    {
      id: 6,
      image: '/images/minimal-shirt.jpg',
      name: 'Full Sleeve Design',
      price: 59.99
    }
  ];
  
  const collectionItems = [
    {
      id: 7,
      image: '/images/camo-shirt.jpg',
      name: 'Green Henley T-Shirt',
      price: 89.99
    },
    {
      id: 8,
      image: '/images/white-outfit.jpg',
      name: 'Light Beige T-Height T-Shirt',
      price: 99.99
    },
    {
      id: 9,
      image: '/images/cream-shirt.jpg',
      name: 'Cream Heavy T-Shirt',
      price: 69.99
    }
  ];
  
  return (
    <div className="home-page">
      <section className="new-collection">
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
            <FeaturedCollection items={newCollectionItems} />
          </div>
        </div>
      </section>
      
      <section className="new-this-week">
        <div className="section-header">
          <h2>NEW THIS WEEK</h2>
          <span className="item-count">(50)</span>
          <a href="#" className="view-all">View All</a>
        </div>
        <ProductGrid items={newThisWeekItems} />
        <div className="navigation-arrows centered">
          <button className="arrow-button">〈</button>
          <button className="arrow-button">〉</button>
        </div>
      </section>
      
      <section className="collections">
        <div className="section-header">
          <h2>XIV COLLECTIONS 23-24</h2>
          <div className="filter-sort">
            <div className="filter">
              <span>Filter(s)</span>
              <div className="filter-options">
                <button className="active">ALL</button>
                <button>Men</button>
                <button>Women</button>
                <button>Kids</button>
              </div>
            </div>
            <div className="sort">
              <span>Sort by</span>
              <select>
                <option>Low to High</option>
                <option>High to Low</option>
              </select>
            </div>
          </div>
        </div>
        <ProductGrid items={collectionItems} />
      </section>
    </div>
  );
};

export default HomePage;