import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Product from "./Pages/Product/Product"
import Header from "./Components/Header/Header"
import AddListing from "./Pages/AddListing/AddListing"
import ImageUpload from './Components/ImageUpload';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AddListing/>
  </React.StrictMode>
);
