import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import {NavLink} from "react-router-dom";
import Button from "@mui/material/Button";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {lightGreen} from "@mui/material/colors";
import Typography from "@mui/material/Typography";

const innerTheme = createTheme({
    palette: {
        primary: {
            main: lightGreen[500],
        },

    },
});

function CallPage() {
    const [trigger, setTrigger] = React.useState('');

    const handleChange = (event) => {
        setTrigger(event.target.value);
    };
    return (
            <div className="call">
                <ThemeProvider theme={innerTheme}>
                    <for>
                        <Box
                            component="form"
                            sx={{ maxWidth: 520 }}
                            noValidate
                            autoComplete="off"
                        >
                            <Typography textAlign="center" sx={{fontSize:22, mb: 2}}>Сделать звонок</Typography>
                            <FormControl fullWidth>
                                <InputLabel color="primary" id="demo-simple-select-label">Триггер</InputLabel>
                                <Select

                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={trigger}
                                    label="Триггер"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={0}>Trigger 1</MenuItem>
                                    <MenuItem value={2}>Trigger 2</MenuItem>
                                    <MenuItem value={3}>Trigger 3</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                color="primary"
                                fullWidth
                                sx={{mt:2}}
                                required
                                id="outlined-required"
                                label="Телефон"
                            />
                            <Button sx={{color:'#fff', mt:2, width:520}} theme={innerTheme} variant="contained" type="submit">
                                Позвонить
                            </Button>
                        </Box>
                    </for>
                </ThemeProvider>
            </div>
    );
}

export default CallPage;