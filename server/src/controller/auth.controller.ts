import { Request, Response } from "express";
import { SignupOrchestrator } from "../orchestrators/signup.orchestrator";
import { AuthService } from "../services/auth.service";
import { CreatedResponse, SuccessResponse } from "../utils/api.response";

export class AuthController {
    constructor(
        private signupOrchestrator: SignupOrchestrator,
        private authService: AuthService
    ) {}

    //===SIGNUP===
    signup = async (req: Request, res: Response) => {
        const newUser = await this.signupOrchestrator.execute(req.body);
        new CreatedResponse("User registered successfully", newUser).send(res);
    };

    //===LOGIN===
    login = async (req: Request, res: Response) => {
        const result = await this.authService.login(req.body);
        new SuccessResponse("User logged in successfully", {
            accessToken: result.token
        }).send(res);
    };
    
}