import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ENVIRONMENT } from '../core/constants';
import { Stage } from '../core/enums';
import { BaseStackProps } from '../core/types';
import { IAMStack, MessagesTableStack, NextJsStack } from '../stacks';

export type ApplicationStageProps = BaseStackProps;

export class ApplicationStage extends cdk.Stage {
    constructor(scope: Construct, id: string, props: ApplicationStageProps) {
        super(scope, id, props);

        const baseStackProps: BaseStackProps = {
            stage: props.stage,
            tenant: props.tenant,
            env: ENVIRONMENT,
        };

        // Guestbook messages DynamoDB stack
        const messagesTableStack = new MessagesTableStack(
            this,
            `MessagesTableStack-${props.stage}-${props.tenant}`,
            {
                ...baseStackProps,
            }
        );

        // IAM permissions stack
        const iamStack = new IAMStack(this, `IAMStack-${props.stage}-${props.tenant}`, {
            tableName: messagesTableStack.getTableName(),
            ...baseStackProps,
        });

        if (props.stage !== Stage.DEV) {
            // NextJS web server stack only for beta and prod, as devs use local web servers
            const nextJsStack = new NextJsStack(
                this,
                `NextJsStack-${props.stage}-${props.tenant}`,
                {
                    iamPolicy: iamStack.getIamPolicy(),
                    ...baseStackProps,
                }
            );
        }
    }
}
