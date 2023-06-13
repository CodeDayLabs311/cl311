import { IGuestBookMessage } from '../data';

/** Interface for guest book clients */
export interface IGuestBookClient {
    /** List guest book messages */
    listMessages(paginationToken?: string): Promise<{
        messages: IGuestBookMessage[];
        paginationToken: string | undefined;
    }>;
}
