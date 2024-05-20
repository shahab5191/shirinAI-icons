"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
class GatewayStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const api = new aws_apigateway_1.RestApi(this, 'shirinAIApi');
        const shirinResource = api.root.addResource('shirinAI');
        shirinResource.addMethod('GET', props.helloLambdaIntegration);
        shirinResource.addMethod('POST', props.helloLambdaIntegration);
        shirinResource.addMethod('PATCH', props.helloLambdaIntegration);
        shirinResource.addMethod('DELETE', props.helloLambdaIntegration);
    }
}
exports.GatewayStack = GatewayStack;
