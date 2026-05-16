import { Router } from "express";
import { MongoTaskRepository } from "../repositories/task.repository";
import { TaskController } from "../controller/task.controller";
import { CreateTaskUseCase } from "../use-cases/create-task.use-case";
import { validateBody } from "../middleware/request.validator";
import { createTaskSchema } from "../validators/task.validator";
import { JwtTokenService } from "../services/token.service";
import { asyncHandler } from "../utils/api.handler";
import { authenticate } from "../middleware/authenticate.middleware";
import { ClockService } from "../services/time.service";

export const taskRoute = Router()

//===DEPENDENCIES===
const taskRepository = new MongoTaskRepository();
const tokenService = new JwtTokenService();
const timeService = new ClockService();

// Use Cases
const createTaskUseCase = new CreateTaskUseCase(taskRepository, timeService);

// Controller
const taskController = new TaskController(createTaskUseCase);

//===ROUTES===
taskRoute.post(
    '/create',
    authenticate(tokenService), 
    validateBody(createTaskSchema), 
    asyncHandler(taskController.createTask)
);
