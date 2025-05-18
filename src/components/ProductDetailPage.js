import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import Footer from './Footer';
import './ProductDetailPage.css';
import productsData from './product.json';
import { useCart } from './CartContext'; // Import the useCart hook

const ProductDetailPage = () => {
  const { productId } = useParams();
  const location = useLocation();
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState('front'); // 'front', 'back', 'side', 'top'
  const [product, setProduct] = useState(null);
  const [isAddedToCart, setIsAddedToCart] = useState(false); // State to track if the item was added to cart
  
  // Get the cart context functions
  const { addToCart } = useCart();
  
  useEffect(() => {
    // Find the selected product from the products data
    const parsedProductId = parseInt(productId);
    const foundProduct = productsData.products.find(p => p.id === parsedProductId);

    // Map the product data to match the structure expected by this component
    if (foundProduct) {
      const productData = {
        id: foundProduct.id,
        name: foundProduct.name.toUpperCase(),
        price: foundProduct.price,
        description: 'Elegant design and comfortable fit. Perfect for everyday wear and special occasions.',
        colors: ['beige', 'black', 'mint', 'lavender'],
        sizes: foundProduct.sizes || ['XS', 'S', 'M', 'L', 'XL'],
        backgroundColors: ['#f0d0c0', '#303030', '#c0e0d0', '#e0d0e0', '#f0f0e0'],
        hasRealImages: foundProduct.id === 1, // Only product 1 has real images in the current setup
        imagePath: foundProduct.imagePath, // Store the main image path from product listing
        imageViews: {
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
  }, [productId]);

  if (!product) {
    return <div className="product-not-found">Loading product...</div>;
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
      <div className="product-detail-container" style={{ 
        display: 'flex',
        flexDirection: 'row',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px'
      }}>
        <div className="product-gallery" style={{ 
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}>
          <div className="main-image-container" style={{
            width: '100%',
            marginBottom: '10px',
            overflow: 'hidden'
          }}>
            {mainImageIndex > 0 ? (
              // Show a colored square when a color thumbnail is selected
              <div 
                className="main-product-image color-display" 
                style={{ 
                  position: 'relative',
                  width: '100%',
                  height: '600px',
                  backgroundColor: getCurrentBackgroundColor(),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div style={{ 
                  color: getCurrentBackgroundColor() === '#303030' ? '#fff' : '#333',
                  fontSize: '24px',
                  fontWeight: 'bold'
                }}>
                  {product.name} - {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}
                </div>
              </div>
            ) : product.hasRealImages ? (
              <div 
                className="main-product-image" 
                onClick={handleImageClick}
                style={{ 
                  cursor: 'pointer',
                  position: 'relative',
                  width: '100%',
                  height: '600px'
                }}
              >
                <img 
                  src={product.imageViews[viewMode]} 
                  alt={`${product.name} - ${viewLabels[viewMode]}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>
            ) : (
              <div 
                className="main-product-image" 
                style={{ 
                  position: 'relative',
                  width: '100%',
                  height: '600px',
                }}
              >
                <img 
                  src={product.imagePath} 
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>
            )}
          </div>
          
          {/* Fixed-position thumbnails column on the right side */}
          <div className="thumbnail-images" style={{
            position: 'absolute',
            right: '-110px',
            top: '0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100px'
          }}>
            {/* Product thumbnail image first */}
            <div 
              className={`thumbnail product-thumbnail ${mainImageIndex === 0 ? 'active' : ''}`} 
              onClick={() => {
                setMainImageIndex(0);
                setViewMode('front');
              }}
              style={{
                height: '100px',
                width: '100px',
                marginBottom: '10px',
                cursor: 'pointer',
                border: mainImageIndex === 0 ? '2px solid #000' : '1px solid #ddd',
                overflow: 'hidden'
              }}
            >
              <img 
                src={product.imagePath} 
                alt={`${product.name} thumbnail`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            
            {/* Color squares for thumbnail selection */}
            {product.colors.slice(0, 3).map((color, index) => (
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
                style={{
                  backgroundColor: color === 'beige' ? '#f0d0c0' :
                                  color === 'black' ? '#303030' :
                                  color === 'mint' ? '#c0e0d0' :
                                  color === 'lavender' ? '#e0d0e0' : 
                                  product.backgroundColors[index],
                  height: '100px',
                  width: '100px',
                  marginBottom: '10px',
                  cursor: 'pointer',
                  border: mainImageIndex === index + 1 ? '2px solid #000' : '1px solid #ddd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div style={{ 
                  color: color === 'black' ? '#fff' : '#333', 
                  fontSize: '14px', 
                  textAlign: 'center'
                }}>
                  View {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="product-info" style={{ 
          flex: '1',
          padding: '0 20px',
          marginLeft: '100px'  // Provide space for the thumbnails
        }}>
          <h1 className="product-title" style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '10px'
          }}>{product.name}</h1>
          <div className="product-price" style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '5px'
          }}>${product.price}</div>
          <div className="product-tax" style={{
            fontSize: '12px',
            color: '#666',
            marginBottom: '20px'
          }}>MRP incl. of all taxes</div>
          
          <div className="product-description" style={{
            fontSize: '14px',
            lineHeight: '1.5',
            marginBottom: '20px'
          }}>
            {product.description}
          </div>
          
          <div className="product-options">
            <div className="color-selection" style={{
              marginBottom: '20px'
            }}>
              <label style={{
                display: 'block',
                marginBottom: '10px',
                fontWeight: 'bold'
              }}>Color:</label>
              <div className="color-options" style={{
                display: 'flex'
              }}>
                {product.colors.map(color => (
                  <button 
                    key={color} 
                    className={`color-swatch ${selectedColor === color ? 'selected' : ''}`}
                    onClick={() => handleColorChange(color)}
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
            
            <div className="size-selection" style={{
              marginBottom: '20px'
            }}>
              <label style={{
                display: 'block',
                marginBottom: '10px',
                fontWeight: 'bold'
              }}>Size:</label>
              <div className="size-options" style={{
                display: 'flex'
              }}>
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
            
            <div className="size-guide" style={{
              marginBottom: '20px'
            }}>
              <a href="#" style={{ 
                textDecoration: 'underline', 
                fontSize: '14px',
                color: '#000'
              }}>FIND YOUR SIZE | MEASUREMENT GUIDE</a>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="add-to-cart" 
              style={{
                backgroundColor: isAddedToCart ? '#4CAF50' : '#000', // Green when added, black by default
                color: '#fff',
                padding: '12px 40px',
                border: 'none',
                marginTop: '20px',
                cursor: 'pointer',
                fontWeight: 'bold',
                width: '100%',
                transition: 'background-color 0.3s ease'
              }}
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