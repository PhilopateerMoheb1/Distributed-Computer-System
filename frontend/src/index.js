import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import './index.css';
import Product from "./pages/Product/Product"
import CreditCard from "./pages/CreditCard/Credit"
import Header from "./Components/Header/Header"
import AddListing from "./pages/AddListing/AddListing"
import ImageUpload from './Components/ImageUpload';
import RootLayout from './pages/Routes/RootLayout';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <CreditCard/>
//   </React.StrictMode>
// );


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout/>} >
      <Route index element = {<Product/>}/>
      <Route path="/CreditCard"  element = {<CreditCard/>}/>
      <Route path="/AddListing"  element = {<AddListing/>}/>
    </Route>

  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));        
root.render( 
  <React.StrictMode>
  <RouterProvider router={router} />
</React.StrictMode>
);
