import "./Product.css"
import Product from "./Components/Product";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import swal from 'sweetalert2'
import Header from "../../Components/Header/Header";
let usermoney = 5000


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
        <div class="Product">
          <Header/>
        <Product 
                            name={Productdata.Product_Name}
                            category = {Productdata.Category}
                            // name = "Application"
                            description={Productdata.Product_Description}
                            // description = "I wouldn't know where to start sweet music playing in the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heart don't ruin this on me I wouldn't know whereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
                            img={Productdata.Product_Picture}
                            Product_Price={Productdata.Product_Price}
                            />

        </div>
    );
}