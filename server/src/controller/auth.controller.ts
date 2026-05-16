import { Request, Response } from "express";
import { SignupUseCase } from "../use-cases/signup.use-case";
import { LoginUseCase } from "../use-cases/login.use-case";
import { CreatedResponse, SuccessResponse } from "../utils/api.response";

export class AuthController {
    constructor(
        private signupUseCase: SignupUseCase,
        private loginUseCase: LoginUseCase
    ) {}

    //===SIGNUP===
    signup = async (req: Request, res: Response) => {
        const newUser = await this.signupUseCase.execute(req.body);
        new CreatedResponse("User registered successfully", newUser).send(res);
    };

    //===LOGIN===
    login = async (req: Request, res: Response) => {
        const result = await this.loginUseCase.execute(req.body);
        new SuccessResponse("User logged in successfully", {
            accessToken: result.token,
            user: result.user
        }).send(res);
    };
    
}