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

<div>


  <main class="d-flex flex-nowrap">
    <div class="d-flex flex-column flex-shrink-0 p-3 text-bg-tertiary" style={{width: "280px", height: "610px"}}>
      <hr/>
      <ul class="nav nav-pills flex-column mb-auto">
        <li>
          <a href="./userInfo" class="nav-link text-white">
            <svg class="bi pe-none me-2" width="16" height="16">
              <use href="#home"></use>
            </svg>
            User Info
          </a>
        </li>
        {showYourListings ? <li>
          <a href="./orders" class="nav-link text-white">
            <svg class="bi pe-none me-2" width="16" height="16">
              <use href="#speedometer2"></use>
            </svg>
            Your Listings
          </a>
        </li>:null}
        <li class="nav-item">
          <a href="./transactions" class="nav-link active" aria-current="page">
            <svg class="bi pe-none me-2" width="16" height="16">
              <use href="#table"></use>
            </svg>
            Transactions
          </a>
        </li>
      </ul>
    </div>

    <div class="b-example-divider b-example-vr"></div>

    <div class="d-flex flex-column flex-shrink-0 p-3 text-bg-tertiary" style={{margin:"0 auto",width: "800px"}}>
      <hr/>
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
  </main>

</div>
);
}