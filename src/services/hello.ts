import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";

const s3Client = new S3Client({});

async function handler(event: APIGatewayProxyEvent, context: Context) {
  const command = new ListBucketsCommand({});
  const listBucketResult = (await s3Client.send(command)).Buckets;

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(
      `Hello from lambda, here are your buckets: + ${JSON.stringify(listBucketResult)}`
    ),
  };

  console.log(event);

  return response;
}

export { handler };
