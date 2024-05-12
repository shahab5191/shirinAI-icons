import { Stack, StackProps } from "aws-cdk-lib";
import { AttributeType, ITable, Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { getSuffixFromStack } from "../utils";

export class DataStack extends Stack {

  public readonly shirinAITable: ITable

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    
    const suffix = getSuffixFromStack(this);

    this.shirinAITable = new Table(this, "ConversationTable", {
      partitionKey: {
        name: "id",
        type: AttributeType.STRING,
      },
      tableName: `shiriAIStack-${suffix}`,
    });
  }
}
