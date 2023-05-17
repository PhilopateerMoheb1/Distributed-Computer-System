
import swal from 'sweetalert2'
import React, { useEffect, useState,useRef} from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


function Product(props){
  const [Userdata,setUserData] = useState({});
  const [data,setProductData] = useState([]);
  var pathname = window.location.pathname
  pathname = pathname.substring(pathname.lastIndexOf("/"))
  const URL = "http://localhost:80/products" + pathname
  useEffect(()=>{
    axios.get('http://localhost:80/session').then(
        (response) => {
            console.log(response)
            if("ID" in response.data){
              setUserData(response.data)
            }
        }
    );
    axios.get(URL)
    .then(function (response) {
      setProductData(response.data[0]);
    })

},[]);


function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}


function formatDate(date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
}

  axios.defaults.withCredentials = true;
  const handleClick = () => {
            if("ID" in Userdata){
            let balance = Userdata.Cash_Balance
            if(data.Quantity_Available <=0){
              swal.fire(
                'Error!',
                'Sorry,Product is Out of Stock!',
                'error'
              )
            }
            else if(balance>=data.Product_Price){
                let inputs = ["Cash_Balance",Userdata.Cash_Balance-data.Product_Price,"Name",Userdata.Name]
                axios.post('http://localhost:80/newtransaction',inputs);
                inputs = ["Quantity_Available",data.Quantity_Available-1,"Product_Name",data.Product_Name]
                axios.post('http://localhost:80/newtransaction',inputs);
                let TransactionInputs = {PID:data.PID, BID:Userdata.ID, SID:data.SID, Transaction_Date:formatDate(new Date())};
                axios.post('http://localhost:80/transaction',TransactionInputs);

              swal.fire({
                title: "Done!",
                text: 'Your Transaction Was Successful!',
                icon: 'success'
            }).then(function() {
                window.location = "/";
            });
            }
            else{
              swal.fire({
                title: "Failed!",
                text: 'insufficient Funds In Wallet',
                icon: 'error'
            }).then(function() {
                window.location = "/CreditCard";
            });
            }
          }
          else{
            window.location = "/login";
          }

  }


    return(
      <div class ="productBody">

        <section class="py-5 productFrame">
            <div class="container px-4 px-lg-5 my-5">
                <div class="row gx-4 gx-lg-5 align-items-center">
                    <div class="col-md-6"><img class=" productIMG mb-5 mb-md-0" src={props.img} alt="..." /></div>
                    <div class="col-md-6">
                        <div class="small mb-1"><h5>Category: {props.category}</h5></div>
                        <h1 class="display-5 fw-bolder">{props.name}</h1>
                        <div class="fs-5 mb-5">
                            <span>{props.Product_Price} L.E.</span>
                            
                            {data.Quantity_Available >0? <p>Quantity Available: {data.Quantity_Available}</p>:<p style={{"color":"red"}}>Out of Stock!</p>}
                        </div>
                        <p class="lead">{props.description}</p>
                        <div class="d-flex">
                            <div class="buttons">  <button onClick={handleClick} class="btn btn-warning btn-long buy">Buy it Now</button>  </div>
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