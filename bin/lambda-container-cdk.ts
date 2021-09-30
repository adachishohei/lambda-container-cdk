#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { LambdaContainerCdkStack } from '../lib/lambda-container-cdk-stack';

const app = new cdk.App();
new LambdaContainerCdkStack(app, 'LambdaContainerCdkStack');
