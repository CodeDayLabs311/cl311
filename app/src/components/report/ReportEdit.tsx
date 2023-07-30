import { IReport } from '@/models';
import { useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Stack from 'react-bootstrap/Stack';
import ButtonLink from '../ButtonLink';
import styles from '../../styles/Report.module.css';

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
        <Form className={styles.reportForm}>
            <div className={styles.formColumn}>
                <Form.Label className={styles.sectionLabel}>Contact Information</Form.Label>

                <Form.Group className={styles.formGroup} controlId="EditReport.Name">
                    <Form.Label className={styles.label}>Name</Form.Label>
                    <Form.Control
                        className={styles.input}
                        type="text"
                        placeholder="Please enter your name"
                        defaultValue={report?.name}
                        onChange={(event) => updateReport({ name: event.target.value })}
                    />
                </Form.Group>

                <Form.Group className={styles.formGroup} controlId="EditReport.EmailAddress">
                    <Form.Label className={styles.label}>Email Address</Form.Label>
                    <Form.Control
                        className={styles.input}
                        type="email"
                        placeholder="Please enter your email address"
                        defaultValue={report?.emailAddress}
                        onChange={(event) => updateReport({ emailAddress: event.target.value })}
                    />
                </Form.Group>

                <Form.Group className={styles.formGroup} controlId="EditReport.PhoneNumber">
                    <Form.Label className={styles.label}>Phone Number</Form.Label>
                    <Form.Control
                        className={styles.input}
                        type="tel"
                        placeholder="Please enter your phone number"
                        defaultValue={report?.phoneNumber}
                        onChange={(event) => updateReport({ phoneNumber: event.target.value })}
                    />
                </Form.Group>

                <Form.Label className={styles.sectionLabel}>Issue Location</Form.Label>

                <Form.Group className={styles.formGroup} controlId="EditReport.Address">
                    <Form.Label className={styles.label}>Address</Form.Label>
                    <Form.Control
                        className={styles.input}
                        type="text"
                        placeholder="Please enter your address"
                        defaultValue={report?.address}
                        onChange={(event) => updateReport({ address: event.target.value })}
                    />
                </Form.Group>


                <Form.Label className={styles.sectionLabel}>Report Category</Form.Label>

                <Form.Group className={styles.formGroup} controlId="EditReport.ReportCategory">
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
                    ].map((category, index) => (
                        <Form.Check
                            key={index}
                            type="checkbox"
                            label={category}
                            className={styles.checkControl}
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


            </div>

            <div className={styles.formColumn}>
                <Form.Label className={styles.sectionLabel}>Issue Description</Form.Label>

                <Form.Group className={styles.formGroup} controlId="EditReport.IssueDescription">
                    <Form.Control
                        as="textarea"
                        rows={3}
                        className={styles.textarea}
                        placeholder="Please enter your issue description"
                        defaultValue={report?.issueDescription}
                        onChange={(event) => updateReport({ issueDescription: event.target.value })}
                    />
                </Form.Group>

                <Form.Group className={styles.formGroup} controlId="EditReport.Attachments">
                    <Form.Label className={styles.label}>Attachments</Form.Label>
                    <Form.Control
                        className={styles.input}
                        type="text"
                        placeholder="Please enter your attachments"
                        defaultValue={report?.attachments}
                        onChange={(event) => updateReport({ attachments: event.target.value })}
                    />
                </Form.Group>

                <Form.Label className={styles.sectionLabel}>Status Updates</Form.Label>

                <Form.Group className={styles.formGroup} controlId="EditReport.StatusUpdates">
                    <Form.Label className={styles.label}>Communication Preferences</Form.Label>
                    <div className={styles.statusUpdates}>
                        <Form.Check
                            type="checkbox"
                            label="Email"
                            className={styles.checkControl}
                            checked={report?.email}
                            onChange={(event) => {
                                updateReport({
                                    email: event.target.checked,
                                });
                            }}
                        />
                        <Form.Check
                            type="checkbox"
                            label="SMS"
                            className={styles.checkControl}
                            checked={report?.sms}
                            onChange={(event) => {
                                updateReport({
                                    sms: event.target.checked,
                                });
                            }}
                        />
                    </div>
                </Form.Group>

                
                <div className={styles.buttonContainer}>
                <ButtonLink className={styles.btnCancel} variant="secondary" href={cancelHref}>
                    Cancel
                </ButtonLink>
                <Button
                    className={styles.btnCreate}
                    variant="primary"
                    onClick={onSubmit}
                    disabled={isSubmitLoading}
                >
                    {isSubmitLoading ? <Spinner animation="border" size="sm" /> : submitLabel}
                </Button>
            </div>

            </div>


        </Form>
    );
}
