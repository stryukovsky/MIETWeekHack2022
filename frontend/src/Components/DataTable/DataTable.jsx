import  React, {useEffect, useMemo, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import axios from "axios";
import {BACKEND_SERVER} from "../../assets/constants/constants";

const columns = [
    {
        field: 'timestamp',
        headerName: 'Дата',
        type: 'dateTime',
        width: 250
    },
    {
        field: 'message',
        headerName: 'Информация',
        width: 986

    },
    {
        field: 'severity',
        headerName: 'Уровень',
        width: 250
    }
];


// const rows = [
//     { id: 0, date: new Date(), message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", type: "error" },
//     { id: 1, date: new Date(), message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", type: "information" },
//     { id: 2, date: new Date(), message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", type: "warning" },
//     { id: 3, date: new Date(), message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", type: "debug"},
// ];

export default function DataTable() {

    const [jsonRows, setJsonRows] = useState([]);

    const getLogs = () => {
        axios.get(`${BACKEND_SERVER}/api/logs/`)
            .then(response => setJsonRows(response.data));
    }

    useEffect(getLogs, []);

    const rows = useMemo(() => {
        return  jsonRows.map( item => {

            const timestamp = new Date(item.timestamp);
            const id = item.id;
            const severity = item.severity;
            const message = item.message;

            return {id, timestamp, message, severity};
        } );
    }, [jsonRows])

    return (
        <div style={{ height: 780, width: '100%' }}>
            <Box
                sx={{
                    height: 780,
                    width: '100%',
                    '& .super-app-theme--DANGER': {
                        color: '#ffa000'
                    },
                    '& .super-app-theme--FATAL': {
                        color: '#b71c1c'
                    },
                    '& .super-app-theme--ERROR': {
                        color: '#ffa000'
                    },
                    '& .super-app-theme--INFO': {
                        color: '#4caf50'
                    },
                }}
            >
            <DataGrid
                getRowClassName={(params) => `super-app-theme--${params.row.severity}`}
                rows={rows}
                columns={columns}
                pageSize={12}
                rowsPerPageOptions={[10]}
            />
            </Box>
        </div>
    );
}
