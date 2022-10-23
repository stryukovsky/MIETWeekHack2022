import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

import { red, yellow } from '@mui/material/colors';

const columns = [
    {
        field: 'date',
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
        field: 'type',
        headerName: 'Уровень',
        width: 250
    }
];

const rows = [
    { id: 0, date: new Date(), message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", type: "error" },
    { id: 1, date: new Date(), message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", type: "information" },
    { id: 2, date: new Date(), message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", type: "warning" },
    { id: 3, date: new Date(), message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", type: "debug"},
];


export default function DataTable() {
    return (
        <div style={{ height: 780, width: '100%' }}>
            <Box
                sx={{
                    height: 780,
                    width: '100%',
                    '& .super-app-theme--warning': {
                        color: '#ffa000'
                    },
                    '& .super-app-theme--error': {
                        color: '#b71c1c'
                    },
                }}
            >
            <DataGrid
                getRowClassName={(params) => `super-app-theme--${params.row.type}`}
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
            </Box>
        </div>
    );
}
