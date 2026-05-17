export interface ParsedTask {
  title: string;
  description?: string;
  endDate: string;
}

export interface AIProvider {
  parseTask(prompt: string, currentDate: string): Promise<ParsedTask>;
}
