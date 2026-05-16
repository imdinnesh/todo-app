import { Response } from "express";
import { CreateTaskUseCase } from "../use-cases/create-task.use-case";
import { CreatedResponse } from "../utils/api.response";
import { AuthenticatedRequest } from "../types/auth.types";

export class TaskController {
    constructor(
        private createTaskUseCase: CreateTaskUseCase
    ) { }

    createTask = async (req: AuthenticatedRequest, res: Response) => {
        const { mobileNo } = req.user;

        const newTask = await this.createTaskUseCase.execute(req.body, mobileNo);
        new CreatedResponse("Task created successfully", newTask).send(res);
    }
}