import { IGuestBookMessage } from '@/models';
import { useMemo } from 'react';
import { Spinner, Stack, Button, Form } from 'react-bootstrap';
import ButtonLink from '../ButtonLink';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { isUndefined } from '@/utils';

// Names to randomly select from for name placeholder
const PLACEHOLDER_NAMES = ['Zhanping', 'Min', 'Sophie', 'Andrey'];

// Form validation for any form with name === author or message
const VALIDATION_SCHEMA = Yup.object({
    author: Yup.string()
        .matches(
            /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
            'Name can only contain Latin letters.'
        )
        .min(2, 'Too short!')
        .max(50, 'Too long!')
        .required('Required!'),
    message: Yup.string().min(2, 'Too short!').max(1000, 'Too long!').required('Required!'),
});

//Initial values for name and message
type NewGuestBookMessage = Omit<IGuestBookMessage, 'messageId'>;

const getInitialMessage = (): NewGuestBookMessage => ({
    author: '',
    message: '',
});

export type GuestBookMessageEditProps = {
    message: IGuestBookMessage | undefined;
    submitLabel: string;
    onCreate?: (message: NewGuestBookMessage) => void;
    onEdit?: (message: IGuestBookMessage) => void;
    cancelHref: string;
};

/** Guest book message editor, used for create and edit flows */
export default function GuestBookMessageEdit({
    message,
    submitLabel,
    onCreate,
    onEdit,
    cancelHref,
}: GuestBookMessageEditProps) {
    // Using useMemo to randomly select a name once
    // Otherwise, a new name would be randomly selected every render!
    const placeholderName = useMemo<string>(
        () => PLACEHOLDER_NAMES[Math.floor(Math.random() * PLACEHOLDER_NAMES.length)],
        []
    );

    const initializeValues = (): NewGuestBookMessage | IGuestBookMessage => {
        if (isUndefined(message)) {
            return getInitialMessage();
        }
        return message!;
    };

    return (
        <Formik
            initialValues={initializeValues()}
            validationSchema={VALIDATION_SCHEMA}
            onSubmit={(message, { setSubmitting }) => {
                try {
                    if (onEdit && 'messageId' in message) {
                        onEdit(message as IGuestBookMessage);
                    } else if (onCreate) {
                        onCreate(message as NewGuestBookMessage);
                    }
                } catch (error) {
                    console.log('Failed to create message', error);
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {(props) => (
                <Form onSubmit={props.handleSubmit}>
                    <Form.Group className="mb-3" controlId="EditMessage.Author">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            name="author"
                            type="text"
                            placeholder={placeholderName}
                            value={props.values.author}
                            onBlur={props.handleBlur}
                            onChange={props.handleChange}
                        />
                    </Form.Group>
                    {props.touched.author && props.errors.author && (
                        <p className="text-danger">{props.errors.author}</p>
                    )}

                    <Form.Group className="mb-3" controlId="EditMessage.Message">
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                            name="message"
                            rows={3}
                            as="textarea"
                            value={props.values.message}
                            onBlur={props.handleBlur}
                            onChange={props.handleChange}
                        />
                    </Form.Group>
                    {props.touched.message && props.errors.message && (
                        <p className="text-danger">{props.errors.message}</p>
                    )}

                    <Stack direction="horizontal" gap={3} className="justify-content-end">
                        <div className="my-auto"></div>
                        <ButtonLink variant="secondary" href={cancelHref}>
                            Cancel
                        </ButtonLink>
                        <Button variant="primary" type="submit" disabled={props.isSubmitting}>
                            {props.isSubmitting ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                                submitLabel
                            )}
                        </Button>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
}
