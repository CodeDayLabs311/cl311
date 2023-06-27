import * as cdk from 'aws-cdk-lib';
import { Tenant } from '../enums';
import { Stage } from './Stage';

export type BaseStackConfig = {
    stage: Stage;
    tenant: Tenant;
};

export type BaseStackProps = BaseStackConfig & cdk.StackProps;
