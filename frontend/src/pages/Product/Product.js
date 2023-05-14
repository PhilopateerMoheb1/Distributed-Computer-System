import "./Product.css"
import Product from "./Components/Product";
import React, { useEffect, useState } from "react";
import axios from 'axios';


export default function ProductPage(){
    const [Productdata,setData] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:80/products')
        .then(function (response) {
            setData(response.data[0])
            console.log(response.data[0])
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