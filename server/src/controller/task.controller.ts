import { Response } from "express";
import { TaskService } from "../services/task.service";
import { CreatedResponse } from "../utils/api.response";
import { AuthenticatedRequest } from "../types/auth.types";

export class TaskController {
    constructor(
        private taskService: TaskService
    ) { }

    createTask = async (req: AuthenticatedRequest, res: Response) => {
        const { mobileNo } = req.user;

        const newTask = await this.taskService.createTask(req.body, mobileNo);
        new CreatedResponse("Task created successfully", newTask).send(res);
    }
}