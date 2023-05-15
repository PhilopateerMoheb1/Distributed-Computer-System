import "./styles.css"
import 'bootstrap/dist/css/bootstrap.css';
import UserInfo from "./Components/UserInfo"
import React, { useEffect, useState } from "react";
import axios from 'axios';

export default function UserInfoPage(){
    const [UserData,setUserData] = useState([]);
    axios.defaults.withCredentials = true;
    useEffect(()=>{
        axios.get('http://localhost:80/session').then(
            (response) => {
                console.log(response)
                if("ID" in response.data){
                  setUserData(response.data)
                }
                else{
                    window.location = "/login";
                }
            }
        );
    },[]);
    return(  
        <div className="ProfileContainer">
        <UserInfo
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