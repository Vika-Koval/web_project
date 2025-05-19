import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import Footer from './Footer';
import './ProductDetailPage.css';

import { useCart } from './CartContext'; 

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState('front'); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddedToCart, setIsAddedToCart] = useState(false); 

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const [productsResponse, newThisWeekResponse, collectionsResponse] = await Promise.all([
          fetch('http://localhost:3001/products'),
          fetch('http://localhost:3001/newThisWeek'),
          fetch('http://localhost:3001/collections')
        ]);
        
        if (!productsResponse.ok) {
          throw new Error(`HTTP error fetching products! Status: ${productsResponse.status}`);
        }
        if (!newThisWeekResponse.ok) {
          throw new Error(`HTTP error fetching newThisWeek! Status: ${newThisWeekResponse.status}`);
        }
        if (!collectionsResponse.ok) {
          throw new Error(`HTTP error fetching collections! Status: ${collectionsResponse.status}`);
        }
        
        const productsData = await productsResponse.json();
        const newThisWeekData = await newThisWeekResponse.json();
        const collectionsData = await collectionsResponse.json();
        
        const allProducts = [
          ...productsData,
          ...newThisWeekData,
          ...collectionsData
        ];
        
        const foundProduct = allProducts.find(p => p.id.toString() === productId.toString());
        

            if (foundProduct) {
          const productData = {
            id: foundProduct.id,
            name: foundProduct.name.toUpperCase(),
            price: foundProduct.price,
            description: foundProduct.description || 'Elegant design and comfortable fit. Perfect for everyday wear and special occasions.',
            colors: foundProduct.colors || ['beige', 'black', 'mint'],
            sizes: foundProduct.sizes || ['XS', 'S', 'M', 'L', 'XL'],
            backgroundColors: foundProduct.backgroundColors || ['#f0d0c0', '#303030', '#c0e0d0', '#e0d0e0', '#f0f0e0'],
            hasRealImages: foundProduct.hasRealImages || foundProduct.id === 1, 
            imagePath: foundProduct.imagePath,
            imageViews: foundProduct.imageViews 
          };
          
          setProduct(productData);
          
          if (foundProduct.color) {
            setSelectedColor(foundProduct.color.toLowerCase());
          }

          if (foundProduct.sizes && foundProduct.sizes.length > 0) {
            setSelectedSize(foundProduct.sizes[0]);
          }
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return <div className="product-loading">Loading product...</div>;
  }

  if (error) {
    return <div className="product-error">Error: {error}</div>;
  }

  if (!product) {
    return <div className="product-not-found">Product not found</div>;
  }

  const placeholderImages = product.backgroundColors.map((color, index) => ({
    backgroundColor: color,
    id: index
  }));

  const handleImageClick = () => {
    if (product.hasRealImages) {
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

  const viewLabels = {
    front: 'Front View',
    back: 'Back View',
    side: 'Side View',
    detail: 'Detail View'
  };
  
  const handleColorChange = (color) => {
    setSelectedColor(color);
    
    const colorIndex = product.colors.indexOf(color);
    if (colorIndex >= 0) {
      setMainImageIndex(colorIndex);
    }
  };
  
  const getCurrentBackgroundColor = () => {
    const colorIndex = product.colors.indexOf(selectedColor);
    if (colorIndex >= 0 && colorIndex < product.backgroundColors.length) {
      return product.backgroundColors[colorIndex];
    }
    return product.backgroundColors[mainImageIndex] || '#ffffff';
  };
  
  const isDarkBackground = () => {
    const bgColor = getCurrentBackgroundColor();
    return bgColor === '#303030' || bgColor.toLowerCase() === 'black';
  };
  
  const handleAddToCart = () => {
    addToCart(product, 1, selectedSize, selectedColor);
    
    setIsAddedToCart(true);
    
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 700);
  };

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-gallery">
          <div className="main-image-container">
            {mainImageIndex > 0 ? (
              <div 
                className="main-product-image color-display"
                style={{ backgroundColor: getCurrentBackgroundColor() }}
              >
                <div className={`color-display-text ${isDarkBackground() ? 'dark-bg' : 'light-bg'}`}>
                  {product.name} - {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}
                </div>
              </div>
            ) : product.hasRealImages ? (
              <div 
                className="main-product-image clickable" 
                onClick={handleImageClick}
              >
                <img 
                  src={product.imageViews[viewMode]} 
                  alt={`${product.name} - ${viewLabels[viewMode]}`}
                />
              </div>
            ) : (
              <div className="main-product-image">
                <img 
                  src={product.imagePath} 
                  alt={product.name}
                />
              </div>
            )}
          </div>
          
          <div className="thumbnail-images">
            <div 
              className={`thumbnail ${mainImageIndex === 0 ? 'active' : ''}`} 
              onClick={() => {
                setMainImageIndex(0);
                setViewMode('front');
              }}
            >
              <img 
                src={product.imagePath} 
                alt={`${product.name} thumbnail`}
              />
            </div>

            {product.colors.slice(0, 3).map((color, index) => {
              const bgColor = color === 'beige' ? '#f0d0c0' :
                            color === 'black' ? '#303030' :
                            color === 'mint' ? '#c0e0d0' :
                            color === 'lavender' ? '#e0d0e0' : 
                            product.backgroundColors[index];
              
              const isDark = bgColor === '#303030' || color === 'black';
              
              return (
                <div 
                  key={`color-${index}`}
                  className={`thumbnail ${mainImageIndex === index + 1 ? 'active' : ''}`} 
                  onClick={() => {
                    setMainImageIndex(index + 1);
                    if (index < product.colors.length) {
                      setSelectedColor(product.colors[index]);
                    }
                  }}
                  style={{ backgroundColor: bgColor }}
                >
                  <div className={`thumbnail-text ${isDark ? 'dark-bg' : 'light-bg'}`}>
                    View {index + 1}
                  </div>
                </div>
              );
            })}
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
                    className={`color-swatch ${color} ${selectedColor === color ? 'selected' : ''}`}
                    onClick={() => handleColorChange(color)}
                    aria-label={color}
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
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="size-guide">
              <a href="#">FIND YOUR SIZE | MEASUREMENT GUIDE</a>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className={`add-to-cart ${isAddedToCart ? 'added' : ''}`}
            >
              {isAddedToCart ? 'ADDED TO CART' : 'ADD TO CART'}
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
