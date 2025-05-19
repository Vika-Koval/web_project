
import React from 'react';
import './ProductGrid.css';

const ProductGrid = ({ items }) => {
  return (
    <div className="product-grid">
      {items.map(item => (
        <div className="product-card" key={item.id}>
          <div className="product-image">
            <img src={item.image} alt={item.name} />
          </div>
          <div className="product-info">
            <div className="product-name">{item.name}</div>
            <div className="product-price">$ {item.price}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;