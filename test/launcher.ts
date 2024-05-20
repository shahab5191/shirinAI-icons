import { handler } from "../src/services/icon-gen";

process.env.TABLE_NAME = "shiriAIStack-065b769e61e5"
process.env.AWS_REGION = "us-west-2"

handler(
    {
        httpMethod: "GET",
        body: JSON.stringify({
            test: "test",
        }),
        queryStringParameters: {
            id: "fe9e3465-917d-4c7a-81ce-d4ee2e659ec2"
        }
    } as any,
    {} as any
);
