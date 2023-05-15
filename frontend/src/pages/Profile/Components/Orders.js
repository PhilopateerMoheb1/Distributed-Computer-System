import "../styles.css"
import 'bootstrap/dist/css/bootstrap.css';
import {useState, useEffect} from "react";
import axios from 'axios';
import OrdersCard from "./OrdersCard";

export default function Orders(){
  
  const [data,setData] = useState([]);
  axios.defaults.withCredentials = true;
  useEffect(()=>{
    axios.get('http://localhost:80/session').then(
      (response) => {
          if("ID" in response.data){
            axios.post('http://localhost:80/getlistings',response.data.ID)
            .then(function (response) {               
                  axios.post('http://localhost:80/listings',response.data)
                  .then(function(response) {
                    setData(response.data)
                  })
            })
          }
      }

  );
},[]);
    return(
<div class="ProfileContainer">


  <main class="d-flex flex-nowrap">
    <div class="d-flex flex-column flex-shrink-0 p-3 text-bg-tertiary" style={{width: "280px", height: "610px"}}>
      <hr/>
      <ul class="nav nav-pills flex-column mb-auto">
        <li>
          <a href="./userinfo" class="nav-link text-white">
            <svg class="bi pe-none me-2" width="16" height="16">
              <use href="#home"></use>
            </svg>
            User Info
          </a>
        </li>
        <li class="nav-item">
          <a href="./orders" class="nav-link active" aria-current="page">
            <svg class="bi pe-none me-2" width="16" height="16">
              <use href="#speedometer2"></use>
            </svg>
            Your Listings
          </a>
        </li>
        <li>
          <a href="./transactions" class="nav-link text-white">
            <svg class="bi pe-none me-2" width="16" height="16">
              <use href="#table"></use>
            </svg>
            Transactions
          </a>
        </li>
      </ul>
      
    </div>

    <div class="b-example-divider b-example-vr"></div>

    <div class="d-flex flex-column flex-shrink-0 p-3 text-bg-tertiary" style={{margin: "0 auto", width: "1200px"}}>
      <hr/>
      <div class="row">

        <div class="col col-bg-6">
          <div class="list-group">

            {
                        data.map((dataItem,index)=>{
                        
                          return(
                              <OrdersCard name = {dataItem.Product_Name}
                              category = {dataItem.Category}
                              description = {dataItem.Product_Description}
                              img = {dataItem.Product_Picture}
                              quantity = {dataItem.Quantity_Available}
                              />
                          );
  
                      })}
            



          </div>
        </div>
      </div>

    </div>
  </main>

</div>
);
}