import React from 'react'
import CallChart from "../Components/CallChart/CallChart";
import Button from "@mui/material/Button";
import ButtonGroup from '@mui/material/ButtonGroup';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {lightGreen} from "@mui/material/colors";

const innerTheme = createTheme({
    palette: {
        primary: {
            main: lightGreen[500],
        },

    },
});

function StatisticsPage() {
    return (
        <>
            <ThemeProvider theme={innerTheme}>
                <div className="call-chart">
                    <CallChart/>
                </div>
                <div className="button-group">
                    <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                        <Button sx={{ px: 17, fontWeight: 'bold', borderRadius: 3, border: 2}} size="large" >За год</Button>
                        <Button sx={{ px: 17, fontWeight: 'bold', border: 2}} size="large">За квартал</Button>
                        <Button sx={{ px: 17, fontWeight: 'bold', border: 2 }} size="large">За месяц</Button>
                        <Button sx={{ px: 17, fontWeight: 'bold', borderRadius: 3, border: 2 }} size="large">За неделю</Button>
                    </ButtonGroup>
                </div>
            </ThemeProvider>
        </>
    );
}

export default StatisticsPage;