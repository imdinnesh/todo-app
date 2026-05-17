import { Response } from "express";
import { CreateTaskUseCase } from "../use-cases/task/create-task.use-case";
import { CreatedResponse, OkResponse } from "../utils/api.response";
import { AuthenticatedRequest } from "../types/auth.types";
import { FetchTasksUseCase } from "../use-cases/task/fetch-task.use-case";
import { UpdateTaskUseCase } from "../use-cases/task/update-task.use-case";

export class TaskController {
    constructor(
        private createTaskUseCase: CreateTaskUseCase,
        private fetchTasksUseCase: FetchTasksUseCase,
        private updateTaskUseCase: UpdateTaskUseCase
    ) { }

    createTask = async (req: AuthenticatedRequest, res: Response) => {
        const { mobileNo } = req.user;

        const newTask = await this.createTaskUseCase.execute(req.body, mobileNo);
        new CreatedResponse("Task created successfully", newTask).send(res);
    }

    fetchTasksByMobileNo = async (req: AuthenticatedRequest, res: Response) => {
        const { mobileNo } = req.user;
        const tasks = await this.fetchTasksUseCase.fetchTasksByMobileNo(mobileNo);
        new OkResponse("Tasks fetched successfully", tasks, tasks.length).send(res);
    }

    fetchAllTasks = async (_req: AuthenticatedRequest, res: Response) => {
        const tasks = await this.fetchTasksUseCase.fetchAllTasks();
        new OkResponse("Tasks fetched successfully", tasks, tasks.length).send(res);
    }

    updateTask = async (req: AuthenticatedRequest, res: Response) => {
        const taskId = req.params.taskId as string;
        const { newTitle, newDescription } = req.body;
        await this.updateTaskUseCase.execute(taskId, newTitle, newDescription);
        new OkResponse("Task updated successfully").send(res);
    }
}