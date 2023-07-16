import { IGuestBookMessage } from '@/models';
import { useCallback, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Stack from 'react-bootstrap/Stack';
import ButtonLink from '../ButtonLink';

// Names to randomly select from for name placeholder
const PLACEHOLDER_NAMES = ['Zhanping', 'Min', 'Sophie', 'Andrey'];

export type GuestBookMessageEditProps = {
    message: Omit<IGuestBookMessage, 'messageId'> | undefined;
    setMessage: (newMessage: IGuestBookMessage) => void;
    submitLabel: string;
    isSubmitLoading: boolean;
    onSubmit: () => void;
    cancelHref: string;
};

/** Guest book message editor, used for create and edit flows */
export default function GuestBookMessageEdit({
    message,
    setMessage,
    submitLabel,
    isSubmitLoading,
    onSubmit,
    cancelHref,
}: GuestBookMessageEditProps) {
    // Using useMemo to randomly select a name once
    // Otherwise, a new name would be randomly selected every render!
    const placeholderName = useMemo<string>(
        () => PLACEHOLDER_NAMES[Math.floor(Math.random() * PLACEHOLDER_NAMES.length)],
        []
    );

    const updateMessage = useCallback(
        (newValues: Partial<IGuestBookMessage>) => {
            setMessage({
                ...(message as IGuestBookMessage),
                ...newValues,
            });
        },
        [message, setMessage]
    );

    return (
        <Form>
            <Form.Group className="mb-3" controlId="EditMessage.Author">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder={placeholderName}
                    defaultValue={message?.author}
                    onChange={(event) => updateMessage({ author: event.target.value })}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="EditMessage.Message">
                <Form.Label>Message</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    defaultValue={message?.message}
                    onChange={(event) => updateMessage({ message: event.target.value })}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="EditMessage.Email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Email Address"
                    defaultValue={message?.email}
                    onChange={(event) => updateMessage({ email: event.target.value })}
                />
            </Form.Group>

                <Form.Group className="mb-3" controlId="ReportForm.PhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Phone Number"
                        onChange={(event) => updateMessage({ phoneNumber: event.target.value })}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
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
                            onChange={(event) =>
                                updateMessage({ [category]: event.target.checked })
                            }
                        />
                    ))}
                </Form.Group>

                <Form.Group className="mb-3" controlId="ReportForm.Address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Address"
                        onChange={(event) => updateMessage({ address: event.target.value })}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="ReportForm.GPSCoordinates">
                    <Form.Label>GPS Coordinates</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="GPS Coordinates"
                        onChange={(event) => updateMessage({ gpsCoordinates: event.target.value })}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="ReportForm.Description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Description"
                        onChange={(event) => updateMessage({ description: event.target.value })}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="ReportForm.Attachments">
                    <Form.Label>Attachments</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Attachments"
                        onChange={(event) => updateMessage({ attachments: event.target.value })}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Status Updates</Form.Label>
                    {['Email', 'SMS'].map((updateMethod) => (
                        <Form.Check
                            type="checkbox"
                            label={updateMethod}
                            onChange={(event) =>
                                updateMessage({ [updateMethod]: event.target.checked })
                            }
                        />
                    ))}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Status of the Report</Form.Label>
                    {['Submitted', 'Work-in-progress', 'Completed'].map((status) => (
                        <Form.Check
                            type="checkbox"
                            label={status}
                            onChange={(event) => updateMessage({ [status]: event.target.checked })}
                        />
                    ))}
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
