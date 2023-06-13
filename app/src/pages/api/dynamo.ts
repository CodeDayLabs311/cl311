import { IGuestBookMessage } from '@/models';
import { GuestBookClient } from '@/utils';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ messages: IGuestBookMessage[] }>
) {
    const guestBookClient = new GuestBookClient();
    const entries = await guestBookClient.listMessages();

    res.status(200).json({ messages: entries?.messages! });
}
