import React, { useState } from 'react';
import Head from 'next/head';
import PageHeader from '@/components/PageHeader';
import Container from 'react-bootstrap/Container';
import EditIcon from '@mui/icons-material/Edit';
import { Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Box from '@mui/material/Box';
import {
    DataGrid,
    GridRowsProp,
    GridColDef,
    GridActionsCellItem,
    GridRowParams,
    GridRenderCellParams,
} from '@mui/x-data-grid';
import Edit from '@mui/icons-material/Edit';

const expandedRowStyle = {
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
    paddingBottom: '10px',
};
const rows: GridRowsProp = [
    {
        id: 1,
        reporter: 'Min',
        type: 'Illegal dump',
        location: 'Seattle',
        dateReported: '07/01/2023',
        lastUpdated: '07/01/2023',
        status: 'Reported',
    },
    {
        id: 2,
        reporter: 'Andrey',
        email: 'andrey@gmail.com',
        phone: '206-XXX-XXXX',
        description: 'Pls send help...the streets are flooded',
        type: 'Clogged drain',
        location: 'Seattle',
        dateReported: '06/29/2023',
        lastUpdated: '07/30/2023',
        status: 'Pending',
    },
];

export default function Table() {
    const [clickedIndex, setClickedIndex] = useState(-1);

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: '',
            width: 80,
            renderCell: (cellValues: GridRenderCellParams<any>) => {
                return (
                    <IconButton
                        onClick={() => {
                            clickedIndex === cellValues.value
                                ? setClickedIndex(-1)
                                : setClickedIndex(cellValues.value);
                        }}
                    >
                        {cellValues.value === clickedIndex ? (
                            <ExpandLessIcon />
                        ) : (
                            <ExpandMoreIcon />
                        )}
                    </IconButton>
                );
            },
        },
        {
            field: 'reporter',
            headerName: 'Reporter',
            width: 237,
            renderCell: (cellValues: GridRenderCellParams<any>) => {
                return (
                    <Box>
                        <div>
                            {/* First row item */}
                            {cellValues.value}
                            <Collapse in={cellValues.id === clickedIndex}>
                                <Box sx={expandedRowStyle}>
                                    {/* Expanded row item */}
                                    {cellValues.row.phone}
                                    <br />
                                    {cellValues.row.email}
                                </Box>
                            </Collapse>
                        </div>
                    </Box>
                );
            },
        },
        {
            field: 'type',
            headerName: 'Type',
            type: 'singleSelect',
            valueOptions: ['Illegal dump', 'Clogged drains', 'Other'],
            width: 237,
            renderCell: (cellValues: GridRenderCellParams<any>) => {
                return (
                    <Box>
                        <div>
                            {/* First row item */}
                            {cellValues.value}
                            <Collapse in={cellValues.id === clickedIndex}>
                                <Box sx={expandedRowStyle}>
                                    {/* Expanded row item */}
                                    {cellValues.row.description}
                                </Box>
                            </Collapse>
                        </div>
                    </Box>
                );
            },
        },
        {
            field: 'location',
            headerName: 'Location',
            width: 180,
        },
        {
            field: 'dateReported',
            headerName: 'Date Reported',
            type: 'date',
            valueGetter: ({ value }) => value && new Date(value),
            width: 180,
        },
        {
            field: 'lastUpdated',
            headerName: 'Last Updated',
            type: 'date',
            valueGetter: ({ value }) => value && new Date(value),
            width: 180,
        },
        {
            field: 'status',
            headerName: 'Status',
            //this type is for filtering and editing
            type: 'singleSelect',
            valueOptions: ['Reported', 'Pending', 'Dispatched', 'Resolved'],
            width: 120,
        },
        {
            field: 'actions',
            width: 80,
            //action matched with getActions
            type: 'actions',
            //'param' contains info about cell's context
            getActions: (params: GridRowParams) => [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Delete"
                    onClick={() => console.log(params.id)}
                />,
            ],
        },
    ];

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <DataGrid rowHeight={90} rows={rows} columns={columns} />
        </div>
    );
}
