import React from 'react'
import Container from "@mui/material/Container";
// import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import './AuthPage.css'
import logo from "../assets/img/logo.svg";
import Typography from "@mui/material/Typography";


function AuthPage() {
    return (
        <>
            <Container maxWidth="xl">
                <div className="auth">
                    <div className="login-form">
                        <Avatar className="avatar" src="/broken-image.jpg"/>
                        <div className="login-title">
                            <Typography
                                variant="h6"
                                noWrap
                                component="p"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 400,
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                Sign in
                            </Typography>
                        </div>
                        <TextField
                            id="outlined"
                            type="text"
                            label="Username"
                        />
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                        />

                    </div>
                    <div className="login-gif">

                        gsgsgs
                    </div>
                </div>

            </Container>
        </>
    );
}

export default AuthPage;