import z from "zod";

//===SCHEMAS===
export const createTaskSchema = z.object({
  title: z.string({
    error: (issue) => issue.input === undefined ? 'Title is required' : 'Invalid type'
  }),
  description: z.string({
    error: (issue) => issue.input === undefined ? 'Description is required' : 'Invalid type'
  }).optional(),
  endDate: z.string({
    error: (issue) =>
      issue.input === undefined
        ? "End Date is required"
        : "Invalid type",
  }),
  status: z.enum(["pending", "completed"], {
    error: (issue) => issue.input === undefined ? 'Status is required' : 'Invalid type'
  }).default("pending").optional(),
});

//===TYPES===
export type CreateTaskInput = z.infer<typeof createTaskSchema>;