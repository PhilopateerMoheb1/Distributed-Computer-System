import Orders from "./Components/Orders"
import "./styles.css"
import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from "react";
import axios from 'axios';

export default function UserInfoPage(){
    
    return(  
        <div className="ProfileContainer">
        <Orders/>
        </div>
    );
}