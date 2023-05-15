import React, { useEffect, useState,useRef } from "react";
import "./Home.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Mouse } from 'react-bootstrap-icons';
import axios from 'axios';
import HomeCard from "./Components/HomeCard";

export default function Home(){


    const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:80/products')
      .then(
        (response) => { 
            setData(response.data);
            console.log(response.data);
        });
  }, []);

    return(
        <div class="HomeContainer">
            <div className="home-welcome-one bg-dark py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="text-center text-white">
                        <h1 className="display-4 fw-bolder">Site Store</h1>
                        <p className="lead fw-normal text-white-50 mb-0">A Store You Can Trust</p>
                    </div>
                </div>
            </div>

            <section class="home-welcome-two py-6 bg-light">
                <div class="row">
                    <div class="mb-3 mb-lg-0 text-center col-lg-4">
                        <div class="px-0 px-lg-3">
                            <FontAwesomeIcon icon={faHome} size="7x"/>
                            <h3 class="h5">Shop from home</h3>
                            <p class="text-muted">If you don't feel like going outside. Use our site and go shopping and browse through itemss. Go ahead and fill up your cart!</p>
                        </div>
                    </div>
                    <div class="mb-3 mb-lg-0 text-center col-lg-4">
                        <div class="px-0 px-lg-3">
                            <Mouse size={115} />
                            <h3 class="h5">One Click Away</h3>
                            <p class="text-muted">Your datas will be ordered just by one click. You can save your time. What are you waiting for!</p>
                        </div>
                    </div>
                    <div class="mb-3 mb-lg-0 text-center col-lg-4">
                        <div class="px-0 px-lg-3">
                            <FontAwesomeIcon icon={faShieldAlt} size="7x" />
                            <h3 class="h5">Buy with confidence</h3>
                            <p class="text-muted">You can go shopping safely. Everything is safe and secure. Your items is encrypted</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="home-products py-5">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    {
                                  data.map((dataItem,index)=>{
                                    return(
                                        <HomeCard 
                                        id = {dataItem.PID}
                                        name = {dataItem.Product_Name}
                                        price = {dataItem.Product_Price}
                                        category = {dataItem.Category}
                                        img = {dataItem.Product_Picture}
                                        available = {dataItem.Quantity_Available==0? <p style={{"color":"red"}}>Out of Stock!</p>:dataItem.Quantity_Available}
                                        />
                                    );
            
                                })}
                    


                    </div>
                </div>
            </div>
        </div>
    );
}

