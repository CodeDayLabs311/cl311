import * as cdk from 'aws-cdk-lib';
import { Stage } from './Stage';

export type BaseStackProps = {
    stage: Stage;
} & cdk.StackProps;
