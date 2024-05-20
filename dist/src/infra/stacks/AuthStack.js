"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_cognito_1 = require("aws-cdk-lib/aws-cognito");
class AuthStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        this.userPool = this.createUserPool();
        this.userPoolClient = this.createUserPoolClient();
    }
    createUserPool() {
        const userPool = new aws_cognito_1.UserPool(this, "shirinAIUserPool", {
            selfSignUpEnabled: true,
            signInAliases: {
                username: true,
                email: true,
            },
        });
        new aws_cdk_lib_1.CfnOutput(this, "shirinAIUserPoolId", {
            value: userPool.userPoolId,
        });
        return userPool;
    }
    createUserPoolClient() {
        const userPoolClient = this.userPool.addClient("shirinAIUserPoolClient", {
            authFlows: {
                adminUserPassword: true,
                custom: true,
                userPassword: true,
                userSrp: true,
            },
        });
        new aws_cdk_lib_1.CfnOutput(this, 'shirinAIUserPoolClient', {
            value: userPoolClient.userPoolClientId
        });
        return userPoolClient;
    }
}
exports.AuthStack = AuthStack;
