import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { ShopPage, ShopCategoryMain } from './components/ShopPage';
import HomePage from './components/HomePage';
import PRODUCTS from './data/PRODUCTS';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<HomePage />}/>
        <Route path='shop' element={<ShopPage products={PRODUCTS} />}>
          <Route path=':category' element={<ShopCategoryMain products={PRODUCTS} />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);  
