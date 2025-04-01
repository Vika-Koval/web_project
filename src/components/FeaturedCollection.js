
import React from 'react';
import './FeaturedCollection.css';

const FeaturedCollection = ({ items }) => {
  return (
    <div className="featured-collection">
      {items.map(item => (
        <div className="featured-item" key={item.id}>
          <img src={item.image} alt={item.name} />
        </div>
      ))}
    </div>
  );
};

export default FeaturedCollection;