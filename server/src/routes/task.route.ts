import { Router } from "express";
import { MongoTaskRepository } from "../repositories/task.repository";
import { TaskService } from "../services/task.service";
import { TaskController } from "../controller/task.controller";
import { validateBody } from "../middleware/request.validator";
import { createTaskSchema } from "../validators/task.validator";
import { ClockService } from "../services/time.service";
import { authenticate } from "../middleware/authenticate.middleware";
import { JwtTokenService } from "../services/token.service";
import { asyncHandler } from "../utils/api.handler";

export const taskRoute = Router()

//===DEPENDENCIES===
const taskRepository = new MongoTaskRepository();
const timeService = new ClockService();
const tokenService = new JwtTokenService();
const taskService = new TaskService(taskRepository, timeService);
const taskController = new TaskController(taskService);

//===ROUTES===
taskRoute.post(
    '/create',
    authenticate(tokenService), 
    validateBody(createTaskSchema), 
    asyncHandler(taskController.createTask)
);


