import React from 'react';
import {NavLink,Outlet} from "react-router-dom";
import Header from "../../Components/Header/Header";

export default function RootLayout(){
    return(
        <main>
        <Header/>
        <Outlet/>
        </main>
    )
}