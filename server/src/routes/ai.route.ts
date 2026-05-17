import { Router } from "express";
import { AIController } from "../controller/ai.controller";
import { ParseTaskUseCase } from "../use-cases/task/parse-task.use-case";
import { AIService } from "../services/ai.service";
import { GeminiAIProvider } from "../providers/gemini.provider";
import { validateBody } from "../middleware/request.validator";
import { parseTaskSchema } from "../validators/ai.validator";
import { JwtTokenService } from "../services/token.service";
import { asyncHandler } from "../utils/api.handler";
import { authentication } from "../middleware/authenticate.middleware";
import { rateLimiter } from "../middleware/ratelimiter.middleware";
import { env } from "../config/env";

export const aiRoute = Router();

//===DEPENDENCIES===
const tokenService = new JwtTokenService();
const geminiProvider = new GeminiAIProvider(env.GEMINI_API_KEY);
const aiService = new AIService(geminiProvider);

// Use Cases
const parseTaskUseCase = new ParseTaskUseCase(aiService);

// Controller
const aiController = new AIController(parseTaskUseCase);

//===ROUTES===
aiRoute.post(
    '/parse-task',
    authentication(tokenService),
    rateLimiter({
        windowMs: 60 * 1000, // 1 minute window
        max: 5,              // Limit each IP to 5 requests per windowMs
        message: "You have exceeded the limit of 5 AI task parses per minute. Please try again soon."
    }),
    validateBody(parseTaskSchema),
    asyncHandler(aiController.parseTask)
);

