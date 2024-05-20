"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const util_dynamodb_1 = require("@aws-sdk/util-dynamodb");
const uuid_1 = require("uuid");
const ddbClient = new client_dynamodb_1.DynamoDBClient({});
async function handler(event, context) {
    let message = "";
    switch (event.httpMethod) {
        case "GET":
            const get_result = await ddbClient.send(new client_dynamodb_1.ScanCommand({
                TableName: process.env.TABLE_NAME,
            }));
            const items = [];
            if (get_result.Items) {
                for (let index in get_result.Items) {
                    items.push((0, util_dynamodb_1.unmarshall)(get_result.Items[index]));
                }
            }
            message = `GET method recieved! ${JSON.stringify(items)}`;
            break;
        case "POST":
            const randomId = (0, uuid_1.v4)();
            const result = await ddbClient.send(new client_dynamodb_1.PutItemCommand({
                TableName: process.env.TABLE_NAME,
                Item: (0, util_dynamodb_1.marshall)({
                    id: randomId,
                    test: "hello test 2",
                }),
            }));
            console.log(result.$metadata.httpStatusCode);
            message = `Item ${randomId} created successfully!`;
            break;
        case "PATCH":
            if (!(event.queryStringParameters &&
                "id" in event.queryStringParameters &&
                event.body)) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({
                        error: "Bad request!",
                    }),
                };
            }
            const id = event.queryStringParameters["id"];
            const json_body = JSON.parse(event.body);
            if (!("test" in json_body)) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({
                        error: "Bad request!",
                    }),
                };
            }
            const test = json_body["test"];
            const patch_result = await ddbClient.send(new client_dynamodb_1.UpdateItemCommand({
                TableName: process.env.TABLE_NAME,
                Key: {
                    id: { S: id },
                },
                UpdateExpression: "set #zzzNew = :new",
                ExpressionAttributeValues: {
                    ":new": {
                        S: test,
                    },
                },
                ExpressionAttributeNames: {
                    "#zzzNew": "test",
                },
                ReturnValues: "UPDATED_NEW",
            }));
            message = `Item with id: ${id} updated to ${patch_result.Attributes}`;
            break;
        case "DELETE":
            if (!(event.queryStringParameters && "id" in event.queryStringParameters)) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({
                        error: "Bad request!",
                    }),
                };
            }
            const deleteId = event.queryStringParameters["id"];
            const deleteResult = await ddbClient.send(new client_dynamodb_1.DeleteItemCommand({
                TableName: process.env.TABLE_NAME,
                Key: {
                    id: { S: deleteId },
                },
            }));
            console.log(deleteResult.$metadata.httpStatusCode);
            message = `Item ${deleteId} deleted successfully!`;
            break;
        default:
            break;
    }
    const response = {
        statusCode: 200,
        body: JSON.stringify(message),
    };
    return response;
}
exports.handler = handler;
