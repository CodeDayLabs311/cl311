import { IGuestBookMessage } from '@/models';
import { GuestBookDbClient } from '@/utils';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ messages: IGuestBookMessage[] }>
) {
    const guestBookClient = new GuestBookDbClient();
    const entries = await guestBookClient.listMessages();

    res.status(200).json({ messages: entries?.messages! });
}
