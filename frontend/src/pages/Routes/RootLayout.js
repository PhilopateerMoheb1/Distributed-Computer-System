import React from 'react';
import {NavLink,Outlet} from "react-router-dom";

export default function RootLayout(){
    return(
        <main>
        <Outlet/>
        </main>
    )
}