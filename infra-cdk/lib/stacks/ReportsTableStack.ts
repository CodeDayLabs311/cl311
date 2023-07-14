import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { Stage, Tenant } from '../core/enums';
import { BaseStackProps } from '../core/types';

const BASE_TABLE_NAME = 'ReportsTable';

/** DynamoDB table storing reports */
export class ReportsTableStack extends cdk.Stack {
    private stage: Stage;
    private tenant: Tenant;

    constructor(scope: Construct, id: string, props: BaseStackProps) {
        super(scope, id, props);

        this.stage = props.stage;
        this.tenant = props.tenant;

        const reportsTable = new dynamodb.Table(
            this,
            `ReportsTable-${props.stage}-${props.tenant}`,
            {
                tableName: this.getTableName(),
                partitionKey: { name: 'ReportID', type: dynamodb.AttributeType.STRING },
                removalPolicy: cdk.RemovalPolicy.RETAIN,
                attributes: {
                    'ReportID': { type: dynamodb.AttributeType.STRING, primaryKey: true },
                    'Name': { type: dynamodb.AttributeType.STRING },
                    'EmailAddress': { type: dynamodb.AttributeType.STRING },
                    'PhoneNumber': { type: dynamodb.AttributeType.STRING },
                    'Category': { type: dynamodb.AttributeType.STRING },
                    'Location': { type: dynamodb.AttributeType.STRING },
                    'Description': { type: dynamodb.AttributeType.STRING },
                    'Attachments': { type: dynamodb.AttributeType.STRING, list: true },
                    'StatusUpdates': { type: dynamodb.AttributeType.BOOL, list: true },
                    'Status': { type: dynamodb.AttributeType.STRING },
                    'SubmissionDateTime': { type: dynamodb.AttributeType.STRING },
                },
            }
        );

        reportsTable.addGlobalSecondaryIndex({
            indexName: 'CategoryIndex',
            partitionKey: { name: 'Category', type: dynamodb.AttributeType.STRING },
            sortKey: { name: 'SubmissionDateTime', type: dynamodb.AttributeType.STRING },
            projectionType: dynamodb.ProjectionType.ALL,
        });
    }

    /** Get DynamoDB table name */
    getTableName(): string {
        return `${BASE_TABLE_NAME}-${this.stage}-${this.tenant}`;
    }
}
