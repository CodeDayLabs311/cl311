import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ENVIRONMENT } from '../core/constants';
import { BaseStackProps, Stage } from '../core/types';
import { MessagesTableStack, NextJsStack } from '../stacks';

export type ApplicationStageProps = BaseStackProps;

export class ApplicationStage extends cdk.Stage {
    constructor(scope: Construct, id: string, props: ApplicationStageProps) {
        super(scope, id, props);

        if (props.stage === 'staging' || props.stage === 'prod') {
            // Create NextJS stack only for staging and prod
            // Devs use local web servers
            const nextJsStack = new NextJsStack(
                this,
                `NextJsStack-${props.stage}-${props.tenant}`,
                {
                    stage: props.stage,
                    tenant: props.tenant,
                    env: ENVIRONMENT,
                }
            );
        }

        const messagesTableStack = new MessagesTableStack(
            this,
            `MessagesTableStack-${props.stage}-${props.tenant}`,
            {
                stage: props.stage,
                tenant: props.tenant,
                env: ENVIRONMENT,
            }
        );
    }
}
