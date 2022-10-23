import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import logo from '../../assets/img/logo.svg'
import {NavLink} from "react-router-dom";
import {deepPurple, lightGreen} from "@mui/material/colors";
import {createTheme, ThemeProvider} from "@mui/material/styles";


const pages = ['Статистика', 'Логи'];
const settings = ['Profile', 'Logout'];

const innerTheme = createTheme({
    palette: {
        primary: {
            main: lightGreen[500],
        },

    },
});

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <ThemeProvider theme={innerTheme}>
        <AppBar position="static" sx={{bgcolor: 'transparent'}}>
            <Container maxWidth="xl">
                <Toolbar color="primary" disableGutters sx={{
                    p: 1
                }}>
                    {/*<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />*/}
                    <Typography
                        color="primary"
                        variant="h6"
                        noWrap
                        component="p"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <img src={logo} alt={"logo-img"}/>
                    </Typography>

                    <Box color="primary" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            color="primary"
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}

                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            color="primary"
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <NavLink to="app/stats" className="navLink">
                                <Button
                                    color="primary"
                                    key={pages[0]}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my:2, color: 'black', display: 'block', fontSize:'15px'}}
                                >
                                    {pages[0]}
                                </Button>
                            </NavLink>
                            <NavLink to="app/logs" className="navLink">
                                <Button
                                    color="primary"
                                    key={pages[1]}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'black', display: 'block', fontSize:'15px'}}
                                >
                                    {pages[1]}
                                </Button>
                            </NavLink>
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >

                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <NavLink to="app/stats" className="navLink">
                            <Button
                                color="primary"
                                key={pages[0]}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'black', display: 'block', fontSize:'17px'}}
                            >
                                {pages[0]}
                            </Button>
                        </NavLink>
                        <NavLink to="app/logs" className="navLink">
                            <Button
                                color="primary"
                                key={pages[1]}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'black', display: 'block', fontSize:'17px'}}
                            >
                                {pages[1]}
                            </Button>
                        </NavLink>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip color="primary" title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="C" sx={{ bgcolor: lightGreen[400] }} src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            color="primary"
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {<NavLink to="/" className="navLink">
                                <MenuItem color="primary" key={settings[1]} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{settings[1]}</Typography>
                                </MenuItem>
                            </NavLink>
                            }
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        </ThemeProvider>
    );
}
export default ResponsiveAppBar;
