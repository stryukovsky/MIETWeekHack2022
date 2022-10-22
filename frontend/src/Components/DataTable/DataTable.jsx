import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

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
        width: 1236
    }
];

const rows = [
    { id: 0, date: new Date(), message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { id: 1, date: new Date(), message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { id: 2, date: new Date(), message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { id: 3, date: new Date(), message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
];

export default function DataTable() {
    return (
        <div style={{ height: 780, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
        </div>
    );
}
