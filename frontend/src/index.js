import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Product from "./Pages/Product/Product"
import Header from "./Components/Header"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header/>
  </React.StrictMode>
);
