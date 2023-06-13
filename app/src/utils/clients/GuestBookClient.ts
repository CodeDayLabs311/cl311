import { IDBGuestBookMessage, IGuestBookClient, IGuestBookMessage } from '@/models';
import { DynamoDB, ScanOutput } from '@aws-sdk/client-dynamodb';
import { getDynamoDbClient } from '../api';
import { isUndefined } from '../common';

const TABLE_NAME =
    'ApplicationStage-dev-MessagesTableStack-dev-MessagesTabledevAB588232-15LANIVBLT31I';

/** Client to interact with guest book DynamoDB */
export class GuestBookClient implements IGuestBookClient {
    ddbClient: DynamoDB;

    constructor() {
        this.ddbClient = getDynamoDbClient();
    }

    /** List guest book entries */
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

/** Unmarshal guest book entries from DynamoDB */
function unmarshalMessages(messages?: IDBGuestBookMessage[]): IGuestBookMessage[] {
    return messages?.map((message) => unmarshalMessage(message)!) || [];
}

/** Unmarshal portfolio from DynamoDB */
function unmarshalMessage(message?: IDBGuestBookMessage): IGuestBookMessage | undefined {
    if (isUndefined(message)) {
        return;
    }

    return {
        messageId: message?.MessageId?.S!,
        author: message?.Author?.S!,
        message: message?.Message?.S!,
    };
}
