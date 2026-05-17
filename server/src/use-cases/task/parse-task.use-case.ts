import { AIService } from "../../services/ai.service";
import { ParsedTask } from "../../interfaces/ai.interface";

export class ParseTaskUseCase {
    constructor(private aiService: AIService) { }

    async execute(prompt: string, currentDate: string): Promise<ParsedTask> {
        return await this.aiService.parseTask(prompt, currentDate);
    }
}
