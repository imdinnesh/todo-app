import z from "zod";

//===SCHEMAS===
export const parseTaskSchema = z.object({
  prompt: z.string({
    error: (issue) => issue.input === undefined ? 'Prompt is required' : 'Invalid type'
  }).min(1, 'Prompt cannot be empty'),
  currentDate: z.string({
    error: (issue) => issue.input === undefined ? 'Current Date is required' : 'Invalid type'
  }),
});


//===TYPES===
export type ParseTaskInput = z.infer<typeof parseTaskSchema>;
