import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { Tenant } from '../core/enums';
import { Stage, BaseStackProps } from '../core/types';

const BASE_TABLE_NAME = 'MessagesTable';

export class MessagesTableStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: BaseStackProps) {
        super(scope, id, props);

        const messagesTable = new dynamodb.Table(
            this,
            `MessagesTable-${props.stage}-${props.tenant}`,
            {
                tableName: this.getTableName(props.stage, props.tenant),
                partitionKey: { name: 'MessageID', type: dynamodb.AttributeType.STRING },
                removalPolicy: cdk.RemovalPolicy.RETAIN,
            }
        );

        messagesTable.addGlobalSecondaryIndex({
            indexName: 'AuthorIndex',
            partitionKey: { name: 'Author', type: dynamodb.AttributeType.STRING },
            sortKey: { name: 'MessageID', type: dynamodb.AttributeType.STRING },
            projectionType: dynamodb.ProjectionType.ALL,
        });
    }

    private getTableName(stage: Stage, tenant: Tenant): string {
        return `${BASE_TABLE_NAME}-${stage}-${tenant}`;
    }
}
