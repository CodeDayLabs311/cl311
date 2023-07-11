import GuestBookMessageEdit from '@/components/guestbook/GuestBookMessageEdit';
import Loading from '@/components/Loading';
import PageHeader from '@/components/PageHeader';
import { useGuestBookMessage } from '@/hooks';
import { IGuestBookMessage } from '@/models';
import { isUndefined } from '@/utils';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';

const BASE_PAGE_TITLE = 'Edit Guest Book Message';

/** Edit an existing guest book message */
export default function GuestBookEdit() {
    const router = useRouter();
    const {
        message,
        isLoading: isMessageLoading,
        updateMessage,
        isSubmitting,
    } = useGuestBookMessage(router.query.id as string);
    const detailsHref = `/guestbook/${message?.messageId}`;

    // const [draftMessage, setDraftMessage] = useState<IGuestBookMessage>();
    // const isLoading = isMessageLoading || isUndefined(draftMessage);
    const isLoading = isMessageLoading;

    // `message` is the unaltered message originally fetched from the API
    // `draftMessage` is the message object being modified by the user
    // When `message` loads for the first time, store it in `draftMessage
    // useEffect(() => {
    //     if (!isUndefined(message) && isUndefined(draftMessage)) {
    //         setDraftMessage(message);
    //     }
    // }, [message, draftMessage]);

    const pageTitle = isLoading
        ? BASE_PAGE_TITLE
        : `${BASE_PAGE_TITLE} - Message from ${message?.author!}`;

    const handleSubmit = async (message: IGuestBookMessage) => {
        console.log(message)
        await updateMessage(message!);
        router.push(detailsHref);
        
    };

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
                        {!isLoading && (
                            <GuestBookMessageEdit
                                // message={draftMessage!}
                                message={message!}
                                // setMessage={setDraftMessage}
                                submitLabel="Save"
                                // isSubmitLoading={isSubmitting}
                                onEdit={handleSubmit}
                                cancelHref={detailsHref}
                            />
                        )}
                    </Stack>
                </Container>
            </main>
        </>
    );
}
