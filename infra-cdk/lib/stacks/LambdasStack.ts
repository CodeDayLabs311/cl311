import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import { Construct } from 'constructs';
import { Stage } from '../core/types';

export type LambdasStackProps = {
    stage: Stage;
} & cdk.StackProps;

export class LambdasStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: LambdasStackProps) {
        super(scope, id, props);

        // Create Lambda function
        const lambdaFn = new lambda.Function(this, 'HelloWorldFunction', {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: 'index.handler',
            code: lambda.Code.fromAsset(path.join(__dirname, 'lambda')),
        });

        // Add environment variable to Lambda function
        lambdaFn.addEnvironment('MESSAGE', 'Hello, world!');

        // Output the Lambda function ARN
        new cdk.CfnOutput(this, 'LambdaFunctionArn', {
            value: lambdaFn.functionArn,
        });
    }
}
