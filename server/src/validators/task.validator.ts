import z from "zod";

// ---- Schemas
export const createTaskSchema = z.object({
  title: z.string(),

  description: z.string().optional(),

  endDate: z.coerce.date(),

  status: z.enum(["pending", "completed"]).optional().default("pending"),
});

// ---- Types
export type TCreateTask = z.infer<typeof createTaskSchema>;