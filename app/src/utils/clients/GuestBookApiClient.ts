import { IGuestBookClient, IGuestBookMessage } from '@/models';

const LIST_MESSAGES_ENDPOINT = '/api/dynamo';

/** Client to interact with portfolio API */
export class GuestBookApiClient implements IGuestBookClient {
    /** List guest book entries */
    async listMessages(paginationToken?: string) {
        const response = await fetch(
            `${LIST_MESSAGES_ENDPOINT}?paginationToken=${paginationToken}`
        );
        const json = await response.json();

        return json as {
            messages: IGuestBookMessage[];
            paginationToken: string | undefined;
        };
    }
}
