import { signIn, getCurrentUser, AuthError } from "@aws-amplify/auth";
import { Amplify } from "aws-amplify";

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: "us-west-2_tzdrrBUIc",
            userPoolClientId: "7du12s1aedl3s74ki5klimoaph",
        },
    },
});

export class AuthService {
    public async login(username: string, password: string) {
        try {
            const { isSignedIn, nextStep } = await signIn({
                username,
                password,
                options: {
                    authFlowType: "USER_PASSWORD_AUTH",
                },
            });
            console.log(isSignedIn);
            return isSignedIn;
        } catch (error: any) {
            console.log("error sign in", error.underlyingError);
        }
    }

    public async currentAuthecticatedUser() {
        try {
            const { username, userId, signInDetails } = await getCurrentUser();
            console.log({
                username,
                userId,
                signInDetails,
            });
            return username;
        } catch (error) {
            console.log(error);
        }
    }
}
