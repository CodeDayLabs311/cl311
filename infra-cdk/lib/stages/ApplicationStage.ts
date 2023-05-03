import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ENVIRONMENT } from '../core/constants';
import { Stage } from '../core/types';
import { MessagesTableStack, NextJsStack } from '../stacks';

export type ApplicationStageProps = {
    stage: Stage;
} & cdk.StageProps;

export class ApplicationStage extends cdk.Stage {
    constructor(scope: Construct, id: string, props: ApplicationStageProps) {
        super(scope, id, props);

        const nextJsStack = new NextJsStack(this, `NextJsStack-${props.stage}`, {
            stage: props.stage,
            env: ENVIRONMENT,
        });

        const messagesTableStack = new MessagesTableStack(
            this,
            `MessagesTableStack-${props.stage}`,
            {
                stage: props.stage,
                env: ENVIRONMENT,
            }
        );
    }
}
