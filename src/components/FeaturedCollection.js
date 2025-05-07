// components/FeaturedCollection.js
import React, { useState, useEffect } from 'react';

const FeaturedCollection = ({ items, onNavigate }) => {
  const displayItems = items.slice(0, 2); // Display only two items at a time

  return (
    <div className="featured-items">
      {displayItems.map((item) => (
        <div key={item.id} className="featured-item">
          <img src={item.imagePath || item.image} alt={item.name} className="featured-image" />
          <h3 className="featured-title">{item.name}</h3>
          <p className="featured-category">{item.category || item.gender}</p>
        </div>
      ))}
    </div>
  );
};

export default FeaturedCollection;
