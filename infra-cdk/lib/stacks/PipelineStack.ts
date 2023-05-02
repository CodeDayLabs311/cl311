import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import * as pipelines from 'aws-cdk-lib/pipelines';

const INFRA_DIRECTORY = 'infra-cdk';

export class PipelineStack extends cdk.Stack {
    private pipeline: pipelines.CodePipeline;
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        this.pipeline = new pipelines.CodePipeline(this, 'Pipeline', {
            pipelineName: 'CL311-Pipeline',
            synth: new pipelines.ShellStep('Synth', {
                input: pipelines.CodePipelineSource.gitHub('CodeDayLabs311/cl311', 'initial-setup'),
                commands: [`cd ${INFRA_DIRECTORY}`, 'npm ci', 'npm run build', 'npx cdk synth'],
                primaryOutputDirectory: `${INFRA_DIRECTORY}/cdk.out`,
            }),
        });
    }

    getPipeline(): pipelines.CodePipeline {
        return this.pipeline;
    }
}
