"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const icon_gen_1 = require("../src/services/icon-gen");
process.env.TABLE_NAME = "shiriAIStack-065b769e61e5";
process.env.AWS_REGION = "us-west-2";
(0, icon_gen_1.handler)({
    httpMethod: "GET",
    body: JSON.stringify({
        test: "test",
    }),
    queryStringParameters: {
        id: "fe9e3465-917d-4c7a-81ce-d4ee2e659ec2"
    }
}, {});
