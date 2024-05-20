"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LambdaStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
const aws_iam_1 = require("aws-cdk-lib/aws-iam");
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
const aws_lambda_nodejs_1 = require("aws-cdk-lib/aws-lambda-nodejs");
const path_1 = require("path");
class LambdaStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const helloLambda = new aws_lambda_nodejs_1.NodejsFunction(this, "HelloLambda", {
            runtime: aws_lambda_1.Runtime.NODEJS_20_X,
            handler: "handler",
            entry: (0, path_1.join)(__dirname, "..", "..", "services", "icon-gen.js"),
            environment: {
                TABLE_NAME: props.shirinAITable.tableName,
            },
        });
        helloLambda.addToRolePolicy(new aws_iam_1.PolicyStatement({
            effect: aws_iam_1.Effect.ALLOW,
            actions: [
                'Dynamodb:PutItem',
                'Dynamodb:DeleteItem',
                'Dynamodb:UpdateItem',
                'Dynamodb:Scan'
            ],
            resources: [props.shirinAITable.tableArn],
        }));
        this.helloLambdaIntegration = new aws_apigateway_1.LambdaIntegration(helloLambda);
    }
}
exports.LambdaStack = LambdaStack;
