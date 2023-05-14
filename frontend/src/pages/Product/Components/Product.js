
import swal from 'sweetalert2'
import React, { useEffect, useState,useRef} from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
let usermoney = 100;


function Product(props){

  const handleClick = () => {

    axios.get('http://localhost:80/users')
        .then(function (response) {
            let balance = response.data[0].Cash_Balance
            if(balance>=Productdata.Product_Price){
                let inputs = ["Cash_Balance",response.data[0].Cash_Balance-Productdata.Product_Price,"Name",response.data[0].Name]
                axios.post('http://localhost:80/transaction',inputs);
            
              swal.fire(
                'Done!',
                'Your Transaction Was Successful!',
                'success'
              )
              
            }
            else{
              swal.fire({
                title: "Failed!",
                text: 'insufficient Funds In Wallet',
                icon: 'error'
            }).then(function() {
                window.location = "CreditCard";
            });
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
      <div class ="productBody">

        <section class="py-5 productFrame">
            <div class="container px-4 px-lg-5 my-5">
                <div class="row gx-4 gx-lg-5 align-items-center">
                    <div class="col-md-6"><img class=" productIMG mb-5 mb-md-0" src={props.img} alt="..." /></div>
                    <div class="col-md-6">
                        <div class="small mb-1">Category: {props.category}</div>
                        <h1 class="display-5 fw-bolder">{props.name}</h1>
                        <div class="fs-5 mb-5">
                            <span>{props.Product_Price} L.E.</span>
                        </div>
                        <p class="lead">{props.description}</p>
                        <div class="d-flex">
                            <div class="buttons"> <button class="btn btn-outline-warning btn-long cart">Add to Cart</button> <button onClick={handleClick} class="btn btn-warning btn-long buy">Buy it Now</button>  </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
        <script src="js/scripts.js"></script>
      </div>
      
    );
}

export default Product;