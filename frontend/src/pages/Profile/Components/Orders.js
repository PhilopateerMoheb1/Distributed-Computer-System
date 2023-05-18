import "../styles.css"
import 'bootstrap/dist/css/bootstrap.css';
import {useState, useEffect} from "react";
import axios from 'axios';
import OrdersCard from "./OrdersCard";

export default function Orders(){
  
  const [data,setData] = useState([]);
  const [empty,setEmpty] = useState(false);
  axios.defaults.withCredentials = true;
  useEffect(()=>{
    axios.get('http://localhost:80/session').then(
      (response) => {
          if("ID" in response.data && response.data.Role === "User"){
            window.location = "./transactions";
          }
          if("ID" in response.data){
            axios.post('http://localhost:80/getlistings',response.data.ID)
            .then(function (response) {  
              if(response.data.length === 0){
                setEmpty(true)
              }           
                    setData(response.data)
            })
          }
      }

  );
},[]);


    return(
      <div class="row" style={{paddingTop: "50px", paddingBottom: "50px"}}>
        <div class="col-3" style={{paddingLeft: "50px"}}>
          <div class="list-group" id="list-tab" role="tablist">
          <a class="list-group-item list-group-item-action" id="list-home-list" data-bs-toggle="list" href="./userInfo" role="tab" aria-controls="list-home">User Info</a>
      <a class="list-group-item list-group-item-action active" id="list-profile-list" data-bs-toggle="list" href="./orders" role="tab" aria-controls="list-profile">Listings Added</a>
      <a class="list-group-item list-group-item-action " id="list-profile-list" data-bs-toggle="list" href="./Listings" role="tab" aria-controls="list-profile">Sold Items</a>
      <a class="list-group-item list-group-item-action " id="list-messages-list" data-bs-toggle="list" href="./transactions" role="tab" aria-controls="list-messages">Bought Items</a>
            
          </div>
        </div>
        <div class="col-9" style={{paddingRight: "150px"}}>
          <div class="tab-content" id="nav-tabContent">
            
            <div class="tab-pane fade show active" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
            <div class="row">

<div class="col col-bg-6">
  <div class="list-group">

    { empty? <p class = "Empty">You haven't Made any Listings!</p>:
                data.map((dataItem,index)=>{
                
                  return(
                      <OrdersCard name = {dataItem.Product_Name}
                      pid={dataItem.PID}
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
            
          </div>
        </div>
      </div>
);
}