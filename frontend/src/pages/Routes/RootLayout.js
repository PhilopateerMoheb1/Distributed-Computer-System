import React from 'react';
import {NavLink,Outlet} from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

export default function RootLayout(){
    return(
        <main>
        <Header/>
        <Outlet/>
        <Footer/>
        </main>
    )
}