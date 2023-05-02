import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cf from 'aws-cdk-lib/aws-cloudfront';
import { Construct } from 'constructs';
import { Stage } from '../types';

const BUCKET_NAME_PREFIX = 'CodeDayLabs311';

export type CloudFrontStackProps = {
    stage: Stage;
} & cdk.StackProps;

export class CloudFrontStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: CloudFrontStackProps) {
        super(scope, id, props);

        // Create S3 bucket
        const bucket = new s3.Bucket(this, `${BUCKET_NAME_PREFIX}-${props.stage}`);

        // Create CloudFront distribution
        const distribution = new cf.CloudFrontWebDistribution(
            this,
            `CloudFrontWebDistribution-${props.stage}`,
            {
                originConfigs: [
                    {
                        s3OriginSource: {
                            s3BucketSource: bucket,
                        },
                        behaviors: [{ isDefaultBehavior: true }],
                    },
                ],
            }
        );

        // Output the CloudFront distribution domain name
        new cdk.CfnOutput(this, `DistributionDomainName-${props.stage}`, {
            value: distribution.distributionDomainName,
        });
    }
}
