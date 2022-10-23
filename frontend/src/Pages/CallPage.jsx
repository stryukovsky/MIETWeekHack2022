import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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
    // const [trigger, setTrigger] = React.useState('');

    const [formInput, setFormInput] = React.useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            trigger: "",
            to: ""
        }
    );

    // const handleChange = (event) => {
    //     setTrigger(event.target.value);
    // };

    const handleSubmit = evt => {
        evt.preventDefault();

        let data = { formInput };
        axios.get(`https://dec9-91-103-248-36.ngrok.io/api/performCall?to=${formInput.to}&trigger=${formInput.trigger}`).then(response => alert(response.data.message));

        // fetch(`http://5497-91-103-248-36.ngrok.io/api/performCall?to=${data.to}&trigger=${data.trigger}`, {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // })
        //     .then(response => response.json())
        //     .then(response => console.log("Success:", JSON.stringify(response)))
        //     .catch(error => console.error("Error:", error));
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
                            {/*<FormControl fullWidth>*/}
                            {/*    <InputLabel color="primary" id="demo-simple-select-label">Триггер</InputLabel>*/}
                            {/*    <Select*/}

                            {/*        labelId="demo-simple-select-label"*/}
                            {/*        id="demo-simple-select"*/}
                            {/*        value={trigger}*/}
                            {/*        label="Триггер"*/}
                            {/*        onChange={handleChange}*/}
                            {/*    >*/}
                            {/*        <MenuItem value={0}>Trigger 1</MenuItem>*/}
                            {/*        <MenuItem value={2}>Trigger 2</MenuItem>*/}
                            {/*        <MenuItem value={3}>Trigger 3</MenuItem>*/}
                            {/*    </Select>*/}
                            {/*</FormControl>*/}
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