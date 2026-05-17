import { Response } from "express";
import { ParseTaskUseCase } from "../use-cases/task/parse-task.use-case";
import { OkResponse } from "../utils/api.response";
import { AuthenticatedRequest } from "../types/auth.types";

export class AIController {
    constructor(
        private parseTaskUseCase: ParseTaskUseCase
    ) { }

    parseTask = async (req: AuthenticatedRequest, res: Response) => {
        const { prompt, currentDate } = req.body;

        const parsedTask = await this.parseTaskUseCase.execute(prompt, currentDate);
        new OkResponse("Task parsed successfully", parsedTask).send(res);
    }
}
