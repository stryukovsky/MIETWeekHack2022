import React from "react";
import {Outlet} from 'react-router'
import ResponsiveAppBar from "../ResponsiveAppBar/ResponsiveAppBar";
import Container from "@mui/material/Container";



const Layout = () => {
    return(
        <div className="layout">
            <ResponsiveAppBar/>
            <Container maxWidth="xl">
                <Outlet/>
            </Container>
        </div>
    )
}

export default Layout;