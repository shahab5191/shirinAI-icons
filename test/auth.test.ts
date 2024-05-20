import { AuthService } from "./auth-service";

async function testAuth() {
    const service = new AuthService();
    const loginResult = await service.login("shahab5191", "Gorgi@5191")
    console.log(loginResult)
}


testAuth()
