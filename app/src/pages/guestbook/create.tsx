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

/** Create a new guest book message */
export default function GuestBookCreate() {
    const router = useRouter();
    const guestBookClient = useGuestBookClient();

    const createMessage = async (newMessage: NewGuestBookMessage): Promise<IGuestBookMessage> => {
        const createdMessage = await guestBookClient.createMessage(newMessage);
        return createdMessage!;
    };

    const handleSubmit = async (message: NewGuestBookMessage) => {
        console.log(message)
        const createdMessage = await createMessage(message!);
        router.push(`/guestbook/${createdMessage.messageId}`);
    }

    return (
        <>
            <Head>
                <title>New Guest Book Message</title>
            </Head>
            <main>
                <Container>
                    <Stack gap={3}>
                        <PageHeader>New Guest Book Message</PageHeader>
                        <GuestBookMessageEdit
                            submitLabel="Create"
                            onSubmit={handleSubmit}
                            cancelHref={'/guestbook'}
                        />
                    </Stack>
                </Container>
            </main>
        </>
    );
}
