"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_cdk_lib_1 = require("aws-cdk-lib");
const DataStack_1 = require("./stacks/DataStack");
const lambdaStack_1 = require("./stacks/lambdaStack");
const GatewayStack_1 = require("./stacks/GatewayStack");
const AuthStack_1 = require("./stacks/AuthStack");
const app = new aws_cdk_lib_1.App();
const dataStack = new DataStack_1.DataStack(app, "DataStack");
const lambdaStack = new lambdaStack_1.LambdaStack(app, "LambdaStack", {
    shirinAITable: dataStack.shirinAITable,
});
new AuthStack_1.AuthStack(app, 'AuthStack');
new GatewayStack_1.GatewayStack(app, "GatewayStack", {
    helloLambdaIntegration: lambdaStack.helloLambdaIntegration,
});
