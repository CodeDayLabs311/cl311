import { IGuestBookMessage } from '../data';

/** Interface for guest book clients */
export interface IGuestBookClient {
    /** Get guest book message */
    getMessage(messageId: string): Promise<IGuestBookMessage | undefined>;
    /** List guest book messages */
    listMessages(paginationToken?: string): Promise<{
        messages: IGuestBookMessage[];
        paginationToken: string | undefined;
    }>;
    /** Put guest book message */
    putMessage(message: IGuestBookMessage): Promise<IGuestBookMessage | undefined>;
}
