"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_dynamodb_1 = require("aws-cdk-lib/aws-dynamodb");
const utils_1 = require("../utils");
class DataStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const suffix = (0, utils_1.getSuffixFromStack)(this);
        this.shirinAITable = new aws_dynamodb_1.Table(this, "ConversationTable", {
            partitionKey: {
                name: "id",
                type: aws_dynamodb_1.AttributeType.STRING,
            },
            tableName: `shiriAIStack-${suffix}`,
        });
    }
}
exports.DataStack = DataStack;
