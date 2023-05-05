import "./Product.css"
import Product from "./Components/Product";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import swal from 'sweetalert2'
let usermoney = 5000


export default function ProductPage(){
    const handleClick = () => {

        axios.get('http://localhost:80/users')
            .then(function (response) {
                let balance = response.data[0].Cash_Balance
                if(balance>=Productdata.Proudct_Price){
                    let inputs = ["Cash_Balance",response.data[0].Cash_Balance-Productdata.Proudct_Price,"Name",response.data[0].Name]
                    axios.post('http://localhost:80/transaction',inputs);
                
                  swal.fire(
                    'Done!',
                    'Your Transaction Was Successful!',
                    'success'
                  )
                }
                else{
                  swal.fire(
                    'Failed!',
                    'insufficient Funds In Wallet',
                    'error'
                  )
                }
            })
      }
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
        <div class="ProductMain">
        <Product 
                            name={Productdata.Product_Name}
                            // name = "Application"
                            description={Productdata.Product_Description}
                            // description = "I wouldn't know where to start sweet music playing in the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heartin the dark, you steal my foolish heart don't ruin this on me I wouldn't know whereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
                            img={Productdata.Product_Picture}
                            Proudct_Price={Productdata.Proudct_Price}
                            />
        <div class="card"> 
        <div class="card__footer real">
          <div class="recommend">
            <p>Recommended by</p>
            <h3>Andrew Palmer</h3>
          </div>
          <div class="action">
            <button onClick={handleClick}  >Buy!</button>
          </div>
        </div> </div>
        </div>
       </div>
    );
}