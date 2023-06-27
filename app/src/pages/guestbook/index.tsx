import GuestBookMessageCard from '@/components/guestbook/GuestBookMessageCard';
import Loading from '@/components/Loading';
import PageHeader from '@/components/PageHeader';
import { useGuestBookClient } from '@/hooks';
import { IGuestBookMessage } from '@/models';
import { useEffectAsync } from '@/utils';
import Head from 'next/head';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';

export default function GuestBookListing() {
    const guestBookClient = useGuestBookClient();

    const [messages, setMessages] = useState<IGuestBookMessage[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffectAsync(async () => {
        const result = await guestBookClient.listMessages();
        setMessages(result?.messages!);
        setIsLoading(false);
    }, []);

    return (
        <>
            <Head>
                <title>Guest Book Messages</title>
            </Head>
            <main>
                <Container>
                    <Stack gap={3}>
                        <PageHeader>Guest Book Messages</PageHeader>
                        <Loading isLoading={isLoading}>Loading guest book messages....</Loading>
                        {!isLoading &&
                            messages.map((message) => (
                                <GuestBookMessageCard key={message.messageId} message={message} />
                            ))}
                    </Stack>
                </Container>
            </main>
        </>
    );
}
