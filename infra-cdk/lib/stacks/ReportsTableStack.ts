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
            }
        );

        // // Add additional attributes to the table
        // reportsTable.addAttribute('Name', dynamodb.AttributeType.STRING);
        // reportsTable.addAttribute('EmailAddress', dynamodb.AttributeType.STRING);
        // reportsTable.addAttribute('PhoneNumber', dynamodb.AttributeType.STRING);
        // reportsTable.addAttribute('Category', dynamodb.AttributeType.STRING);
        // reportsTable.addAttribute('Location', dynamodb.AttributeType.STRING);
        // reportsTable.addAttribute('Description', dynamodb.AttributeType.STRING);
        // reportsTable.addAttribute('Attachments', dynamodb.AttributeType.LIST);
        // reportsTable.addAttribute('StatusUpdates', dynamodb.AttributeType.BOOLEAN);
        // reportsTable.addAttribute('Status', dynamodb.AttributeType.STRING);
        // reportsTable.addAttribute('SubmissionDateTime', dynamodb.AttributeType.STRING);

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
