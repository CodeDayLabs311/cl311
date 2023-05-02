import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CloudFrontStack, LambdasStack } from '../stacks';
import { Stage } from '../types';

export type ApplicationStageProps = {
    stage: Stage;
} & cdk.StageProps;

export class ApplicationStage extends cdk.Stage {
    constructor(scope: Construct, id: string, props: ApplicationStageProps) {
        super(scope, id, props);

        const cloudfrontStack = new CloudFrontStack(this, `CloudFrontStack-${props.stage}`, {
            stage: props.stage,
        });

        // const lambdasStack = new LambdasStack(scope, `LambdasStack-${props.stage}`, {
        //     stage: props.stage,
        // });
    }
}
