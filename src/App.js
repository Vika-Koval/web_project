// App.js - Main component
import React from 'react';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ProductListingPage from './components/ProductListingPage';
import ProductDetailPage from './components/ProductDetailPage';
import './App.css';

// Method 1: Using RouterProvider (recommended in v6.4+)
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="app">
          <Navbar />
          <HomePage />
        </div>
      ),
    },
    {
      path: "/products",
      element: (
        <div className="app">
          <Navbar />
          <ProductListingPage />
        </div>
      ),
    },
    {
      path: "/product/:productId",
      element: (
        <div className="app">
          <Navbar />
          <ProductDetailPage />
        </div>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

// // Method 2: Alternative approach if needed
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// 
// function AppAlternative() {
//   return (
//     <BrowserRouter>
//       <div className="app">
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/products" element={<ProductListingPage />} />
//           <Route path="/product/:productId" element={<ProductDetailPage />} />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

export default App;