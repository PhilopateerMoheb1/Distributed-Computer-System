import React, { useEffect, useState } from "react";
import "../styles.css"
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
export default function UserInfo(props){

  const [showYourListings,setShowYourListings] = useState(false);

  useEffect(()=>{
    axios.get('http://localhost:80/session').then(
        (response) => {
            var objectConstructor = ({}).constructor;
            if(response.data.constructor === objectConstructor){
                if("ID" in response.data && response.data.Role === "Seller"){
                    setShowYourListings(true);
                }
            }
        }
    );
  },[]);

    return(
      
      
      <div class="row" style={{paddingTop: "50px", paddingBottom: "50px"}}>
        <div class="col-3" style={{paddingLeft: "50px"}}>
          <div class="list-group" id="list-tab" role="tablist">
            <a class="list-group-item list-group-item-action active" id="list-home-list" data-bs-toggle="list" href="./userInfo" role="tab" aria-controls="list-home">User Info</a>
            <a class="list-group-item list-group-item-action" id="list-profile-list" data-bs-toggle="list" href="./orders" role="tab" aria-controls="list-profile">Your Listings</a>
            <a class="list-group-item list-group-item-action" id="list-messages-list" data-bs-toggle="list" href="./transactions" role="tab" aria-controls="list-messages">Transactions</a>
            
          </div>
        </div>
        <div class="col-9" style={{paddingRight: "150px"}}>
          <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
              

            <div className="basic-info-block">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Basic Info</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">The basic personal information of the user.</h6>
                <table className="table">
                  <tbody>
                    <tr>
                      <th className="table-item" scope="row tbl-row">User Name</th>
                      <td className="table-item">{props.name}</td>
                    </tr>
                    <tr>
                      <th className="table-item" scope="row tbl-row">Birthday</th>
                      <td className="table-item">{props.date}</td>
                    </tr>
                    <tr>
                      <th className="table-item" scope="row tbl-row">Gender</th>
                      <td className="table-item">{props.gender}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <hr />
          <div className="contact-info-block">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Contact Info</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">The contact information of the user.</h6>
                <table className="table">
                  <tbody>
                    <tr>
                      <th className="table-item" scope="row tbl-row">Email</th>
                      <td className="table-item">{props.email}</td>
                    </tr>
                    <tr>
                      <th className="table-item" scope="row tbl-row">Phone Number</th>
                      <td className="table-item">{props.phone}</td>
                    </tr>
                    <tr>
                      <th className="table-item" scope="row tbl-row">Address</th>
                      <td className="table-item">{props.address}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <hr />
          <div className="credit-info-block">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Credit Card Info</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">The credit card information of the user.</h6>
                <table className="table">
                  <tbody>
                    <tr>
                      <th className="table-item" scope="row tbl-row">Cash Balance</th>
                      <td className="table-item">{props.cash} L.E.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>



            </div>
            <div class="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">...</div>
            <div class="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">...</div>
            <div class="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">...</div>
          </div>
        </div>
    </div>


    );
}