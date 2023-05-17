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
      
      
      <div className="d-flex flex-nowrapp">
        <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-tertiary" style={{ width: "280px", height: "610px" }}>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <a href="./userInfo" className="nav-link active" aria-current="page">
                <svg className="bi pe-none me-2" width="16" height="16">
                  <use href="#home"></use>
                </svg>
                User Info
              </a>
            </li>
            {showYourListings ? <li>
              <a href="./orders" className="nav-link text-black">
                <svg className="bi pe-none me-2" width="16" height="16">
                  <use href="#speedometer2"></use>
                </svg>
                Your Listings
              </a>
            </li>:null }
            <li>
              <a href="./transactions" className="nav-link text-black">
                <svg className="bi pe-none me-2" width="16" height="16">
                  <use href="#table"></use>
                </svg>
                Transactions
              </a>
            </li>
          </ul>


        </div>

        <div className="b-example-divider b-example-vr"></div>

        <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-tertiary" style={{ margin: "0 auto", width: "800px" }}>
          <hr />
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
                      <th className="table-item" scope="row tbl-row" style={{ width: "350px" }}>Cash Balance</th>
                      <td className="table-item">{props.cash} L.E.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>


    );
}