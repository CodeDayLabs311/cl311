import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { Stage, Tenant } from '../core/enums';
import { BaseStackProps } from '../core/types';

const BASE_TABLE_NAME = 'S3Bucket';

export class S3BucketStack extends cdk.Stack{
    public readonly bucket: s3.Bucket;
    private stage: Stage;
    private tenant: Tenant;

    constructor(scope: Construct, id: string, props: BaseStackProps) {
        super(scope, id, props);

        this.stage = props.stage;
        this.tenant = props.tenant;

        this.bucket = new s3.Bucket(this,  `MessagesTable-${props.stage}-${props.tenant}`,{
            bucketName: this.getBucketName(),
            publicReadAccess: false,
            removalPolicy: cdk.RemovalPolicy.RETAIN
        });
    }

    /** Get S3 Bucket name */
    getBucketName(): string {
        return `${BASE_TABLE_NAME}-${this.stage}-${this.tenant}`;
    }
}
