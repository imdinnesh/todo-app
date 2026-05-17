import { GoogleGenAI } from "@google/genai";
import { AIProvider, ParsedTask } from "../interfaces/ai.interface";
import { InternalServerError } from "../utils/api.error";

export class GeminiAIProvider implements AIProvider {
  private ai: GoogleGenAI;

  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({ apiKey });
  }

  async parseTask(prompt: string, currentDate: string): Promise<ParsedTask> {
    try {
      const promptText = `
You are an expert assistant designed to parse a natural language todo task input into a structured format.
Today's date is: ${currentDate}.

Analyze the user prompt: "${prompt}"

Your goal is to extract:
1. "title": A concise, clear summary of the action/task.
2. "description": Extra details, context, or instructions if provided (otherwise return an empty string).
3. "endDate": The computed target date for completing this task. Analyze relative time expressions like "tomorrow", "next Friday", "in 3 days", "next month", etc., relative to today's date (${currentDate}). Always return this date in YYYY-MM-DD format. If no end date or time is mentioned or implied, default it to today's date (${currentDate}).

Please return the results strictly according to the defined JSON schema.
      `.trim();

      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: promptText,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              title: {
                type: "STRING",
                description: "Clean, concise title of the task"
              },
              description: {
                type: "STRING",
                description: "Detailed description of the task if present, otherwise empty"
              },
              endDate: {
                type: "STRING",
                description: "ISO date format (YYYY-MM-DD) representing the target end date calculated relative to today's date"
              }
            },
            required: ["title", "endDate"]
          }
        }
      });

      if (!response.text) {
        throw new Error("Empty response received from the generative model.");
      }

      const parsed: ParsedTask = JSON.parse(response.text.trim());
      return {
        title: parsed.title,
        description: parsed.description || "",
        endDate: parsed.endDate
      };

    } catch (error: any) {
      throw new InternalServerError("Failed to parse task using Gemini provider", error.message);
    }
  }
}
