import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { UserPool, UserPoolClient } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

export class AuthStack extends Stack {
  private userPool: UserPool;
  private userPoolClient: UserPoolClient;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.userPool = this.createUserPool();
    this.userPoolClient = this.createUserPoolClient();
  }

  private createUserPool() {
    const userPool = new UserPool(this, "shirinAIUserPool", {
      selfSignUpEnabled: true,
      signInAliases: {
        username: true,
        email: true,
      },
    });

    new CfnOutput(this, "shirinAIUserPoolId", {
      value: userPool.userPoolId,
    });

    return userPool
  }

  private createUserPoolClient() {
    const userPoolClient = this.userPool.addClient("shirinAIUserPoolClient", {
      authFlows: {
        adminUserPassword: true,
        custom: true,
        userPassword: true,
        userSrp: true,
      },
    });

    new CfnOutput(this, 'shirinAIUserPoolClient', {
      value: userPoolClient.userPoolClientId
    })

    return userPoolClient
  }
}
