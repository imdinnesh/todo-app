import { Request, Response } from "express";
import { SignupOrchestrator } from "../orchestrators/signup.orchestrator";
import { CreatedResponse } from "../utils/api.response";

export class AuthController {
    constructor(private signupOrchestrator: SignupOrchestrator) {}

    //===SIGNUP===
    signup = async (req: Request, res: Response) => {

        const newUser = await this.signupOrchestrator.execute(req.body);

        new CreatedResponse("User registered successfully", newUser).send(res);
    };

    
}