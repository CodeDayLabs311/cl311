import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import CheckIcon from '@mui/icons-material/Check';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Collapse, IconButton, Chip, ChipProps } from '@mui/material';
import { IReport } from '@/models';
import ButtonLink from '../ButtonLink';
import Box from '@mui/material/Box';
import { StatusOfReport, ReportCategories, IReportFields } from '@/models';
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

const columnWidth = {
    reportId: 63,
    name: 230,
    reportCategory: 379,
    address: 200,
    dateTimeOfSubmission: 126,
    statusOfReport: 126,
    actions: 170,
};

function getChipProps(params: GridRenderCellParams): ChipProps {
    const status = params.value;
    switch (status) {
        case StatusOfReport.Submitted:
            return {
                icon: <InfoIcon color="primary" />,
                label: status,
                color: 'primary',
            };
        case StatusOfReport.In_Progress:
            return {
                icon: <AutorenewIcon color="warning" />,
                label: status,
                color: 'warning',
            };
        case StatusOfReport.Completed:
            return {
                icon: <CheckIcon color="success" />,
                label: status,
                color: 'success',
            };
        case StatusOfReport.On_Hold:
            return {
                icon: <PauseCircleIcon color="secondary" />,
                label: status,
                color: 'secondary',
            };
        case StatusOfReport.Rejected:
            return {
                icon: <WarningIcon color="error" />,
                label: status,
                color: 'error',
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

export default function Table({ rows }: TableProps) {
    const [clickedIndex, setClickedIndex] = useState(-1);

    const columns: GridColDef[] = [
        {
            field: IReportFields.Report_Id,
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
            field: IReportFields.Name,
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
            field: IReportFields.Report_Category,
            headerName: 'Issues',
            type: 'singleSelect',
            //TODO: update the valueOptions to match the options in creationPage
            valueOptions: Object.values(ReportCategories),
            width: columnWidth.reportCategory,
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
                                    {cellValues.row.issueDescription.length > 50
                                        ? cellValues.row.issueDescription.substring(0, 50)
                                        : cellValues.row.issueDescription}
                                </Box>
                            </Collapse>
                        </div>
                    </Box>
                );
            },
        },
        {
            field: IReportFields.Address,
            headerName: 'Location',
            width: columnWidth.address,
        },
        {
            field: IReportFields.Date_Time_Of_Submission,
            headerName: 'Date Reported',
            type: 'date',
            valueGetter: ({ value }) => value && new Date(value),
            width: columnWidth.dateTimeOfSubmission,
        },
        {
            field: IReportFields.Status_Of_Report,
            headerName: 'Status',
            //this type is for filtering and editing
            type: 'singleSelect',
            valueOptions: Object.values(StatusOfReport),
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
        <div style={{ height: '100%', width: '100%', minWidth: '800px' }}>
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
