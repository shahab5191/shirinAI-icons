import {
  DeleteItemCommand,
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  ScanCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { unmarshall, marshall } from "@aws-sdk/util-dynamodb";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { v4 } from "uuid";

const ddbClient = new DynamoDBClient({});

async function handler(event: APIGatewayProxyEvent, context: Context) {
  let message: string = "";
  switch (event.httpMethod) {
    case "GET":
      const get_result = await ddbClient.send(
        new ScanCommand({
          TableName: process.env.TABLE_NAME,
        })
      );
      const items: any[] = []
      if (get_result.Items) {
        for (let index in get_result.Items) {
          items.push(unmarshall(get_result.Items[index]));
        }
      }
      message = `GET method recieved! ${JSON.stringify(items)}`;
      break;

    case "POST":
      const randomId = v4();
      const result = await ddbClient.send(
        new PutItemCommand({
          TableName: process.env.TABLE_NAME,
          Item: marshall({
            id: randomId,
            test: "hello test 2",
          }),
        })
      );
      console.log(result.$metadata.httpStatusCode);
      message = `Item ${randomId} created successfully!`;
      break;

    case "PATCH":
      if (
        !(
          event.queryStringParameters &&
          "id" in event.queryStringParameters &&
          event.body
        )
      ) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            error: "Bad request!",
          }),
        };
      }
      const id: string = event.queryStringParameters["id"] as string;
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
      const patch_result = await ddbClient.send(
        new UpdateItemCommand({
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
        })
      );
      message = `Item with id: ${id} updated to ${patch_result.Attributes}`;
      break;
    case "DELETE":
      if (
        !(event.queryStringParameters && "id" in event.queryStringParameters)
      ) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            error: "Bad request!",
          }),
        };
      }
      const deleteId: string = event.queryStringParameters["id"] as string;
      const deleteResult = await ddbClient.send(
        new DeleteItemCommand({
          TableName: process.env.TABLE_NAME,
          Key: {
            id: { S: deleteId },
          },
        })
      );
      console.log(deleteResult.$metadata.httpStatusCode);
      message = `Item ${deleteId} deleted successfully!`;
      break;
    default:
      break;
  }
  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(message),
  };

  return response;
}

export { handler };
