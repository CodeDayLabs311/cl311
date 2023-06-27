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
    message: IGuestBookMessage | undefined;
    setMessage: (newMessage: IGuestBookMessage) => void;
    submitLabel: string;
    isSubmitLoading: boolean;
    onSubmit: () => void;
    cancelHref: string;
};

/** Guest book message editor */
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
