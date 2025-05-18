import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import Footer from './Footer';
import './ProductDetailPage.css';
import { useCart } from './CartContext'; // Import the useCart hook

const ProductDetailPage = () => {
  const { productId } = useParams();
  const location = useLocation();
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState('front'); // 'front', 'back', 'side', 'top'
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddedToCart, setIsAddedToCart] = useState(false); // State to track if the item was added to cart
  
  // Get the cart context functions
  const { addToCart } = useCart();
  
  useEffect(() => {
    // Fetch product data from JSON Server
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3001/products/${productId}`);
        
        if (!response.ok) {
          throw new Error('Product not found');
        }
        
        const foundProduct = await response.json();

        // Map the product data to match the structure expected by this component
        if (foundProduct) {
          const productData = {
            id: foundProduct.id,
            name: foundProduct.name.toUpperCase(),
            price: foundProduct.price,
            description: foundProduct.description || 'Elegant design and comfortable fit. Perfect for everyday wear and special occasions.',
            colors: foundProduct.colors || ['beige', 'black', 'mint'],
            sizes: foundProduct.sizes || ['XS', 'S', 'M', 'L', 'XL'],
            backgroundColors: foundProduct.backgroundColors || ['#f0d0c0', '#303030', '#c0e0d0', '#e0d0e0', '#f0f0e0'],
            hasRealImages: foundProduct.hasRealImages || foundProduct.id === 1, // Only product 1 has real images in the current setup
            imagePath: foundProduct.imagePath, // Store the main image path from product listing
            imageViews: foundProduct.imageViews || {
              front: foundProduct.id === 1 ? "/images/Мінісукня.png" : foundProduct.imagePath,
              back: foundProduct.id === 1 ? "/images/Мінісукня2.png" : null,
              side: foundProduct.id === 1 ? "/images/Мінісукня3.png" : null,
              detail: foundProduct.id === 1 ? "/images/Мінісукня4.png" : null
            }
          };
          
          setProduct(productData);
          
          // Set the initial color if the product has a color property
          if (foundProduct.color) {
            setSelectedColor(foundProduct.color.toLowerCase());
          }
          
          // Set initial size to the first available size
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
  
  // Function to change color and update image
  const handleColorChange = (color) => {
    setSelectedColor(color);
    
    // Change the main image index based on selected color
    const colorIndex = product.colors.indexOf(color);
    if (colorIndex >= 0) {
      setMainImageIndex(colorIndex);
    }
  };
  
  // Get the current background color based on selected color or main image index
  const getCurrentBackgroundColor = () => {
    const colorIndex = product.colors.indexOf(selectedColor);
    if (colorIndex >= 0 && colorIndex < product.backgroundColors.length) {
      return product.backgroundColors[colorIndex];
    }
    // Fallback to the background color based on main image index
    return product.backgroundColors[mainImageIndex] || '#ffffff';
  };
  
  // Determine if the current background color is dark
  const isDarkBackground = () => {
    const bgColor = getCurrentBackgroundColor();
    return bgColor === '#303030' || bgColor.toLowerCase() === 'black';
  };
  
  // Handle adding the product to cart
  const handleAddToCart = () => {
    addToCart(product, 1, selectedSize, selectedColor);
    
    // Set the button state to "Added" and change color
    setIsAddedToCart(true);
    
    // Reset the button after 2 seconds
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
              // Show a colored square when a color thumbnail is selected
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
          
          {/* Fixed-position thumbnails column on the right side */}
          <div className="thumbnail-images">
            {/* Product thumbnail image first */}
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
            
            {/* Color squares for thumbnail selection */}
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
                    // Also update the selected color to match this view
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