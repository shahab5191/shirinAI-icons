import { Stack, StackProps } from "aws-cdk-lib";
import {
    AuthorizationType,
  CognitoUserPoolsAuthorizer,
  LambdaIntegration,
  MethodOptions,
  RestApi,
} from "aws-cdk-lib/aws-apigateway";
import { IUserPool } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

interface ApiStackProps extends StackProps {
  helloLambdaIntegration: LambdaIntegration;
  userPool: IUserPool;
}

export class GatewayStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);
    const api = new RestApi(this, "shirinAIApi");

    const authorizer = new CognitoUserPoolsAuthorizer(
      this,
      "ShirinApiAuthorizer",
      {
        cognitoUserPools: [props.userPool],
        identitySource: 'method.request.header.Authorization',
      }
    );
    authorizer._attachToApi(api)

    const optionsWithAuth: MethodOptions = {
      authorizationType: AuthorizationType.COGNITO,
      authorizer: {
        authorizerId: authorizer.authorizerId
      }
    }

    const shirinResource = api.root.addResource("shirinAI");
    shirinResource.addMethod("GET", props.helloLambdaIntegration, optionsWithAuth);
    shirinResource.addMethod("POST", props.helloLambdaIntegration, optionsWithAuth);
    shirinResource.addMethod("PATCH", props.helloLambdaIntegration, optionsWithAuth);
    shirinResource.addMethod("DELETE", props.helloLambdaIntegration, optionsWithAuth);
  }
}
