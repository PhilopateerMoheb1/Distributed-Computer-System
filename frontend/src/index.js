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
import AddListing from "./pages/AddListing/AddListing"
import UserInfoPage from './pages/Profile/UserInfoPage';
import OrdersInfoPage from './pages/Profile/OrdersInfoPage';
import TransactionsPage from './pages/Profile/TransactionsPage';
import RootLayout from './pages/Routes/RootLayout';




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout/>} >
      <Route index element = {<Product/>}/>
      <Route path="/CreditCard"  element = {<CreditCard/>}/>
      <Route path="/AddListing"  element = {<AddListing/>}/>
      <Route path="/userInfo"  element = {<UserInfoPage/>}/>
      <Route path="/transactions"  element = {<TransactionsPage/>}/>
      <Route path="/orders"  element = {<OrdersInfoPage/>}/>
    </Route>

  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));        
root.render( 
  <React.StrictMode>
  <RouterProvider router={router} />
   {/* <AddListing/>  */}
  </React.StrictMode>
);
