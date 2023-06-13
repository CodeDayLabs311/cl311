import { useMemo, useState } from 'react';
import GuestBookListItem from '@/components/guestbook/GuestBookListItem';
import { IGuestBookClient, IGuestBookMessage } from '@/models';
import { GuestBookApiClient, useEffectAsync } from '@/utils';
import Head from 'next/head';

export default function GuestBookListing() {
    const guestBookClient = useMemo<IGuestBookClient>(() => new GuestBookApiClient(), []);

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
                <title>Guest Book - Listing</title>
            </Head>
            <main>
                <h2>Guest Book Messages</h2>
                {isLoading && <span>Loading guest book messages...</span>}
                {!isLoading &&
                    messages.map((message) => (
                        <GuestBookListItem key={message.messageId} message={message} />
                    ))}
            </main>
        </>
    );
}
