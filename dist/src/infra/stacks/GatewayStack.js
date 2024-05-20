"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
class GatewayStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const api = new aws_apigateway_1.RestApi(this, "shirinAIApi");
        const authorizer = new aws_apigateway_1.CognitoUserPoolsAuthorizer(this, "ShirinApiAuthorizer", {
            cognitoUserPools: [props.userPool],
            identitySource: 'method.request.header.Authorization',
        });
        authorizer._attachToApi(api);
        const optionsWithAuth = {
            authorizationType: aws_apigateway_1.AuthorizationType.COGNITO,
            authorizer: {
                authorizerId: authorizer.authorizerId
            }
        };
        const shirinResource = api.root.addResource("shirinAI");
        shirinResource.addMethod("GET", props.helloLambdaIntegration, optionsWithAuth);
        shirinResource.addMethod("POST", props.helloLambdaIntegration, optionsWithAuth);
        shirinResource.addMethod("PATCH", props.helloLambdaIntegration, optionsWithAuth);
        shirinResource.addMethod("DELETE", props.helloLambdaIntegration, optionsWithAuth);
    }
}
exports.GatewayStack = GatewayStack;
