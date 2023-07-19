import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Collapse, IconButton } from '@mui/material';
import { IReport } from '@/models';
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

const expandedRowStyle = {
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
    paddingBottom: '10px',
};

type TableProps = {
    rows: IReport[];
};

export default function Table({ rows }: TableProps) {
    const [clickedIndex, setClickedIndex] = useState(-1);

    const columns: GridColDef[] = [
        {
            field: 'reportId',
            headerName: '',
            width: 80,
            renderCell: (cellValues: GridRenderCellParams<any>) => {
                return (
                    <IconButton
                        aria-label={
                            cellValues.value === clickedIndex ? 'Collapse row' : 'Expand row'
                        }
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
            field: 'name',
            headerName: 'Name',
            width: 237,
            renderCell: (cellValues: GridRenderCellParams<any>) => {
                return (
                    <Box>
                        <div>
                            {/* First row item */}
                            {cellValues.value}
                            <Collapse
                                in={cellValues.id === clickedIndex}
                                aria-expanded={cellValues.value === clickedIndex}
                            >
                                <Box sx={expandedRowStyle}>
                                    {/* Expanded row item */}
                                    {cellValues.row.phoneNumber}
                                    <br />
                                    {cellValues.row.emailAddress}
                                </Box>
                            </Collapse>
                        </div>
                    </Box>
                );
            },
        },
        {
            field: 'reportCategory',
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
                            <Collapse
                                in={cellValues.id === clickedIndex}
                                aria-expanded={cellValues.value === clickedIndex}
                            >
                                <Box sx={expandedRowStyle}>
                                    {/* Expanded row item */}
                                    {cellValues.row.issueDescription}
                                </Box>
                            </Collapse>
                        </div>
                    </Box>
                );
            },
        },
        {
            field: 'address',
            headerName: 'Location',
            width: 180,
        },
        {
            field: 'dateTimeOfSubmission',
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
            field: 'statusOfReport',
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
            <DataGrid
                rowHeight={90}
                rows={rows}
                getRowId={(row) => row.reportId}
                columns={columns}
            />
        </div>
    );
}
