import GuestBookListItem from '@/components/guestbook/GuestBookMessageCard';
import Loading from '@/components/Loading';
import PageHeader from '@/components/PageHeader';
import { IGuestBookClient, IGuestBookMessage } from '@/models';
import { GuestBookApiClient, isUndefined, useEffectAsync } from '@/utils';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';

const BASE_PAGE_TITLE = 'Guest Book Message';

export default function GuestBookDetail() {
    const router = useRouter();

    const guestBookClient = useMemo<IGuestBookClient>(() => new GuestBookApiClient(), []);

    const [message, setMessage] = useState<IGuestBookMessage | undefined>(undefined);
    const isLoading = isUndefined(message);
    const pageTitle = isLoading
        ? BASE_PAGE_TITLE
        : `${BASE_PAGE_TITLE} - Message from ${message?.author!}`;

    useEffectAsync(async () => {
        const id = router.query.id as string;
        if (!isUndefined(id)) {
            const result = await guestBookClient.getMessage(id);
            setMessage(result);
        }
    }, [router.query]);

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
            </Head>
            <main>
                <Container>
                    <Stack gap={3}>
                        <PageHeader>{pageTitle}</PageHeader>
                        <Loading isLoading={isLoading}>Loading guest book message....</Loading>
                        {!isLoading && <GuestBookListItem message={message!} />}
                    </Stack>
                </Container>
            </main>
        </>
    );
}
