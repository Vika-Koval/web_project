// pages/ProductDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from './Footer';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState('front'); // 'front', 'back', 'side', 'top'
  
  // Mock product data - in a real app, this would come from an API call or context
  const productData = {
    1: {
        id: 1,
        name: 'MINI DRESS',
        price: 29.99,
        description: 'Elegant mini dress. Stylish design and comfortable fit. Perfect for everyday wear and special occasions.',
        colors: ['beige', 'black', 'mint', 'lavender'],
        sizes: ['XS', 'S', 'M', 'L', 'XL', '2X'],
        backgroundColors: ['#f0d0c0', '#303030', '#c0e0d0', '#e0d0e0', '#f0f0e0'],
        hasRealImages: true,
        imageViews: {
          front: "/images/Мінісукня.png",
          back: "/images/Мінісукня2.png",
          side: "/images/Мінісукня3.png",
          detail: "/images/Мінісукня4.png"
        }
      },
    2: {
      id: 2,
      name: 'BASIC HEAVY WEIGHT T-SHIRT',
      price: 29,
      description: 'Classic oversized fit. Crew neck and short sleeves. Premium cotton fabric.',
      colors: ['beige', 'black', 'white', 'gray'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', '2X'],
      backgroundColors: ['#f0d0c0', '#303030', '#f0f0f0', '#a0a0a0'],
      hasRealImages: false
    },
    3: {
      id: 3,
      name: 'FULL SLEEVE ZIPPER',
      price: 29,
      description: 'Unique design with full sleeves. Camp collar with zipper closure.',
      colors: ['black', 'white', 'green', 'blue'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      backgroundColors: ['#303030', '#f0f0f0', '#c0e0d0', '#d0d0e0'],
      hasRealImages: false
    },
    4: {
      id: 4,
      name: 'MINIMAL PRINT DESIGN',
      price: 29,
      description: 'Clean aesthetic with minimal detailing. Premium materials and construction.',
      colors: ['black', 'white', 'beige'],
      sizes: ['S', 'M', 'L', 'XL'],
      backgroundColors: ['#303030', '#f0f0f0', '#f0d0c0'],
      hasRealImages: false
    },
    5: {
      id: 5,
      name: 'GREEN HENLEY T-SHIRT',
      price: 29,
      description: 'Comfortable henley design with button placket. Made from soft cotton blend.',
      colors: ['green', 'blue', 'black', 'white'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', '2X'],
      backgroundColors: ['#c0e0d0', '#d0d0e0', '#303030', '#f0f0f0'],
      hasRealImages: false
    },
    6: {
      id: 6,
      name: 'LIGHT BEIGE T-HEIGHT T-SHIRT',
      price: 29,
      description: 'Classic fit with special height design. Premium quality cotton fabric.',
      colors: ['beige', 'white', 'black', 'gray'],
      sizes: ['S', 'M', 'L', 'XL'],
      backgroundColors: ['#f0d0c0', '#f0f0f0', '#303030', '#a0a0a0'],
      hasRealImages: false
    }
  };
  
  const product = productData[productId];

  if (!product) {
    return <div className="product-not-found">Product not found</div>;
  }

  // Generate placeholder image components instead of actual images for products without real images
  const placeholderImages = product.backgroundColors.map((color, index) => ({
    backgroundColor: color,
    id: index
  }));

  // Function to handle clicking on main product image to change view
  const handleImageClick = () => {
    if (product.hasRealImages) {
      // Cycle through different views: front -> back -> side -> detail -> front
      setViewMode(current => {
        switch(current) {
          case 'front': return 'back';
          case 'back': return 'side';
          case 'side': return 'detail';
          case 'detail': return 'front';
          default: return 'front';
        }
      });
    }
  };

  // View labels to show which angle we're currently viewing
  const viewLabels = {
    front: 'Front View',
    back: 'Back View',
    side: 'Side View',
    detail: 'Detail View'
  };

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-gallery">
          <div className="main-image-container">
            {product.hasRealImages ? (
              <div 
                className="main-product-image" 
                onClick={handleImageClick}
                style={{ 
                  cursor: 'pointer',
                  position: 'relative',
                  width: '100%'
                }}
              >
                <img 
                  src={product.imageViews[viewMode]} 
                  alt={`${product.name} - ${viewLabels[viewMode]}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            ) : (
              <div 
                className="main-product-placeholder" 
                style={{ 
                  backgroundColor: placeholderImages[mainImageIndex].backgroundColor,
                  height: '500px',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div style={{ color: placeholderImages[mainImageIndex].backgroundColor === '#303030' ? '#fff' : '#333', fontWeight: 'bold' }}>
                  {product.name} - View {mainImageIndex + 1}
                </div>
              </div>
            )}
          </div>
          <div className="thumbnail-images">
            {product.hasRealImages ? (
              // For products with real images, show thumbnails for all views
              Object.entries(product.imageViews).map(([view, url], index) => (
                <div 
                  key={view} 
                  className={`thumbnail ${viewMode === view ? 'active' : ''}`} 
                  onClick={() => setViewMode(view)}
                  style={{
                    height: '80px',
                    width: '80px',
                    margin: '5px',
                    cursor: 'pointer',
                    border: viewMode === view ? '2px solid #000' : '1px solid #ddd',
                    overflow: 'hidden'
                  }}
                >
                  <img 
                    src={url} 
                    alt={`${product.name} - ${viewLabels[view]} thumbnail`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              ))
            ) : (
              // For products without real images, show the color-based placeholders
              placeholderImages.map((image, index) => (
                <div 
                  key={index} 
                  className={`thumbnail ${mainImageIndex === index ? 'active' : ''}`} 
                  onClick={() => setMainImageIndex(index)}
                  style={{
                    backgroundColor: image.backgroundColor,
                    height: '80px',
                    width: '80px',
                    margin: '5px',
                    cursor: 'pointer',
                    border: mainImageIndex === index ? '2px solid #000' : '1px solid #ddd'
                  }}
                >
                  <div style={{ color: image.backgroundColor === '#303030' ? '#fff' : '#333', fontSize: '10px', textAlign: 'center', paddingTop: '30px' }}>
                    View {index + 1}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          <div className="product-price">${product.price}</div>
          <div className="product-tax">MRP incl. of all taxes</div>
          
          <div className="product-description">
            {product.description}
          </div>
          
          <div className="product-options">
            <div className="color-selection">
              <label>Color:</label>
              <div className="color-options">
                {product.colors.map(color => (
                  <button 
                    key={color} 
                    className={`color-swatch ${selectedColor === color ? 'selected' : ''}`}
                    onClick={() => setSelectedColor(color)}
                    aria-label={color}
                    style={{
                      backgroundColor: color === 'beige' ? '#f0d0c0' :
                                      color === 'black' ? '#303030' :
                                      color === 'mint' ? '#c0e0d0' :
                                      color === 'lavender' ? '#e0d0e0' :
                                      color === 'white' ? '#f0f0f0' :
                                      color === 'gray' ? '#a0a0a0' :
                                      color === 'green' ? '#c0e0d0' :
                                      color === 'blue' ? '#d0d0e0' : color,
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      margin: '0 5px',
                      cursor: 'pointer',
                      border: selectedColor === color ? '2px solid #000' : '1px solid #ddd'
                    }}
                  />
                ))}
              </div>
            </div>
            
            <div className="size-selection">
              <label>Size:</label>
              <div className="size-options">
                {product.sizes.map(size => (
                  <button 
                    key={size} 
                    className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      padding: '8px 12px',
                      margin: '0 5px',
                      backgroundColor: selectedSize === size ? '#000' : '#fff',
                      color: selectedSize === size ? '#fff' : '#000',
                      border: '1px solid #ddd',
                      cursor: 'pointer'
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="size-guide">
              <a href="#" style={{ textDecoration: 'underline', fontSize: '14px' }}>FIND YOUR SIZE | MEASUREMENT GUIDE</a>
            </div>
            
            <button className="add-to-cart" style={{
              backgroundColor: '#000',
              color: '#fff',
              padding: '12px 40px',
              border: 'none',
              marginTop: '20px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}>ADD</button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetailPage;