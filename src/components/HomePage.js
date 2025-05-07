// pages/HomePage.js
import React, { useState, useEffect } from 'react';
import FeaturedCollection from '../components/FeaturedCollection.js';
import Footer from '../components/Footer.js';
import Navbar from '../components/Navbar.js';
import './HomePage.css';

const HomePage = () => {
  
  const [activeFilter, setActiveFilter] = useState('ALL');
 
  const [collectionIndex, setCollectionIndex] = useState(0);
 
  const [products, setProducts] = useState([]);

  const [jsonProducts, setJsonProducts] = useState([]);


useEffect(() => {
 
  const productsData = { 
    "products": [
      {
        "id": 1,
        "name": "Mini Dress",
        "price": 29.99,
        "imagePath": "/images/Мінісукня.png",
        "category": "DRESSES",
        "gender": "WOMEN",
        "sizes": ["XS", "S", "M", "L"],
        "color": "Blue",
        "inStock": true,
        "isNew": true,
        "isBestSeller": true,
        "tags": ["summer", "casual"],
        "collection": "Summer 2025",
        "rating": 4.5
      },
      {
        "id": 2,
        "name": "Classic T-Shirt",
        "price": 19.99,
        "imagePath": "/images/camo-shirt.png",
        "category": "SHIRTS",
        "gender": "MEN",
        "sizes": ["S", "M", "L", "XL"],
        "color": "Brown",
        "inStock": true,
        "isNew": false,
        "isBestSeller": true,
        "tags": ["basic", "casual"],
        "collection": "Essentials",
        "rating": 4.8
      },
      {
        "id": 3,
        "name": "Slim-fit Jeans",
        "price": 49.99,
        "imagePath": "/images/jeans.png",
        "category": "JEANS",
        "gender": "MEN",
        "sizes": ["S", "M", "L"],
        "color": "Blue",
        "inStock": true,
        "isNew": false,
        "isBestSeller": true,
        "tags": ["casual", "everyday"],
        "collection": "Denim Collection",
        "rating": 4.3
      },
      {
        "id": 4,
        "name": "Leather Jacket",
        "price": 89.99,
        "imagePath": "/images/jacket.png",
        "category": "JACKETS",
        "gender": "WOMEN",
        "sizes": ["M", "L", "XL"],
        "color": "Brown",
        "inStock": true,
        "isNew": true,
        "isBestSeller": false,
        "tags": ["outerwear", "autumn"],
        "collection": "Autumn 2025",
        "rating": 4.7
      },
      {
        "id": 5,
        "name": "Shirts",
        "price": 24.99,
        "imagePath": "/images/cream-shirt.png",
        "category": "SHIRTS",
        "gender": "MEN",
        "sizes": ["S", "M", "L", "XL"],
        "color": "White",
        "inStock": true,
        "isNew": false,
        "isBestSeller": false,
        "tags": ["casual", "smart"],
        "collection": "Essentials",
        "rating": 4.2
      },
      {
        "id": 6,
        "name": "Jeans",
        "price": 69.99,
        "imagePath": "/images/jeans2.png",
        "category": "JEANS",
        "gender": "WOMEN",
        "sizes": ["S", "M"],
        "color": "Blue",
        "inStock": false,
        "isNew": true,
        "isBestSeller": false,
        "tags": ["casual", "set"],
        "collection": "Summer 2025",
        "rating": 4.0
      },
      {
        "id": 7,
        "name": "Jacket",
        "price": 59.99,
        "imagePath": "/images/jacket2.png",
        "category": "JACKETS",
        "gender": "WOMEN",
        "sizes": ["S", "M", "L"],
        "color": "Pink",
        "inStock": true,
        "isNew": false,
        "isBestSeller": true,
        "tags": ["denim", "casual"],
        "collection": "Denim Collection",
        "rating": 4.6
      },
      {
        "id": 8,
        "name": "Maxi Dress",
        "price": 39.99,
        "imagePath": "/images/maxi-dress.png",
        "category": "DRESSES",
        "gender": "WOMEN",
        "sizes": ["XS", "S"],
        "color": "Red",
        "inStock": true,
        "isNew": true,
        "isBestSeller": false,
        "tags": ["elegant", "summer"],
        "collection": "Summer 2025",
        "rating": 4.4
      },
   // {
   //   "id": 9,
   //   "name": "Printed T-Shirt",
   //   "price": 22.99,
   //   "imagePath": "/images/printed-tshirt.png",
   //   "category": "SHIRTS",
   //   "gender": "KIDS",
   //   "sizes": ["M", "L", "XL"],
   //   "color": "Black",
   //   "inStock": true,
   //   "isNew": true,
   //   "isBestSeller": false,
   //   "tags": ["casual", "print"],
   //   "collection": "Graphic Collection",
   //   "rating": 4.1
   // },
      // {
        // "id": 10,
        // "name": "Kids Jeans",
        // "price": 34.99,
        // "imagePath": "/images/kids-jeans.png",
        // "category": "JEANS",
        // "gender": "KIDS",
        // "sizes": ["XS", "S", "M"],
        // "color": "Blue",
        // "inStock": true,
        // "isNew": true,
        // "isBestSeller": false,
        // "tags": ["denim", "casual"],
        // "collection": "Kids Collection",
        // "rating": 4.3
      // },
      {
        "id": 11,
        "name": "Women's Summer Dress",
        "price": 0,
        "imagePath": "/imgs/girl.png",
        "category": "DRESSES",
        "gender": "WOMEN",
        "sizes": [],
        "color": "Red",
        "inStock": true,
        "isNew": true,
        "isBestSeller": false,
        "tags": ["summer"],
        "collection": "Summer 2025",
        "rating": 0
      },
      {
        "id": 12,
        "name": "Casual Women's Outfit",
        "price": 0,
        "imagePath": "/imgs/girl2.png",
        "category": "DRESSES",
        "gender": "WOMEN",
        "sizes": [],
        "color": "Beige",
        "inStock": true,
        "isNew": true,
        "isBestSeller": false,
        "tags": ["casual"],
        "collection": "Summer 2025",
        "rating": 0
      },
      {
        "id": 101,
        "name": "Men's Casual Outfit",
        "price": 79.99,
        "imagePath": "/images/men3.avif",
        "category": "OUTFITS",
        "gender": "MEN",
        "sizes": ["M", "L", "XL"],
        "color": "Mixed",
        "inStock": true,
        "isNew": true,
        "isBestSeller": true,
        "tags": ["casual", "everyday"],
        "collection": "Summer 2025",
        "rating": 4.6
      },
      {
        "id": 102,
        "name": "Premium Men's Suit",
        "price": 199.99,
        "imagePath": "/images/men2.avif",
        "category": "SUITS",
        "gender": "MEN",
        "sizes": ["M", "L", "XL"],
        "color": "Navy",
        "inStock": true,
        "isNew": true,
        "isBestSeller": false,
        "tags": ["formal", "business"],
        "collection": "Formal Collection",
        "rating": 4.8
      },
      {
        "id": 201,
        "name": "kids Play Outfit",
        "price": 0,
        "imagePath": '/images/kid1.jpg',
        "category": "DRESSES",
        "gender": "KIDS",
        "sizes": [],
        "color": "Beige",
        "inStock": true,
        "isNew": true,
        "isBestSeller": false,
        "tags": ["casual"],
        "collection": "Summer 2025",
        "rating": 0
      },
      {
        "id": 202,           
        "name": 'School Collection',
        "price": 0,
        "imagePath": '/images/kid2.jpg',
        "category": "DRESSES",
        "gender": "KIDS",
        "sizes": [],
        "color": "Beige",
        "inStock": true,
        "isNew": true,
        "isBestSeller": false,
        "tags": ["casual"],
        "collection": "Summer 2025",
        "rating": 0
      }
      
      
    ]
  } ;
  setJsonProducts(productsData.products || []);
}, []);

const getNewCollectionItems = () => {
  if (!jsonProducts || jsonProducts.length === 0) {
    return [];
  }
  
  let newItems = jsonProducts.filter(product => product.isNew === true);
  
  if (activeFilter !== 'ALL') {
    console.log('Active filter:', activeFilter);
    <p>Current filter: {activeFilter}</p>


    newItems = newItems.filter(item => item.gender === activeFilter);
  }
  
  return newItems;
};


const getCurrentCollectionItems = () => {
  const items = getNewCollectionItems();
  if (!items || items.length === 0) return [];
  
  const start = collectionIndex;
  const end = Math.min(start + 2, items.length);
  
  if (end - start < 2 && start > 0) {
    return items.slice(0, Math.min(2, items.length));
  }
  
  return items.slice(start, end);
};


const handleCollectionNavigation = (direction) => {
  const items = getNewCollectionItems();
  if (!items || items.length <= 2) return; 
  
  if (direction === 'prev') {
    
    setCollectionIndex(prevIndex => 
      prevIndex === 0 ? Math.max(0, items.length - 2) : Math.max(0, prevIndex - 2)
    );
  } else {
    
    setCollectionIndex(prevIndex => 
      prevIndex + 2 >= items.length ? 0 : prevIndex + 2
    );
  }
};



  useEffect(() => {
    
    const loadProducts = async () => {
      try {
       
        const productsData = {
          "products": [
            {
              "id": 1,
              "name": "Mini Dress",
              "price": 29.99,
              "imagePath": "/images/Мінісукня.png",
              "category": "DRESSES",
              "gender": "WOMEN",
              "sizes": ["XS", "S", "M", "L"],
              "color": "Blue",
              "inStock": true,
              "isNew": true,
              "isBestSeller": true,
              "tags": ["summer", "casual"],
              "collection": "Summer 2025",
              "rating": 4.5
            },
            {
              "id": 2,
              "name": "Classic T-Shirt",
              "price": 19.99,
              "imagePath": "/images/camo-shirt.png",
              "category": "SHIRTS",
              "gender": "MEN",
              "sizes": ["S", "M", "L", "XL"],
              "color": "Brown",
              "inStock": true,
              "isNew": false,
              "isBestSeller": true,
              "tags": ["basic", "casual"],
              "collection": "Essentials",
              "rating": 4.8
            },
            {
              "id": 3,
              "name": "Slim-fit Jeans",
              "price": 49.99,
              "imagePath": "/images/jeans.png",
              "category": "JEANS",
              "gender": "MEN",
              "sizes": ["S", "M", "L"],
              "color": "Blue",
              "inStock": true,
              "isNew": false,
              "isBestSeller": true,
              "tags": ["casual", "everyday"],
              "collection": "Denim Collection",
              "rating": 4.3
            },
            {
              "id": 4,
              "name": "Leather Jacket",
              "price": 89.99,
              "imagePath": "/images/jacket.png",
              "category": "JACKETS",
              "gender": "WOMEN",
              "sizes": ["M", "L", "XL"],
              "color": "Brown",
              "inStock": true,
              "isNew": true,
              "isBestSeller": false,
              "tags": ["outerwear", "autumn"],
              "collection": "Autumn 2025",
              "rating": 4.7
            },
            {
              "id": 5,
              "name": "Shirts",
              "price": 24.99,
              "imagePath": "/images/cream-shirt.png",
              "category": "SHIRTS",
              "gender": "MEN",
              "sizes": ["S", "M", "L", "XL"],
              "color": "White",
              "inStock": true,
              "isNew": false,
              "isBestSeller": false,
              "tags": ["casual", "smart"],
              "collection": "Essentials",
              "rating": 4.2
            },
            {
              "id": 6,
              "name": "Jeans",
              "price": 69.99,
              "imagePath": "/images/jeans2.png",
              "category": "JEANS",
              "gender": "WOMEN",
              "sizes": ["S", "M"],
              "color": "Blue",
              "inStock": false,
              "isNew": true,
              "isBestSeller": false,
              "tags": ["casual", "set"],
              "collection": "Summer 2025",
              "rating": 4.0
            },
            {
              "id": 7,
              "name": "Jacket",
              "price": 59.99,
              "imagePath": "/images/jacket2.png",
              "category": "JACKETS",
              "gender": "WOMEN",
              "sizes": ["S", "M", "L"],
              "color": "Pink",
              "inStock": true,
              "isNew": false,
              "isBestSeller": true,
              "tags": ["denim", "casual"],
              "collection": "Denim Collection",
              "rating": 4.6
            },
            {
              "id": 8,
              "name": "Maxi Dress",
              "price": 39.99,
              "imagePath": "/images/maxi-dress.png",
              "category": "DRESSES",
              "gender": "WOMEN",
              "sizes": ["XS", "S"],
              "color": "Red",
              "inStock": true,
              "isNew": true,
              "isBestSeller": false,
              "tags": ["elegant", "summer"],
              "collection": "Summer 2025",
              "rating": 4.4
            },
            {
              "id": 9,
              "name": "Printed T-Shirt",
              "price": 22.99,
              "imagePath": "/images/printed-tshirt.png",
              "category": "SHIRTS",
              "gender": "KIDS",
              "sizes": ["M", "L", "XL"],
              "color": "Black",
              "inStock": true,
              "isNew": true,
              "isBestSeller": false,
              "tags": ["casual", "print"],
              "collection": "Graphic Collection",
              "rating": 4.1
            },
            {
              "id": 10,
              "name": "Kids Jeans",
              "price": 34.99,
              "imagePath": "/images/kids-jeans.png",
              "category": "JEANS",
              "gender": "KIDS",
              "sizes": ["XS", "S", "M"],
              "color": "Blue",
              "inStock": true,
              "isNew": true,
              "isBestSeller": false,
              "tags": ["denim", "casual"],
              "collection": "Kids Collection",
              "rating": 4.3
            },
            {
              "id": 11,
              "name": "Women's Summer Dress",
              "price": 0,
              "imagePath": "/imgs/girl.png",
              "category": "DRESSES",
              "gender": "WOMEN",
              "sizes": [],
              "color": "Red",
              "inStock": true,
              "isNew": true,
              "isBestSeller": false,
              "tags": ["summer"],
              "collection": "Summer 2025",
              "rating": 0
            },
            {
              "id": 12,
              "name": "Casual Women's Outfit",
              "price": 0,
              "imagePath": "/imgs/girl2.png",
              "category": "DRESSES",
              "gender": "WOMEN",
              "sizes": [],
              "color": "Beige",
              "inStock": true,
              "isNew": true,
              "isBestSeller": false,
              "tags": ["casual"],
              "collection": "Summer 2025",
              "rating": 0
            },

            {
              id: 201,
              "name": "kids Play Outfit",
              "price": 0,
              "imagePath": '/images/kid1.jpg',
              "category": "DRESSES",
              "gender": "KIDS",
              "sizes": [],
              "color": "Beige",
              "inStock": true,
              "isNew": true,
              "isBestSeller": false,
              "tags": ["casual"],
              "collection": "Summer 2025",
              "rating": 0
            },
            {
              id: 202,           
              "name": 'School Collection',
              "price": 0,
              "imagePath": '/images/kid2.jpg',
              "category": "DRESSES",
              "gender": "KIDS",
              "sizes": [],
              "color": "Beige",
              "inStock": true,
              "isNew": true,
              "isBestSeller": false,
              "tags": ["casual"],
              "collection": "Summer 2025",
              "rating": 0
            }
          ]
        };
        
        setProducts(productsData.products);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };

    loadProducts();
  }, []);

  
  const allProducts = {
    
    newCollectionItems: [
      {
        id: 1,
        image: '/imgs/girl.png',
        name: 'Women\'s Summer Dress',
        category: 'WOMEN',
        featured: true
      },
      {
        id: 2,
        image: '/imgs/girl2.png',
        name: 'Casual Women\'s Outfit',
        category: 'WOMEN',
        featured: true
      },
      {
        id: 101,
        image: '/images/men3.avif',
        name: 'Men\'s Casual Outfit',
        category: 'Men',
        featured: true
      },
      {
        id: 102,
        image: '/images/men2.avif',
        name: 'Premium Men\'s Suit',
        category: 'Men',
        featured: true
      },
      {
        id: 201,
        image: '/images/kid1.jpg',
        name: 'Kids Play Outfit',
        category: 'KIDS',
        featured: true
      },
      {
        id: 202,
        image: '/images/kid2.jpg',
        name: 'School Collection',
        category: 'KIDS',
        featured: true
      }
    ],

    
    newThisWeekItems: [
      {
        id: 3,
        image: '/images/printed-shirt.png',
        category: 'MEN',
        type: 'Printed T-Shirt',
        name: 'Embroidered Geometric Print',
        price: 89.99
      },
      {
        id: 4,
        image: '/images/basic-tee.png',
        category: 'MEN',
        type: 'Cotton T-Shirt',
        name: 'Basic White T-Shirt',
        price: 39.99
      },
      {
        id: 5,
        image: '/images/graphic-tee.png',
        category: 'MEN',
        type: 'Printed T-Shirt',
        name: 'Abstract Print T-Shirt',
        price: 49.99
      },
      {
        id: 6,
        image: "/images/minimal-shirt.png",
        category: 'MEN',
        type: 'Designer T-Shirt',
        name: 'Full Sleeve Design',
        price: 59.99
      },
      
      {
        id: 103,
        image: "/images/women_shirt_1.avif",
        category: 'WOMEN',
        type: 'Summer Blouse',
        name: 'Floral Pattern Blouse',
        price: 69.99
      },
      {
        id: 104,
        image: "/images/women_shirt_2.avif",
        category: 'WOMEN',
        type: 'Summer Dress',
        name: 'Light Cotton Dress',
        price: 89.99
      },
      {
        id: 105,
        image: "/images/women_shirt3.avif",
        category: 'WOMEN',
        type: 'Summer Dress',
        name: 'Light Cotton Dress',
        price: 89.99
      },
      {
        id: 106,
        image: "/images/women_shirt4.avif",
        category: 'WOMEN',
        type: 'Summer Dress',
        name: 'Light Cotton Dress',
        price: 89.99
      },
      
      {
        id: 203,
        image: "/images/kids_shirt_1.jpg",
        category: 'KIDS',
        type: 'Cotton T-Shirt',
        name: 'Cartoon Print T-Shirt',
        price: 29.99
      },
      {
        id: 204,
        image: "/images/kids_shirt_2.jpg",
        category: 'KIDS',
        type: 'Cotton T-Shirt',
        name: 'Cartoon Print T-Shirt',
        price: 29.99
      },
      {
        id: 205,
        image: "/images/kids_shirt_3.jpg",
        category: 'KIDS',
        type: 'Cotton T-Shirt',
        name: 'Cartoon Print T-Shirt',
        price: 29.99
      },
    
      {
        id: 206,
        image: "/images/kids_shirt4.jpg",
        category: 'KIDS',
        type: 'Summer Set',
        name: 'Casual Play Set',
        price: 49.99
      }
    ],

    collectionItems: [
      
      {
        id: 7,
        image: '/images/camo-shirt.png',
        name: 'Green Henley T-Shirt',
        category: 'MEN',
        price: 89.99
      },
      {
        id: 8,
        image: '/images/white-outfit.png',
        name: 'Light Beige T-Height T-Shirt',
        category: 'MEN',
        price: 99.99
      },
      {
        id: 9,
        image: '/images/cream-shirt.png',
        name: 'Cream Heavy T-Shirt',
        category: 'MEN',
        price: 69.99
      },
      
      {
        id: 10,
        image: '/images/women_t1.avif',
        name: 'Elegant Summer Blouse',
        category: 'WOMEN',
        price: 79.99
      },
      {
        id: 11,
        image: '/images/women_t2.avif',
        name: 'Floral Pattern Dress',
        category: 'WOMEN',
        price: 109.99
      },
      {
        id: 12,
        image: '/images/women_t3.avif',
        name: 'Lightweight Denim Jacket',
        category: 'WOMEN',
        price: 129.99
      },
      // Kids' items
      {
        id: 13,
        image: '/images/kid_1.jpg',
        name: 'Colorful Kids T-Shirt',
        category: 'KIDS',
        price: 39.99
      },
      {
        id: 14,
        image: '/images/kid_2.jpg',
        name: 'Comfortable Cotton Pants',
        category: 'KIDS',
        price: 49.99
      },
      {
        id: 15,
        image: '/images/kid_3.jpg',
        name: 'Sporty Kids Hoodie',
        category: 'KIDS',
        price: 59.99
      }
    ]
  };

  const [filteredProducts, setFilteredProducts] = useState({
    newCollectionItems: [],
    newThisWeekItems: [],
    collectionItems: []
  });

 
  // const getNewCollectionItems = () => {
    // if (products.length === 0) return [];
    // 
   
    // const newItems = products.filter(product => product.isNew === true);
    // 
    // if (activeFilter !== 'ALL') {
      // return newItems.filter(item => 
        // item.gender === activeFilter || item.category === activeFilter
      // );
    // }
    // 
    // return newItems;
  // };

  useEffect(() => {
    
    const filterProducts = () => {
     
      const newCollectionFromJson = getNewCollectionItems();
      
      if (activeFilter === 'ALL') {
        
        return {
         
          newCollectionItems: newCollectionFromJson,
          
          newThisWeekItems: allProducts.newThisWeekItems,
          
          collectionItems: allProducts.collectionItems
        };
      } else {
       
        return {
          newCollectionItems: newCollectionFromJson,
          
          newThisWeekItems: allProducts.newThisWeekItems.filter(
            item => item.category === activeFilter
          ),
          
          collectionItems: allProducts.collectionItems.filter(
            item => item.category === activeFilter
          )
        };
      }
    };

    setFilteredProducts(filterProducts());
  }, [activeFilter, products]);

  // const handleCollectionNavigation = (direction) => {
    // const items = filteredProducts.newCollectionItems;
    // if (!items || items.length <= 2) return; 
    // 
    // if (direction === 'prev') {
     
      // setCollectionIndex(prevIndex => 
        // prevIndex === 0 ? Math.max(0, items.length - 2) : Math.max(0, prevIndex - 2)
      // );
    // } else {
   
      // setCollectionIndex(prevIndex => 
        // prevIndex + 2 >= items.length ? 0 : prevIndex + 2
      // );
    // }
  // };

  // const getCurrentCollectionItems = () => {
    // const items = filteredProducts.newCollectionItems;
    // if (!items || items.length === 0) return [];
    // 
    
    // const start = collectionIndex;
    // const end = Math.min(start + 2, items.length);
    // return items.slice(start, end);
  // };

const [weekItemIndex, setWeekItemIndex] = useState(0);
const itemsPerPage = 4;

useEffect(() => {
  
  setWeekItemIndex(0);
}, [activeFilter]);

const handleWeekNavigation = (direction) => {
  const items = filteredProducts.newThisWeekItems;
  if (!items || items.length <= itemsPerPage) return; 
  
  if (direction === 'prev') {
    
    setWeekItemIndex(prevIndex => 
      prevIndex === 0 ? Math.max(0, items.length - itemsPerPage) : Math.max(0, prevIndex - itemsPerPage)
    );
  } else {
    
    setWeekItemIndex(prevIndex => 
      prevIndex + itemsPerPage >= items.length ? 0 : prevIndex + itemsPerPage
    );
  }
};

const getCurrentWeekItems = () => {
  const items = filteredProducts.newThisWeekItems;
  if (!items || items.length === 0) return [];
  
  const start = weekItemIndex;
  const end = Math.min(start + itemsPerPage, items.length);
  
  return items.slice(start, end);
};

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

const [showMore, setShowMore] = useState(false);

const [visibleRows, setVisibleRows] = useState(1);
const itemsPerRow = 3;

const getVisibleCollectionItems = () => {
  const items = filteredProducts.collectionItems;
  if (!items || items.length === 0) return [];
  
  return items.slice(0, visibleRows * itemsPerRow);
};

  return (
    <div className="home-page">
      {/* Pass activeFilter and setActiveFilter to Navbar */}
      <Navbar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

      <section className="new-collection">
  <div className="search-container">
    <input type="text" placeholder="Search" className="search-input" />
  </div>
  <div className="collection-container">
    <div className="title-container">
      <h2>NEW<br />COLLECTION</h2>
      <p>Summer<br />2025</p>
      <div className="shop-navigation">
        <button className="shop-btn">Go To Shop <span>→</span></button>
        <div className="navigation-arrows">
          <button 
            className={`arrow-button ${collectionIndex === 0 ? 'active' : ''}`}
            onClick={() => handleCollectionNavigation('prev')}
          >〈</button>
          <button 
            className="arrow-button"
            onClick={() => handleCollectionNavigation('next')}
          >〉</button>
        </div>
      </div>
    </div>
    <div className="collection-images">
      <div className="featured-items">
        {getCurrentCollectionItems().map((item) => (
          <div key={item.id} className="featured-item">
            <img 
              src={item.imagePath} 
              alt={item.name} 
              className="featured-image" 
            />
           
          </div>
        ))}
      </div>
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
    <span className="item-count" style={{ color: "blue", textTransform: "uppercase" }}>
      ({filteredProducts.newThisWeekItems.length})
    </span>
    <a href="#" className="view-all">See All</a>
  </div>

  <div className="week-products-grid">
    {filteredProducts.newThisWeekItems.length > 0 ? (
      getCurrentWeekItems().map(item => (
        <div key={item.id} className="week-product-item">
          <div className="week-product-image-container">
            <img src={item.image} alt={item.name} className="week-product-image" />
            <button className="week-add-button">+</button>
          </div>
          <div className="week-product-details">
            <p className="week-product-category">{item.type}</p>
            <h3 className="week-product-name">{item.name}</h3>
            <p className="week-product-price">${item.price.toFixed(2)}</p>
          </div>
        </div>
      ))
    ) : (
      <div className="no-items-message">No items available for this filter</div>
    )}
  </div>

  {filteredProducts.newThisWeekItems.length > itemsPerPage && (
    <div className="week-pagination">
      <button 
        className="week-arrow prev" 
        onClick={() => handleWeekNavigation('prev')}
      >←</button>
      <button 
        className="week-arrow next" 
        onClick={() => handleWeekNavigation('next')}
      >→</button>
    </div>
  )}
</section>
<section className="collections">
      <div className="section-header">
        <div className="title-and-categories">
          <h2>XIV COLLECTIONS 23-24</h2>
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

      <div className="product-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '20px' 
      }}>
        {filteredProducts.collectionItems
          .slice(0, visibleRows * itemsPerRow)
          .map(item => (
            <div key={item.id} className="product-card">
              <div className="product-image-wrapper">
                <img src={item.image} alt={item.name} style={{ width: '100%', height: 'auto' }} />
              </div>
              <div className="product-info">
                <h3 className="product-name">{item.name}</h3>
                <p className="product-price">${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))
        }
      </div>
      
      {filteredProducts.collectionItems.length > visibleRows * itemsPerRow && (
        <div className="load-more-container" style={{ textAlign: 'center', margin: '20px 0' }}>
          <button 
            className="load-more-button" 
            onClick={() => setVisibleRows(prevRows => prevRows + 1)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#000',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Show More
          </button>
        </div>
      )}
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
