import Transactions from "./Components/Transactions"
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

        <Transactions/>
        
        </div>
    );
}