import { AIProvider, ParsedTask } from "../interfaces/ai.interface";

export class AIService {
    constructor(private provider: AIProvider) { }

    async parseTask(prompt: string, currentDate: string): Promise<ParsedTask> {
        return this.provider.parseTask(prompt, currentDate);
    }
}