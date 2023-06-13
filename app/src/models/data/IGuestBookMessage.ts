/** Guest book entry (application model) */
export interface IGuestBookMessage {
    /** Unique message ID */
    messageId: string;
    /** Author name */
    author: string;
    /** Message */
    message: string;
}

/** Guest book entry (DynamoDB model) */
export interface IDBGuestBookMessage {
    /** Unique message ID */
    MessageId: { S: string };
    /** Author name */
    Author: { S: string };
    /** Message */
    Message: { S: string };
}
