import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { PipelineStack } from './stacks';
import { ApplicationStage } from './stages';
import { Stage } from './types';

const STAGES: Stage[] = ['dev'];
// const STAGES: Stage[] = ['gamma', 'prod'];

export class InfraCdkStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const pipelineStack = new PipelineStack(scope, 'Pipeline');
        const pipeline = pipelineStack.getPipeline();

        STAGES.forEach((stage) => {
            pipeline.addStage(new ApplicationStage(scope, `ApplicationStage-${stage}`, { stage }));
        });
    }
}
