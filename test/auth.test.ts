import { AuthService } from "./auth-service";

async function testAuth() {
    const service = new AuthService();
    const loginResult = await service.login({
        username: "shahab5191",
        password: "Gorgi@5191"
    });
    console.log(loginResult);
}

testAuth();
