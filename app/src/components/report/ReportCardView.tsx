import { IReport } from '@/models';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import { Typography, Grid } from '@mui/material';
import {
    StyledReportDetails,
    Box1,
    Heading,
    FooterDetails,
    IDText,
    Box2,
} from '@/styles/StyleCardView';

export type ReportCardProps = {
    report: IReport;
};

/** Report Card View */
export default function ReportCard({ report }: ReportCardProps) {
    return (
        <Card>
            <StyledReportDetails>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Box1>
                            <Heading variant="h6">Contact Information</Heading>
                            <Typography>
                                <strong>Name:</strong> {report.name}
                            </Typography>
                            <Typography>
                                <strong>Email Address:</strong> {report.emailAddress}
                            </Typography>
                            <Typography>
                                <strong>Phone Number:</strong> {report.phoneNumber}
                            </Typography>
                        </Box1>
                        <Box1>
                            <Typography>
                                <strong>Report Category:</strong> {report.reportCategory.join(', ')}
                            </Typography>
                        </Box1>
                        <Box1>
                            <Heading variant="h6">Issue Location</Heading>
                            <Typography>
                                <strong>Address:</strong> {report.address}
                            </Typography>
                            <Typography>
                                <strong>GPS Coordinates:</strong> {report.gpsCoordinates}
                            </Typography>
                        </Box1>
                        <Box1>
                            <Typography>
                                <strong>Issue Description:</strong> {report.issueDescription}
                            </Typography>
                        </Box1>
                        <Box1>
                            <Heading variant="h6">Status Updates</Heading>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography>
                                        <strong>Email:</strong> {report.email ? 'Yes' : 'No'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>
                                        <strong>SMS:</strong> {report.sms ? 'Yes' : 'No'}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box1>
                    </Grid>
                    <Grid item xs={6}>
                        <Box1>
                            <Typography>
                                <strong>Attachments:</strong>
                            </Typography>
                            <img
                                src="https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"
                                alt="Attachment image"
                                style={{
                                    height: '500px',
                                    width: '580px',
                                    overflow: 'hidden',
                                    objectFit: 'cover',
                                }}
                            />
                        </Box1>
                        <Box1>
                            <Typography>
                                <strong>Status of Report:</strong> {report.statusOfReport}
                            </Typography>
                            <Typography>
                                <strong>Date and Time of Submission:</strong>{' '}
                                {report.dateTimeOfSubmission}
                            </Typography>
                        </Box1>
                    </Grid>
                </Grid>
            </StyledReportDetails>
            <FooterDetails>
                <Box1>
                    <Stack direction="horizontal" gap={3}>
                        <p className="font-monospace me-auto my-auto">
                            <IDText>ID: </IDText> {report.reportId}
                        </p>
                        <div className="vr"></div>
                        <Box2 variant="secondary" href={`/report/${report.reportId}/edit`}>
                            Edit
                        </Box2>
                    </Stack>
                </Box1>
            </FooterDetails>
        </Card>
    );
}
