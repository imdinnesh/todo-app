import { Router } from "express";
import { MongoTaskRepository } from "../repositories/task.repository";
import { TaskController } from "../controller/task.controller";
import { CreateTaskUseCase } from "../use-cases/task/create-task.use-case";
import { validateBody } from "../middleware/request.validator";
import { createTaskSchema } from "../validators/task.validator";
import { JwtTokenService } from "../services/token.service";
import { asyncHandler } from "../utils/api.handler";
import { ClockService } from "../services/time.service";
import { authentication } from "../middleware/authenticate.middleware";
import { authorisation } from "../middleware/authorisation.middleware";
import { FetchTasksUseCase } from "../use-cases/task/fetch-task.use-case";
import { UpdateTaskUseCase } from "../use-cases/task/update-task.use-case";

export const taskRoute = Router()

//===DEPENDENCIES===
const taskRepository = new MongoTaskRepository();
const tokenService = new JwtTokenService();
const timeService = new ClockService();

// Use Cases
const createTaskUseCase = new CreateTaskUseCase(taskRepository, timeService);
const fetchTasksUseCase = new FetchTasksUseCase(taskRepository);
const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);

// Controller
const taskController = new TaskController(createTaskUseCase, fetchTasksUseCase,updateTaskUseCase);

//===ROUTES===
taskRoute.post(
    '/create',
    authentication(tokenService),
    validateBody(createTaskSchema),
    asyncHandler(taskController.createTask)
);

taskRoute.get(
    '/fetch',
    authentication(tokenService),
    authorisation('admin', 'user'),
    asyncHandler(taskController.fetchTasksByMobileNo)
);

taskRoute.get(
    '/fetch/all',
    authentication(tokenService),
    authorisation('admin'),
    asyncHandler(taskController.fetchAllTasks)
);

taskRoute.put(
    '/update/:taskId',
    authentication(tokenService),
    authorisation('admin', 'user'),
    asyncHandler(taskController.updateTask)
);

