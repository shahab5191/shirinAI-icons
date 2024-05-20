"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const auth_1 = require("@aws-amplify/auth");
const aws_amplify_1 = require("aws-amplify");
aws_amplify_1.Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: "us-west-2_tzdrrBUIc",
            userPoolClientId: "7du12s1aedl3s74ki5klimoaph",
        },
    },
});
class AuthService {
    async login(username, password) {
        try {
            const { isSignedIn, nextStep } = await (0, auth_1.signIn)({
                username,
                password,
                options: {
                    authFlowType: "USER_PASSWORD_AUTH",
                },
            });
            console.log(isSignedIn);
            return isSignedIn;
        }
        catch (error) {
            console.log("error sign in", error.underlyingError);
        }
    }
    async currentAuthecticatedUser() {
        try {
            const { username, userId, signInDetails } = await (0, auth_1.getCurrentUser)();
            console.log({
                username,
                userId,
                signInDetails,
            });
            return username;
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.AuthService = AuthService;
