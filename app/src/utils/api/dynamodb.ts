import { DynamoDB } from '@aws-sdk/client-dynamodb';

/** Gets DynamoDB client */
export function getDynamoDbClient(): DynamoDB {
    const ddb = new DynamoDB({
        apiVersion: '2012-08-10',
        region: 'us-west-2',
        // credentials: {
        //     accessKeyId: process.env['CL_AWS_ACCESS_KEY'] as string,
        //     secretAccessKey: process.env['CL_AWS_SECRET_ACCESS_KEY'] as string,
        // },
    });

    return ddb;
}
