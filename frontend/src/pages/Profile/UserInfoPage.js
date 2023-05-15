import "./styles.css"
import 'bootstrap/dist/css/bootstrap.css';
import UserInfo from "./Components/UserInfo"
import React, { useEffect, useState } from "react";
import axios from 'axios';

export default function UserInfoPage(){
   
    return(  
        <div className="ProfileContainer">
        <UserInfo/>
        </div>
    );
}