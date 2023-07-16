import GuestBookMessageEdit from '@/components/guestbook/GuestBookMessageEdit';
import PageHeader from '@/components/PageHeader';
import { useGuestBookClient } from '@/hooks';
import { IGuestBookMessage } from '@/models';
import { isUndefined } from '@/utils';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';

type NewGuestBookMessage = Omit<IGuestBookMessage, 'messageId'>;

const getInitialMessage = (): NewGuestBookMessage => ({
    author: '',
    message: '',
});

/** Create a new guest book message */
export default function GuestBookCreate() {
    const router = useRouter();
    const guestBookClient = useGuestBookClient();

    const [draftMessage, setDraftMessage] = useState<NewGuestBookMessage>(getInitialMessage());
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const createMessage = async (newMessage: NewGuestBookMessage): Promise<IGuestBookMessage> => {
        setIsSubmitting(true);
        const createdMessage = await guestBookClient.createMessage(newMessage);
        setIsSubmitting(false);
        return createdMessage!;
    };

    const handleSubmit = async () => {
        if (!isUndefined(draftMessage)) {
            const createdMessage = await createMessage(draftMessage!);
            router.push(`/guestbook/${createdMessage.messageId}`);
        }
    };

    return (
        <>
            <Head>
                <title>Create a New Report</title>
            </Head>
            <main>
                <Container>
                    <Stack gap={3}>
                        <PageHeader>Create a New Report</PageHeader>
                        <GuestBookMessageEdit
                            message={draftMessage!}
                            setMessage={setDraftMessage}
                            submitLabel="Create"
                            isSubmitLoading={false}
                            onSubmit={handleSubmit}
                            cancelHref={'/guestbook'}
                        />
                    </Stack>
                </Container>
            </main>
        </>
    );
}
