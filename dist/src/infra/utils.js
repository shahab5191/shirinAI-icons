"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSuffixFromStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
function getSuffixFromStack(stack) {
    const shortStackId = aws_cdk_lib_1.Fn.select(2, aws_cdk_lib_1.Fn.split("/", stack.stackId));
    const suffix = aws_cdk_lib_1.Fn.select(4, aws_cdk_lib_1.Fn.split("-", shortStackId));
    return suffix;
}
exports.getSuffixFromStack = getSuffixFromStack;
