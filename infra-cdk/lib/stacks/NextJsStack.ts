import * as cdk from 'aws-cdk-lib';
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

        new Nextjs(this, `NextJs-${props.stage}`, {
            nextjsPath: NEXTJS_PATH,
            environment: ENVIRONMENT,
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
