import { App } from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStack";
import { LambdaStack } from "./stacks/lambdaStack";
import { GatewayStack } from "./stacks/GatewayStack";

const app = new App();
const dataStack = new DataStack(app, "DataStack");
const lambdaStack = new LambdaStack(app, "LambdaStack", {
  shirinAITable: dataStack.shirinAITable,
});
new GatewayStack(app, "GatewayStack", {
  helloLambdaIntegration: lambdaStack.helloLambdaIntegration,
})
