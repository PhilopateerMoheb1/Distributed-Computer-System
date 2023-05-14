import Orders from "./Components/Orders"
import "./styles.css"
import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from "react";
import axios from 'axios';

export default function UserInfoPage(){
    const [UserData,setData] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:80/users')
        .then(function (response) {
            setData(response.data[0])
        })
    },[]);
    return(  
        <div className="ProfileContainer">
        <Orders
        name = {UserData.Name}
        date = {UserData.DOB}
        gender = {UserData.Gender}
        email = {UserData.Email}
        phone = {UserData.Phone_Number}
        address = {UserData.Address}
        cash = {UserData.Cash_Balance}

        />
        
        </div>
    );
}