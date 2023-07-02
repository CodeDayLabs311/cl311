import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { ENVIRONMENT } from '../core/constants';
import { BaseStackProps } from '../core/types';

export type IAMStackProps = {
    /** DynamoDB table name to provide permissions to */
    tableName: string;
} & BaseStackProps;

export class IAMStack extends cdk.Stack {
    private iamPolicy: iam.Policy;

    constructor(scope: Construct, id: string, props: IAMStackProps) {
        super(scope, id, props);

        this.iamPolicy = new iam.Policy(this, `CL311Policy-${props.stage}-${props.tenant}`, {
            policyName: `CL311Policy-${props.stage}-${props.tenant}`,
            statements: [
                // Allow access to DynamoDB table
                new iam.PolicyStatement({
                    actions: ['dynamodb:Scan', 'dynamodb:GetItem', 'dynamodb:PutItem'],
                    resources: [
                        `arn:aws:dynamodb:${ENVIRONMENT.region}:${ENVIRONMENT.account}:table/${props.tableName}`,
                    ],
                }),
            ],
            force: true,
        });
    }

    /** Get IAM policy */
    getIamPolicy() {
        return this.iamPolicy;
    }
}
