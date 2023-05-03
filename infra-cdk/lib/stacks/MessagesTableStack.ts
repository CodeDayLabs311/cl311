import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { BaseStackProps } from '../core/types';

export class MessagesTableStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: BaseStackProps) {
        super(scope, id, props);

        const messagesTable = new dynamodb.Table(this, `MessagesTable-${props.stage}`, {
            partitionKey: { name: 'MessageID', type: dynamodb.AttributeType.STRING },
            removalPolicy: cdk.RemovalPolicy.RETAIN,
        });

        messagesTable.addGlobalSecondaryIndex({
            indexName: 'AuthorIndex',
            partitionKey: { name: 'Author', type: dynamodb.AttributeType.STRING },
            sortKey: { name: 'MessageID', type: dynamodb.AttributeType.STRING },
            projectionType: dynamodb.ProjectionType.ALL,
        });
    }
}
