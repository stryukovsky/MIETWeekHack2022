import React from 'react'
import Container from "@mui/material/Container";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import './AuthPage.css'
import logo from "../assets/img/logo.svg";
import Typography from "@mui/material/Typography";
import {deepOrange} from "@mui/material/colors";
import {NavLink} from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {responsiveFontSizes} from "@mui/material";
import logoAuth from '../assets/img/app_image_transparent.png';
import logoAuthShadow from '../assets/img/phone-shadow.png'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lightGreen  } from '@mui/material/colors';

// const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const innerTheme = createTheme({
    palette: {
        primary: {
            main: lightGreen[500],
        },

    },
});

function AuthPage() {
    return (
        <div className="auth-page">
            <Container maxWidth="xl" sx={{ maxHeight: '100vh' }}>
                <div className="auth">
                    <div className="login-form">
                        <Avatar sx={{ bgcolor: lightGreen[500] }} className="avatar" src="/broken-image.jpg"/>
                        <div className="login-title">
                            Sign in
                        </div>
                        <ThemeProvider theme={innerTheme}>
                            <TextField
                                color="primary"
                                id="outlined"
                                type="text"
                                label="Username"
                            />
                            <TextField
                                color="primary"
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                            />
                        </ThemeProvider>

                        <FormControlLabel control={<Checkbox theme={innerTheme} defaultChecked />} label="Remember me"/>
                        <Button theme={innerTheme} variant="contained" href='app/app/stats'>
                            <NavLink to="app/app/stats" className="navLink-auth">
                            Sign in
                            </NavLink>
                        </Button>
                        <div className="forgot-pass">
                            <a href="#">Forgot password?</a>
                            <a href="#">Don't have an account? Sign Up</a>

                        </div>


                    </div>
                    <div className="login-gif">
                        <img src={logoAuth} className="login-gif__img" alt="logo auth img"/>
                        <img src={logoAuthShadow} className="login-gif__img-shadow" alt="logo shadow img"/>
                    </div>
                </div>

            </Container>
        </div>
    );
}

export default AuthPage;