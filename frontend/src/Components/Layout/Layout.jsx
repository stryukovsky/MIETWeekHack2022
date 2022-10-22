import React from "react";
import {Outlet} from 'react-router'
import ResponsiveAppBar from "../ResponsiveAppBar/ResponsiveAppBar";


const Layout = () => {
    return(
        <div className="layout">
            <ResponsiveAppBar/>
            <div className="outlet-container">
                <Outlet/>
            </div>
        </div>
    )
}

export default Layout;