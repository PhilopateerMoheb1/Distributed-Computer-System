import "./Product.css"
import Product from "./Components/Product";
import React, { useEffect, useState } from "react";
import axios from 'axios';


export default function ProductPage(){
    const [Productdata,setData] = useState([]);
    var pathname = window.location.pathname
    pathname = pathname.substring(pathname.lastIndexOf("/"))
    const URL = "http://localhost:80/products" + pathname
    useEffect(()=>{
        axios.get(URL)
        .then(function (response) {
            setData(response.data[0]);
        })
    },[]);
    return(
        <div class="">
        <Product 
                            name={Productdata.Product_Name}
                            category = {Productdata.Category}
                            description={Productdata.Product_Description}
                            img={Productdata.Product_Picture}
                            Product_Price={Productdata.Product_Price}
                            />

        </div>
    );
}