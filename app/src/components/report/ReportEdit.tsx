import { IReport } from '@/models';
import { Spinner, Stack, Button, Form } from 'react-bootstrap';
import ButtonLink from '../ButtonLink';
import { ReportCategories } from '@/models';
import { useFormik, FormikHelpers } from 'formik';
import { isUndefined } from '@/utils';
import { VALIDATION_SCHEMA } from '../../utils/validation/ValidSchema';

//Initial values for report form
type NewReport = Omit<IReport, 'reportId'>;
type InitialValuesType = NewReport | IReport;

const getInitialReport = (): NewReport => ({
    name: '',
    emailAddress: '',
    phoneNumber: '',
    reportCategory: '',
    otherCategory: '',
    address: '',
    gpsCoordinates: '',
    issueDescription: '',
    attachments: '',
    email: false,
    sms: false,
    statusOfReport: 'Submitted',
    dateTimeOfSubmission: new Date().toLocaleString('en-US'),
});

export type ReportEditProps = {
    report: IReport | undefined;
    submitLabel: string;
    onCreate?: (report: NewReport) => void;
    onEdit?: (report: IReport) => void;
    cancelHref: string;
};

/** Report editor, used for create and edit flows */
export default function ReportEdit({
    report,
    submitLabel,
    onCreate,
    onEdit,
    cancelHref,
}: ReportEditProps) {
    const initializeValues = (): InitialValuesType => {
        if (isUndefined(report)) {
            return getInitialReport();
        }
        return report!;
    };

    const handleSubmit = (
        report: InitialValuesType,
        formikHelpers: FormikHelpers<InitialValuesType>
    ) => {
        const { setSubmitting } = formikHelpers;
        try {
            if (onEdit && 'reportId' in report) {
                onEdit(report as IReport);
            } else if (onCreate) {
                onCreate(report as NewReport);
            }
        } catch (error) {
            console.log('Failed to create report', error);
        } finally {
            setSubmitting(false);
        }
    };

    const formik = useFormik<InitialValuesType>({
        initialValues: initializeValues(),
        validationSchema: VALIDATION_SCHEMA,
        onSubmit: handleSubmit,
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Label>Contact Information</Form.Label>

            <Form.Group className="mb-3" controlId="EditReport.Name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    name="name"
                    type="text"
                    placeholder="Please enter your name"
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
            </Form.Group>
            {formik.touched.name && formik.errors.name && (
                <p className="text-danger">{formik.errors.name}</p>
            )}

            <Form.Group className="mb-3" controlId="EditReport.EmailAddress">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    name="emailAddress"
                    type="email"
                    placeholder="Please enter your email address"
                    value={formik.values.emailAddress}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
            </Form.Group>
            {formik.touched.emailAddress && formik.errors.emailAddress && (
                <p className="text-danger">{formik.errors.emailAddress}</p>
            )}

            <Form.Group className="mb-3" controlId="EditReport.PhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                    name="phoneNumber"
                    type="tel"
                    placeholder="Please enter your phone number"
                    value={formik.values.phoneNumber}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
            </Form.Group>
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <p className="text-danger">{formik.errors.phoneNumber}</p>
            )}

            <Form.Group className="mb-3" controlId="EditReport.ReportCategory">
                <Form.Label>Report Category</Form.Label>
                {[
                    ReportCategories.Illegal_Dumping,
                    ReportCategories.Clogged_Storm_Drain,
                    ReportCategories.Potholes,
                    ReportCategories.Graffiti,
                    ReportCategories.Street_Light_Outage,
                    ReportCategories.Sidewalk_Damage,
                    ReportCategories.Traffic_Signal_Malfunction,
                    ReportCategories.Abandoned_Vehicles,
                    ReportCategories.Noise_Complaint,
                    ReportCategories.Other,
                ].map((category) => (
                    <div key={category}>
                        <Form.Check
                            name="reportCategory"
                            type="radio"
                            label={category}
                            value={category}
                            checked={formik.values.reportCategory === category}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                        {/* Show the additional input field only when 'Other' is selected */}
                        {category === ReportCategories.Other &&
                            formik.values.reportCategory === category && (
                                <div>
                                    <Form.Label>Other Category:</Form.Label>
                                    <Form.Control
                                        name="otherCategory"
                                        value={formik.values.otherCategory}
                                        type="text"
                                        placeholder="Please enter your other category"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                            )}
                    </div>
                ))}
            </Form.Group>
            {formik.touched.reportCategory && formik.errors.reportCategory && (
                <p className="text-danger">{formik.errors.reportCategory}</p>
            )}
            {formik.touched.otherCategory && formik.errors.otherCategory && (
                <p className="text-danger">{formik.errors.otherCategory}</p>
            )}

            <Form.Group className="mb-3" controlId="EditReport.Address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    name="address"
                    type="text"
                    placeholder="Please enter your issue location"
                    value={formik.values.address}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
            </Form.Group>
            {formik.touched.address && formik.errors.address && (
                <p className="text-danger">{formik.errors.address}</p>
            )}

            <Form.Group className="mb-3" controlId="EditReport.IssueDescription">
                <Form.Label>Issue Description</Form.Label>
                <Form.Control
                    name="issueDescription"
                    as="textarea"
                    rows={3}
                    placeholder="Please enter your issue description"
                    value={formik.values.issueDescription}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
            </Form.Group>
            {formik.touched.issueDescription && formik.errors.issueDescription && (
                <p className="text-danger">{formik.errors.issueDescription}</p>
            )}

            <Form.Group className="mb-3" controlId="EditReport.Attachments">
                <Form.Label>Attachments</Form.Label>
                <Form.Control
                    name="attachments"
                    type="text"
                    placeholder="Please enter your attachments"
                    value={formik.values.attachments}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
            </Form.Group>

            <Form.Label>Status Updates</Form.Label>

            <Form.Group className="mb-3" controlId="EditReport.Email">
                <Form.Check
                    name="email"
                    type="checkbox"
                    label="Email"
                    checked={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
            </Form.Group>
            {formik.touched.email && formik.errors.email && (
                <p className="text-danger">{formik.errors.email}</p>
            )}

            <Form.Group className="mb-3" controlId="EditReport.Sms">
                <Form.Check
                    name="sms"
                    type="checkbox"
                    label="SMS"
                    checked={formik.values.sms}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
            </Form.Group>
            {formik.touched.sms && formik.errors.sms && (
                <p className="text-danger">{formik.errors.sms}</p>
            )}

            <Stack direction="horizontal" gap={3} className="justify-content-end">
                <div className="my-auto"></div>
                <ButtonLink variant="secondary" href={cancelHref}>
                    Cancel
                </ButtonLink>
                <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? <Spinner animation="border" size="sm" /> : submitLabel}
                </Button>
            </Stack>
        </Form>
    );
}
