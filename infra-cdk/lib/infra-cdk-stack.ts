import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { PipelineStack } from './stacks';
import { ApplicationStage } from './stages';
import { BaseStackConfig, Stage } from './core/types';
import { ENVIRONMENT } from './core/constants';
import { Tenant } from './core/enums';
import { Wave } from 'aws-cdk-lib/pipelines';

const WAVES: { waveId: string; stages: BaseStackConfig[] }[] = [
    {
        waveId: 'dev',
        stages: [
            {
                stage: 'dev',
                tenant: Tenant.ANDREY,
            },
            {
                stage: 'dev',
                tenant: Tenant.SOPHIE,
            },
        ],
    },
    {
        waveId: 'staging',
        stages: [
            {
                stage: 'staging',
                tenant: Tenant.PRIMARY,
            },
        ],
    },
    {
        waveId: 'prod',
        stages: [
            {
                stage: 'prod',
                tenant: Tenant.PRIMARY,
            },
        ],
    },
];

export class InfraCdkStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const pipelineStack = new PipelineStack(scope, 'Pipeline', {
            env: ENVIRONMENT,
        });
        const pipeline = pipelineStack.getPipeline();

        WAVES.forEach((waveDef) => {
            const wave = new Wave(`wave-${waveDef.waveId}`);
            waveDef.stages.forEach((stageDef) => {
                wave.addStage(
                    new ApplicationStage(
                        scope,
                        `ApplicationStage-${waveDef.waveId}-${stageDef.stage}-${stageDef.tenant}`,
                        {
                            stage: stageDef.stage,
                            tenant: stageDef.tenant,
                            env: ENVIRONMENT,
                        }
                    )
                );
            });
            pipeline.addWave(`wave-${waveDef.waveId}`, wave);
        });
    }
}
