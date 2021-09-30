import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as path from "path";
import * as iam from '@aws-cdk/aws-iam';


export class LambdaContainerCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const sampleFunction = new lambda.DockerImageFunction(this, 'sampleFunction', {
      functionName: 'cdkSampleFunction',
      code: lambda.DockerImageCode.fromImageAsset(path.join(__dirname, '../src'), {
        cmd: ['index.handler']
      })
    })

    const cloudWatchLogsPolicyPolicy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
      ]
    });

    cloudWatchLogsPolicyPolicy.addAllResources();

    sampleFunction.addToRolePolicy(cloudWatchLogsPolicyPolicy);
  }

}
