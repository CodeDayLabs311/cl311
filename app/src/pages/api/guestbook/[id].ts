import {
    HttpMethod,
    IApiErrorResponse,
    IGuestBookMessage,
    INTERNAL_SERVER_ERROR,
    METHOD_NOT_ALLOWED,
    NOT_FOUND,
} from '@/models';
import { GuestBookDbClient, isUndefined } from '@/utils';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface IGetGuestBookMessageResponse {
    message: IGuestBookMessage;
}

/** Get guest book messages */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IGetGuestBookMessageResponse | IApiErrorResponse>
) {
    if (req.method !== HttpMethod.GET) {
        return res.status(405).send({ message: METHOD_NOT_ALLOWED });
    }

    const { id } = req.query;

    try {
        const guestBookClient = new GuestBookDbClient();
        const message = await guestBookClient.getMessage(id as string);

        if (isUndefined(message)) {
            return res.status(404).send({ message: NOT_FOUND });
        }

        return res.status(200).json({ message: message! });
    } catch (err) {
        console.error(err);

        return res.status(500).send({ message: INTERNAL_SERVER_ERROR });
    }
}
