import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {lightGreen} from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import {BACKEND_SERVER} from "../assets/constants/constants";


const innerTheme = createTheme({
    palette: {
        primary: {
            main: lightGreen[500],
        },
    },
});

function CallPage() {
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(true);

    const [formInput, setFormInput] = React.useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            trigger: "",
            to: ""
        }
    );

    const handleSubmit = evt => {
        evt.preventDefault();
        setLoading(true);

        axios.get(`${BACKEND_SERVER}/api/performCall?to=${formInput.to}&trigger=${formInput.trigger}`)
            .then(
                response => {
                    setLoading(false);
                    if(response.data.status === 'success'){
                        setSuccess(true);
                        evt.target.reset();
                    }
                    else{
                        setSuccess(false);
                    }
                });
    };

    const handleInput = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setFormInput({ [name]: newValue });
    };

    const buttonSx = {
        mt:2,
        width:520,
        color:'#fff',
        ...(success && {
            bgcolor: lightGreen[500],
            '&:hover': {
                bgcolor: lightGreen[600],
            },
        }) || {
            bgcolor: '#e53935',
            '&:hover': {
                bgcolor: '#a02725',
            },
        },
    };


    return (
            <div className="call">
                <ThemeProvider theme={innerTheme}>
                    <form onSubmit={handleSubmit}>
                        <Box
                            sx={{ maxWidth: 520 }}
                            noValidate
                            autoComplete="off"
                        >
                            <Typography textAlign="center" sx={{fontSize:22, mb: 2}}>Сделать звонок</Typography>
                            <TextField
                                color="primary"
                                fullWidth
                                sx={{mt:2}}
                                required
                                id="outlined-required"
                                name="trigger"
                                label="Триггер"
                                onChange={handleInput}
                            />
                            <TextField
                                color="primary"
                                fullWidth
                                sx={{mt:2}}
                                required
                                id="outlined-required"
                                name="to"
                                label="Телефон"
                                onChange={handleInput}
                            />

                            <Box
                                sx={{
                                    position: 'relative'
                                }}
                            >
                                <Button
                                    variant="contained"
                                    type="submit"
                                    sx={buttonSx}
                                    disabled={loading}
                                >
                                    {
                                        success
                                            ? 'Позвонить'
                                            : 'Ошибка. Позвонить снова'
                                    }
                                </Button>
                                {loading && (
                                    <CircularProgress
                                        size={30}
                                        sx={{
                                            color: lightGreen,
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            marginLeft: '-10px',
                                            marginTop: '-7px'
                                        }}
                                    />
                                )}
                            </Box>



                        </Box>
                    </form>
                </ThemeProvider>
            </div>
    );
}

export default CallPage;