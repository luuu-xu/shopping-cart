import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShopPage, ShopCategoryMain } from './components/ShopPage';
import HomePage from './components/HomePage';
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<HomePage />}/>
          <Route path='shop' element={<ShopPage />}>
            <Route index element={<ShopCategoryMain category="Shop All" />} />
            <Route path=':category' element={<ShopCategoryMain />} />
          </Route>
          <Route path='product' element={<ProductPage />}>
            <Route path=':productId' element={<ProductPage />} />
          </Route>
          <Route path='cart' element={<CartPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);  
