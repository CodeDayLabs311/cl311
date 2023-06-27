import { IGuestBookClient } from '@/models';
import { IListGuestBookMessagesResponse } from '@/pages/api/guestbook/list';
import { IGetGuestBookMessageResponse } from '@/pages/api/guestbook/[id]';

const GET_MESSAGE_BASE_ENDPOINT = '/api/guestbook';
const LIST_MESSAGES_ENDPOINT = '/api/guestbook/list';

/** Client to interact with guest book API */
export class GuestBookApiClient implements IGuestBookClient {
    /** List guest book messages */
    async getMessage(messageId: string) {
        const response = await fetch(`${GET_MESSAGE_BASE_ENDPOINT}/${messageId}`);
        const json: IGetGuestBookMessageResponse = await response.json();

        return json.message;
    }

    /** List guest book messages */
    async listMessages(paginationToken?: string) {
        const response = await fetch(
            `${LIST_MESSAGES_ENDPOINT}?paginationToken=${paginationToken}`
        );
        const json: IListGuestBookMessagesResponse = await response.json();

        return json;
    }
}
