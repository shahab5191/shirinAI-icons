import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

interface ApiStackProps extends StackProps{
  helloLambdaIntegration: LambdaIntegration
}

export class GatewayStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);
    const api = new RestApi(this, 'shirinAIApi')
    const shirinResource = api.root.addResource('shirinAI')
    shirinResource.addMethod('GET', props.helloLambdaIntegration)
    shirinResource.addMethod('POST', props.helloLambdaIntegration)
    shirinResource.addMethod('PATCH', props.helloLambdaIntegration)
    shirinResource.addMethod('DELETE', props.helloLambdaIntegration)
  }
}
