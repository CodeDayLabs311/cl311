import { Box, Typography, CircularProgress, Grid } from '@mui/material';
import { DARK_PRIMARY, MEDIUM_PRIMARY } from '@/styles/ColorScheme';
import {
    PieChart,
    Pie,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';
import { SmallBox, ChartBox, TagHead, TagText } from '@/styles/StyleDashboard';

export default function DataAnalytics() {
    const totalIssues = 1250;
    const dataIssueType = [
        { name: 'Clogged Storm Drain', value: 100 },
        { name: 'Potholes', value: 50 },
        { name: 'Graffiti', value: 150 },
        { name: 'Street Light Outage', value: 70 },
        { name: 'Sidewalk Damage', value: 50 },
        { name: 'Traffic Signal Malfunction', value: 100 },
        { name: 'Abandoned Vehicles', value: 120 },
        { name: 'Noise Complaint', value: 20 },
        { name: 'Other', value: 70 },
    ];
    const dataLocation = [
        {
            name: 'Location A',
            reports: 4000,
        },
        {
            name: 'Location B',
            reports: 3500,
        },
        {
            name: 'Location C',
            reports: 3000,
        },
        {
            name: 'Location D',
            reports: 2500,
        },
        {
            name: 'Location E',
            reports: 2000,
        },
        {
            name: 'Location F',
            reports: 1500,
        },
        {
            name: 'Location G',
            reports: 1000,
        },
    ];

    const resolvedPercentage = 85;
    return (
        <Box pt={2} px={2}>
            <Box textAlign="center" mb={4}>
                <Typography
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        color: DARK_PRIMARY,
                        fontSize: '1.5rem',
                        margin: '0 auto',
                        maxWidth: '600px',
                    }}
                >
                    Data Analytics
                </Typography>
            </Box>
            <Box marginBottom={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4} marginTop={4}>
                        <SmallBox>
                            <div>
                                <TagHead>Number of Issues Reported</TagHead>
                            </div>
                            <div>
                                <TagText>{totalIssues}</TagText>
                            </div>
                        </SmallBox>

                        <SmallBox>
                            <div>
                                <TagHead>Resolved Issues Percentage</TagHead>
                            </div>
                            <div>
                                <Box position="relative" display="inline-flex">
                                    <CircularProgress
                                        variant="determinate"
                                        value={resolvedPercentage}
                                    />
                                    <Box
                                        top={0}
                                        left={0}
                                        bottom={0}
                                        right={0}
                                        position="absolute"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Typography
                                            variant="caption"
                                            component="div"
                                            color="textSecondary"
                                        >{`${Math.round(resolvedPercentage)}%`}</Typography>
                                    </Box>
                                </Box>
                            </div>
                        </SmallBox>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <ChartBox>
                            <div>
                                <TagHead>Issue Types Distribution</TagHead>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <PieChart width={400} height={300}>
                                    <Pie
                                        data={dataIssueType}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        fill={MEDIUM_PRIMARY}
                                    />
                                    <Tooltip />
                                </PieChart>
                            </div>
                        </ChartBox>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <ChartBox>
                            <div>
                                <TagHead>Issue Locations Distribution</TagHead>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <LineChart
                                    width={400}
                                    height={300}
                                    data={dataLocation}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="reports"
                                        stroke="#8884d8"
                                        activeDot={{ r: 8 }}
                                    />
                                </LineChart>
                            </div>
                        </ChartBox>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
