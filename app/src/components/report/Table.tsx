import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import WarningIcon from '@mui/icons-material/Warning';
import CheckIcon from '@mui/icons-material/Check';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { IReport } from '@/models';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Collapse, IconButton, Chip, ChipProps } from '@mui/material';
import { IReport } from '@/models';
import ButtonLink from '../ButtonLink';
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

const columnWidth = {
    reportId: 63,
    name: 230,
    reportCategory: 379,
    address: 200,
    dateTimeOfSubmission: 126,
    statusOfReport: 126,
    actions: 170,
};

const rows: GridRowsProp = [
    {
        reportId: 'report1',
        name: 'John Doe',
        emailAddress: 'john.doe@example.com',
        phoneNumber: '123-456-7890',
        reportCategory: ['Illegal Dumping'],
        address: '123 Main St',
        gpsCoordinates: '12.34,56.78',
        issueDescription: 'Pls send help, it stinks',
        attachments: 'link to attachments',
        email: true,
        sms: false,
        statusOfReport: 'Reported',
        dateTimeOfSubmission: '07/01/2023',
    },
    {
        reportId: 'report2',
        name: 'Jane Doe',
        emailAddress: 'jane.doe@example.com',
        phoneNumber: '206-xxx-xxx',
        reportCategory: ['Clogged Drain'],
        address: '456 Main St',
        gpsCoordinates: '21.34,56.60',
        issueDescription: 'Help pls, the street is flooded...',
        attachments: 'image',
        email: true,
        sms: false,
        statusOfReport: 'Done',
        dateTimeOfSubmission: '06/20/2023',
    },
    {
        reportId: 'report3',
        name: '',
        emailAddress: '',
        phoneNumber: '',
        reportCategory: ['Illegal Dumping', 'Clogged Drain', 'Arson', 'Auto Theft', 'Other'],
        address: '789 Main St',
        gpsCoordinates: '21.34,56.60',
        issueDescription: 'I trashed and flooded the street >:)',
        attachments: 'image',
        email: true,
        sms: false,
        statusOfReport: 'In Progress',
        dateTimeOfSubmission: '06/30/2023',
    },
];

function getChipProps(params: GridRenderCellParams): ChipProps {
    const status = params.value;
    switch (status) {
        case 'Reported':
            return {
                icon: <WarningIcon color="error" />,
                label: status,
                color: 'error',
            };
        case 'In Progress':
            return {
                icon: <AutorenewIcon color="warning" />,
                label: status,
                color: 'warning',
            };
        case 'Done':
            return {
                icon: <CheckIcon color="success" />,
                label: status,
                color: 'success',
            };
        default:
            return {
                icon: <QuestionMarkIcon style={{ fill: 'orange' }} />,
                label: 'Invalid',
                style: {
                    borderColor: 'orange',
                },
            };
    }
}

type TableProps = {
    rows: IReport[];
};

export default function Table({ rows }: TableProps) {
    const [clickedIndex, setClickedIndex] = useState(-1);

    const columns: GridColDef[] = [
        {
            field: 'reportId',
            headerName: '',
            filterable: false,
            sortable: false,
            width: columnWidth.reportId,
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
            width: columnWidth.name,
            renderCell: (cellValues: GridRenderCellParams<any>) => {
                return (
                    <Box>
                        <div>
                            {/* First row item, ex: the name will be displayed here */}
                            {cellValues.value ? cellValues.value : 'Anonymous'}
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
            headerName: 'Issues',
            //TODO: change this to something else, because this is an array of issues
            type: 'singleSelect',
            valueOptions: ['Illegal dump', 'Clogged drains', 'Other'],
            width: columnWidth.reportCategory,
            renderCell: (cellValues: GridRenderCellParams<any>) => {
                return (
                    <Box>
                        <div>
                            {/* First row item */}
                            {cellValues.value.map((issue: any) => (
                                <p style={{ margin: 0 }}>{issue}</p>
                            ))}
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
            width: columnWidth.address,
        },
        {
            field: 'dateTimeOfSubmission',
            headerName: 'Date Reported',
            type: 'date',
            valueGetter: ({ value }) => value && new Date(value),
            width: columnWidth.dateTimeOfSubmission,
        },
        {
            field: 'statusOfReport',
            headerName: 'Status',
            //this type is for filtering and editing
            type: 'singleSelect',
            valueOptions: ['Reported', 'In Progress', 'Done'],
            width: columnWidth.statusOfReport,
            renderCell: (params: GridRenderCellParams<any>) => {
                return <Chip variant="outlined" size="small" {...getChipProps(params)} />;
            },
        },
        {
            field: 'actions',
            headerName: '',
            filterable: false,
            sortable: false,
            align: 'center',
            width: columnWidth.actions,
            renderCell: (cellValues: GridRenderCellParams<any>) => (
                <>
                    <ButtonLink
                        style={{ marginRight: '10px' }}
                        size="sm"
                        variant="link"
                        href={`/report/${cellValues.row.reportId}/edit`}
                    >
                        <EditIcon />
                    </ButtonLink>
                    <ButtonLink
                        size="sm"
                        variant="link"
                        href={`/report/${cellValues.row.reportId}`}
                    >
                        <NavigateNextIcon />
                    </ButtonLink>
                </>
            ),
        },
    ];

    return (
        <div style={{ height: '100%', width: '100%', minWidth: '800px'}}>
            <DataGrid
                getRowHeight={() => 'auto'}
                rows={rows}
                showCellVerticalBorder={true}
                getRowId={(row) => row.reportId}
                columns={columns}
            />
        </div>
    );
}
