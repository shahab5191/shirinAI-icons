"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("./auth-service");
async function testAuth() {
    const service = new auth_service_1.AuthService();
    const loginResult = await service.login("shahab5191", "Gorgi@5191");
    console.log(loginResult);
}
testAuth();
