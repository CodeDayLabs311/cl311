import { IReport } from '@/models';
import { useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Stack from 'react-bootstrap/Stack';
import ButtonLink from '../ButtonLink';

export type ReportEditProps = {
    report: Omit<IReport, 'reportId'> | undefined;
    setReport: (newReport: IReport) => void;
    submitLabel: string;
    isSubmitLoading: boolean;
    onSubmit: () => void;
    cancelHref: string;
};

/** Report editor, used for create and edit flows */
export default function ReportEdit({
    report,
    setReport,
    submitLabel,
    isSubmitLoading,
    onSubmit,
    cancelHref,
}: ReportEditProps) {
    const updateReport = useCallback(
        (newValues: Partial<IReport>) => {
            setReport({
                ...(report as IReport),
                ...newValues,
            });
        },
        [report, setReport]
    );

    return (
        <Form>
            <Form.Label>Contact Information</Form.Label>

            <Form.Group className="mb-3" controlId="EditReport.Name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Please enter your name"
                    defaultValue={report?.name}
                    onChange={(event) => updateReport({ name: event.target.value })}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="EditReport.EmailAddress">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Please enter your email address"
                    defaultValue={report?.emailAddress}
                    onChange={(event) => updateReport({ emailAddress: event.target.value })}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="EditReport.PhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                    type="tel"
                    placeholder="Please enter your phone number"
                    defaultValue={report?.phoneNumber}
                    onChange={(event) => updateReport({ phoneNumber: event.target.value })}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="EditReport.ReportCategory">
                <Form.Label>Report Category</Form.Label>
                {[
                    'Illegal Dumping',
                    'Clogged Storm Drain',
                    'Potholes',
                    'Graffiti',
                    'Street Light Outage',
                    'Sidewalk Damage',
                    'Traffic Signal Malfunction',
                    'Abandoned Vehicles',
                    'Noise Complaint',
                    'Other',
                ].map((category) => (
                    <Form.Check
                        type="checkbox"
                        label={category}
                        checked={report?.reportCategory.includes(category)}
                        onChange={(event) => {
                            const newCategories = [...report!.reportCategory];
                            if (event.target.checked) {
                                newCategories.push(category);
                            } else {
                                newCategories.splice(newCategories.indexOf(category), 1);
                            }
                            updateReport({ reportCategory: newCategories });
                        }}
                    />
                ))}
            </Form.Group>

            <Form.Label>Issue Location</Form.Label>

            <Form.Group className="mb-3" controlId="EditReport.Address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Please enter your address"
                    defaultValue={report?.address}
                    onChange={(event) => updateReport({ address: event.target.value })}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="EditReport.GpsCoordinates">
                <Form.Label>GPS Coordinates</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Please enter your GPS Coordinates"
                    defaultValue={report?.gpsCoordinates}
                    onChange={(event) => updateReport({ gpsCoordinates: event.target.value })}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="EditReport.IssueDescription">
                <Form.Label>Issue Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Please enter your issue description"
                    defaultValue={report?.issueDescription}
                    onChange={(event) => updateReport({ issueDescription: event.target.value })}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="EditReport.Attachments">
                <Form.Label>Attachments</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Please enter your attachments"
                    defaultValue={report?.attachments}
                    onChange={(event) => updateReport({ attachments: event.target.value })}
                />
            </Form.Group>

            <Form.Label>Status Updates</Form.Label>

            <Form.Group className="mb-3" controlId="EditReport.Email">
                <Form.Check
                    type="checkbox"
                    label="Email"
                    checked={report?.email}
                    onChange={(event) => {
                        updateReport({
                            email: event.target.checked,
                        });
                    }}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="EditReport.Sms">
                <Form.Check
                    type="checkbox"
                    label="SMS"
                    checked={report?.sms}
                    onChange={(event) => {
                        updateReport({
                            sms: event.target.checked,
                        });
                    }}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="EditReport.StatusOfReport">
                <Form.Label>Status Of Report</Form.Label>
                {['Submitted', 'In Progress', 'Completed', 'On Hold', 'Rejected'].map((status) => (
                    <Form.Check
                        type="radio"
                        label={status}
                        name="status"
                        checked={report?.statusOfReport === status}
                        onChange={() => updateReport({ statusOfReport: status })}
                    />
                ))}
            </Form.Group>

            <Form.Group className="mb-3" controlId="EditReport.DateTimeOfSubmission">
                <Form.Label>Date Time Of Submission</Form.Label>
                <Form.Control
                    type="text"
                    readOnly={true}
                    defaultValue={report?.dateTimeOfSubmission}
                    onChange={(event) => updateReport({ dateTimeOfSubmission: event.target.value })}
                />
            </Form.Group>

            <Stack direction="horizontal" gap={3} className="justify-content-end">
                <div className="my-auto"></div>
                <ButtonLink variant="secondary" href={cancelHref}>
                    Cancel
                </ButtonLink>
                <Button variant="primary" onClick={onSubmit} disabled={isSubmitLoading}>
                    {isSubmitLoading ? <Spinner animation="border" size="sm" /> : submitLabel}
                </Button>
            </Stack>
        </Form>
    );
}
