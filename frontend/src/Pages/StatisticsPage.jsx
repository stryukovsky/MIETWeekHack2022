import React, {useState} from 'react'
import CallChart from "../Components/CallChart/CallChart";
import Button from "@mui/material/Button";
import ButtonGroup from '@mui/material/ButtonGroup';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {lightGreen} from "@mui/material/colors";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {BACKEND_SERVER} from "../assets/constants/constants";

const innerTheme = createTheme({
    palette: {
        primary: {
            main: lightGreen[500],
        },

    },
});

function StatisticsPage() {
    const [period, setPeriod] = useState('year');
    const [title, setTitle] = useState('за 2022 год');

    return (
        <>
            <ThemeProvider theme={innerTheme}>
                <div className="call-chart">
                    <CallChart period={period} title={title}/>
                </div>
                <div className="button-group">
                    <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                        <Button onClick={() => {setPeriod('year'); setTitle('за 2022 год')}}
                                sx={{ px: 17, fontWeight: 'bold', borderRadius: 3, border: 2}} size="large" >За год</Button>
                        <Button onClick={() => {setPeriod('quarter'); setTitle('за квартал')}} sx={{ px: 17, fontWeight: 'bold', border: 2}} size="large">За квартал</Button>
                        <Button onClick={() => {setPeriod('month');setTitle('за месяц')}} sx={{ px: 17, fontWeight: 'bold', border: 2 }} size="large">За месяц</Button>
                        <Button onClick={() => {setPeriod('week');setTitle('за неделю')}} sx={{ px: 17, fontWeight: 'bold', borderRadius: 3, border: 2 }} size="large">За неделю</Button>
                    </ButtonGroup>
                </div>
                <Fab color="primary" size='large' aria-label="add" href={`${BACKEND_SERVER}/admin`} sx={{color: "#f5f5f5", zIndex: 'tooltip', bottom:70, left:1575}}>
                    <AddIcon />
                </Fab>
            </ThemeProvider>
        </>
    );
}

export default StatisticsPage;