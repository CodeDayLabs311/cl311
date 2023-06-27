import { IDBGuestBookMessage, IGuestBookClient, IGuestBookMessage } from '@/models';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { getDynamoDbClient } from '../api';
import { isUndefined } from '../common';

const TABLE_NAME =
    'ApplicationStage-dev-MessagesTableStack-dev-MessagesTabledevAB588232-15LANIVBLT31I';

/** Client to interact with guest book DynamoDB */
export class GuestBookDbClient implements IGuestBookClient {
    ddbClient: DynamoDB;

    constructor() {
        this.ddbClient = getDynamoDbClient();
    }

    /** Get guest book message */
    async getMessage(messageId: string) {
        const key: Omit<IDBGuestBookMessage, 'Author' | 'Message'> = {
            MessageID: {
                S: messageId,
            },
        };

        const getData = await this.ddbClient.getItem({
            TableName: TABLE_NAME,
            Key: key,
        });

        return unmarshalMessage(getData.Item as unknown as IDBGuestBookMessage);
    }

    /** List guest book messages */
    async listMessages(paginationToken?: string) {
        // TODO handle pagination

        const scanData = await this.ddbClient.scan({
            TableName: TABLE_NAME,
        });

        return {
            messages: unmarshalMessages(scanData.Items as unknown as IDBGuestBookMessage[]),
            paginationToken: undefined,
        };
    }
}

/** Unmarshal guest book messages from DynamoDB */
function unmarshalMessages(messages?: IDBGuestBookMessage[]): IGuestBookMessage[] {
    return messages?.map((message) => unmarshalMessage(message)!) || [];
}

/** Unmarshal portfolio from DynamoDB */
function unmarshalMessage(message?: IDBGuestBookMessage): IGuestBookMessage | undefined {
    if (isUndefined(message)) {
        return;
    }

    return {
        messageId: message?.MessageID?.S!,
        author: message?.Author?.S!,
        message: message?.Message?.S!,
    };
}
