// pages/HomePage.js
import React from 'react';
import FeaturedCollection from '../components/FeaturedCollection.js';
import Footer from '../components/Footer.js';
import './HomePage.css';

const HomePage = () => {
  const newCollectionItems = [
    {
      id: 1,
      image: '/imgs/girl.png',
      name: 'girl1',
    },
    {
      id: 2,
      image: '/imgs/girl2.png',
      name: 'girl2',
    }
  ];

  const newThisWeekItems = [
    {
      id: 3,
      image: '/images/printed-shirt.png',
      category: 'Printed T-Shirt',
      name: 'Embroidered Geometric Print',
      price: 89.99
    },
    {
      id: 4,
      image: '/images/basic-tee.png',
      category: 'Cotton T-Shirt',
      name: 'Basic White T-Shirt',
      price: 39.99
    },
    {
      id: 5,
      image: '/images/graphic-tee.png',
      category: 'Printed T-Shirt',
      name: 'Abstract Print T-Shirt',
      price: 49.99
    },
    {
      id: 6,
      image: "/images/minimal-shirt.png",
      category: 'Designer T-Shirt',
      name: 'Full Sleeve Design',
      price: 59.99
    }
  ];
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
  

  const collectionItems = [
    {
      id: 7,
      image: '/images/camo-shirt.png',
      name: 'Green Henley T-Shirt',
      price: 89.99
    },
    {
      id: 8,
      image: '/images/white-outfit.png',
      name: 'Light Beige T-Height T-Shirt',
      price: 99.99
    },
    {
      id: 9,
      image: '/images/cream-shirt.png',
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
          <h2 style={{
            fontFamily: 'Beatrice Deck Trial, sans-serif',
            fontSize: '50px',
            fontWeight: 'bold'
          }}>
            NEW THIS WEEK
          </h2>
          <span className="item-count" style={{ color: "blue", textTransform: "uppercase" }}>(50)</span>
          <a href="#" className="view-all">See All</a>
        </div>

        <div className="week-products-grid">
          {newThisWeekItems.map(item => (
            <div key={item.id} className="week-product-item">
              <div className="week-product-image-container">
                <img src={item.image} alt={item.name} className="week-product-image" />
                <button className="week-add-button">+</button>
              </div>
              <div className="week-product-details">
                <p className="week-product-category">{item.category}</p>
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
    <div className="category-buttons">
      <button className="active">(ALL)</button>
      <button>Men</button>
      <button>Women</button>
      <button>KIDS</button>
    </div>
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

        <ProductGrid items={collectionItems} />
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