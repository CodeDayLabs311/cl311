import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Nextjs } from 'cdk-nextjs-standalone';
import { Construct } from 'constructs';
import { ENVIRONMENT } from '../core/constants';
import { BaseStackProps } from '../core/types';

/** Relative path to NextJS project root */
const NEXTJS_PATH = '../app';

export type NextJsStackProps = BaseStackProps;

export class NextJsStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: NextJsStackProps) {
        super(scope, id, props);

        const lambdaExecutionRole = new iam.Role(this, `LambdaExecutionRole-${props.stage}`, {
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
            roleName: `lambda-execution-role-${props.stage}`,
        });
        const dynamoDBReadPolicy = new iam.PolicyStatement({
            actions: ['dynamodb:Scan', 'dynamodb:GetItem'],
            resources: ['arn:aws:dynamodb:*:*:table/*'],
        });
        lambdaExecutionRole.addToPolicy(dynamoDBReadPolicy);

        new Nextjs(this, `NextJs-${props.stage}`, {
            nextjsPath: NEXTJS_PATH,
            environment: ENVIRONMENT,
            defaults: {
                lambda: {
                    role: lambdaExecutionRole,
                },
            },
            // defaults: {
            //     distribution: {
            //         customDomain: {
            //             domainName: 'cl311.org',
            //             hostedZone: 'cl311.org',
            //         },
            //     },
            // },
        });
    }
}
