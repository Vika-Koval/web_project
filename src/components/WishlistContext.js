import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const loadWishlist = async () => {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        try {
          const parsedWishlist = JSON.parse(savedWishlist);
          
          if (parsedWishlist.length > 0) {
            try {
              const [productsResponse, newThisWeekResponse, collectionsResponse] = await Promise.all([
                fetch('http://localhost:3001/products'),
                fetch('http://localhost:3001/newThisWeek'),
                fetch('http://localhost:3001/collections')
              ]);
              
              if (!productsResponse.ok || !newThisWeekResponse.ok || !collectionsResponse.ok) {
                throw new Error('Error fetching product data');
              }
              
              const productsData = await productsResponse.json();
              const newThisWeekData = await newThisWeekResponse.json();
              const collectionsData = await collectionsResponse.json();
              
              const allProducts = [...productsData, ...newThisWeekData, ...collectionsData];
              
              const updatedWishlist = parsedWishlist.map(wishlistItem => {
                const freshProduct = allProducts.find(p => p.id === wishlistItem.id);
                
                return freshProduct || wishlistItem;
              });
              
              setWishlistItems(updatedWishlist);
            } catch (fetchError) {
              console.error('Error refreshing wishlist data:', fetchError);
              setWishlistItems(parsedWishlist);
            }
          } else {
            setWishlistItems(parsedWishlist);
          }
        } catch (parseError) {
          console.error('Error parsing wishlist from localStorage:', parseError);
          localStorage.removeItem('wishlist');
          setWishlistItems([]);
        }
      }
      setInitialized(true);
    };
    
    loadWishlist();
  }, []);


  useEffect(() => {
    if (initialized) {
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, initialized]);

  const addToWishlist = (product) => {
    setWishlistItems(prev => {
      // Check if product is already in wishlist
      if (prev.some(item => item.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const getWishlistCount = () => {
    return wishlistItems.length;
  };

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
    getWishlistCount
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};