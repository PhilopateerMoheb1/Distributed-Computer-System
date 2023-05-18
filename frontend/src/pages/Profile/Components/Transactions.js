import "../styles.css"
import 'bootstrap/dist/css/bootstrap.css';
import {useState, useEffect} from "react";
import axios from 'axios';
import TransactionCard from "./TransactionCard"

export default function Transactions(){
  const [data,setData] = useState([]);
  const [empty,setEmpty] = useState(false);
  const [showYourListings,setShowYourListings] = useState(false);
  axios.defaults.withCredentials = true;
  useEffect(()=>{
    axios.get('http://localhost:80/session').then(
      (response) => {
        if("ID" in response.data && response.data.Role === "Seller"){
          setShowYourListings(true);
        }
          if("ID" in response.data){
            axios.post('http://localhost:80/gettransaction',response.data.ID)
            .then(function (response) {
                  if(response.data.length === 0){
                    setEmpty(true)
                  }
                  else{
                  axios.post('http://localhost:80/product',response.data)
                  .then(function(response) {
                    setData(response.data)
                  })
                }
          
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
      {showYourListings?<a class="list-group-item list-group-item-action" id="list-profile-list" data-bs-toggle="list" href="./orders" role="tab" aria-controls="list-profile">Your Listings</a>:null}
      <a class="list-group-item list-group-item-action active" id="list-messages-list" data-bs-toggle="list" href="./transactions" role="tab" aria-controls="list-messages">Transactions</a>
      
    </div>
  </div>
  <div class="col-9" style={{paddingRight: "150px"}}>
    <div class="tab-content" id="nav-tabContent">
      
      <div class="tab-pane fade show active" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">

        
      <ol class="list-group">
        <li class="list-group-item">
          <div class="row" style={{paddingBottom: "45px"}}>
            <div class="col col-bg-2"><h5>Item Image</h5></div>
            <div class="col col-bg-8"><h5>Item Name</h5></div>
            <div class="col col-bg-1"><h5>Item Price</h5></div>
            <div class="col col-bg-1"><h5>Transaction Date</h5></div>
          </div>

          {empty? <p class="justify-content-center" style={{marginLeft: '33%'}}>You Haven't Made Any Transactions!</p>:data.map((dataItem,index)=>{
                        return(
                            <TransactionCard name = {dataItem.Product_Name}
                            price = {dataItem.Product_Price}
                            date = {dataItem.Transaction_Date}
                            image = {dataItem.Product_Picture}
                            />
                        );

                    })}

        </li>
      </ol>


      </div>
      
    </div>
  </div>
</div>

);
}