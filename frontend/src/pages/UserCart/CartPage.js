import "./UserCart.css"
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from "react";
import axios from 'axios';

export default function UserInfoPage(){
    
    const [data, setData] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:80/')
        .then(
          (response) => { 
              setData(response.data);
              console.log(response.data);
          });
    }, []);

    const handleChange = (event) => {
        const value = event.target.value;
        console.log(value);
        
    }


    return(
        <div className="mycart-maincontainer">
            <div className="mycart-header">
                <div className="container">
                    <div className="row">
                        <div className="col col-lg-6">
                            <h5><FontAwesomeIcon icon="fa-solid fa-cart-shopping" />Shopping Cart</h5>
                        </div>
                        <div className="col col-lg-6 mycart-contshopping-div">
                            <button type="button" name="continue-shopping-button" className="btn btn-primary btn-block mycart-contshopping-btn">
                            <FontAwesomeIcon icon="fa-solid fa-share" />Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mycart-body">
                {/* item row */}
               
                {
                                  data.map((dataItem,index)=>{
                                    return(
                                        <CartPage
                                        name = {dataItem.Product_Name}
                                        price = {dataItem.Product_Price}
                                        describtion = {dataItem.Product_Describtion}
                                        img = {dataItem.Product_Picture}
                        
                                        />
                                    );
            
                                })}

            </div>

            <div className="mycart-footer">
                <div className="row">
                    <div className="col col-lg-7"></div>
                    <div className="col col-lg-5">
                        <div className="row">
                            <div className="col col-lg-7">
                                <h4>Total <strong>$20.00</strong></h4>
                            </div>
                            <div className="col col-lg-5">
                                <button type="buttom" className="btn btn-primary btn-block mycart-checkout-btn">
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}