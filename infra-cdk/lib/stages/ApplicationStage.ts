import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ENVIRONMENT } from '../core/constants';
import { Stage, Tenant } from '../core/enums';
import { BaseStackProps } from '../core/types';
import { DevIAMStack, IAMStack, MessagesTableStack, NextJsStack } from '../stacks';

export type ApplicationStageProps = BaseStackProps;

export class ApplicationStage extends cdk.Stage {
    constructor(scope: Construct, id: string, props: ApplicationStageProps) {
        super(scope, id, props);

        const baseStackProps: BaseStackProps = {
            stage: props.stage,
            tenant: props.tenant,
            env: ENVIRONMENT,
        };

        // DynamoDB table storing guest book messages
        const messagesTableStack = new MessagesTableStack(
            this,
            `MessagesTableStack-${props.stage}-${props.tenant}`,
            {
                ...baseStackProps,
            }
        );

        // IAM policy stack to grant permissions to DynamoDB table and other AWS services
        const iamStack = new IAMStack(this, `IAMStack-${props.stage}-${props.tenant}`, {
            tableName: messagesTableStack.getTableName(),
            ...baseStackProps,
        });

        if (props.stage !== Stage.DEV) {
            // S3 bucket, CloudFront distribution, Lambda function to host NextJS site
            // Only for beta and prod, as devs use local web servers
            const nextJsStack = new NextJsStack(
                this,
                `NextJsStack-${props.stage}-${props.tenant}`,
                {
                    iamPolicy: iamStack.getIamPolicy(),
                    ...baseStackProps,
                }
            );
        }

        if (props.tenant === Tenant.ANDREY) {
            new DevIAMStack(this, `DevIAMStack-${props.stage}-${props.tenant}`, {
                applicationPolicy: iamStack.getIamPolicy(),
                ...baseStackProps,
            });
        }
    }
}
