import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {lightGreen} from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import axios from "axios";

const innerTheme = createTheme({
    palette: {
        primary: {
            main: lightGreen[500],
        },

    },
});

function CallPage() {
    const [formInput, setFormInput] = React.useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            trigger: "",
            to: ""
        }
    );

    const handleSubmit = evt => {
        evt.preventDefault();
        axios.get(`https://fa65-176-59-54-115.eu.ngrok.io /api/performCall?to=${formInput.to}&trigger=${formInput.trigger}`).then(response => alert(response.data.message));
    };

    const handleInput = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setFormInput({ [name]: newValue });
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
                            <Button sx={{color:'#fff', mt:2, width:520}} theme={innerTheme} variant="contained" type="submit">
                                Позвонить
                            </Button>
                        </Box>
                    </form>
                </ThemeProvider>
            </div>
    );
}

export default CallPage;