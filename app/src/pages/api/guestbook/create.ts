import {
    BAD_REQUEST,
    HttpMethod,
    IApiErrorResponse,
    IGuestBookMessage,
    INTERNAL_SERVER_ERROR,
    METHOD_NOT_ALLOWED,
    NOT_FOUND,
} from '@/models';
import { GuestBookDbClient, isUndefined } from '@/utils';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface ICreateGuestBookMessageResponse {
    message: IGuestBookMessage;
}

/** Get guest book messages */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ICreateGuestBookMessageResponse | IApiErrorResponse>
) {
    if (req.method !== HttpMethod.POST) {
        return res.status(405).send({ message: METHOD_NOT_ALLOWED });
    }

    const { id } = req.query;

    try {
        const guestBookClient = new GuestBookDbClient();

        const params = req.body as IGuestBookMessage;
        const isValidRequest =
            isUndefined(params?.messageId) &&
            !isUndefined(params?.author && !isUndefined(params?.message));

        if (!isValidRequest) {
            // Don't store bad data in the database!
            return res.status(400).send({ message: BAD_REQUEST });
        }

        const message = await guestBookClient.createMessage(params);

        if (isUndefined(message)) {
            return res.status(404).send({ message: NOT_FOUND });
        }

        return res.status(200).json({ message: message! });
    } catch (err) {
        console.error(err);

        return res.status(500).send({ message: INTERNAL_SERVER_ERROR });
    }
}
