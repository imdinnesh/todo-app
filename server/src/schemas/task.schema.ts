import z from "zod";

export const createTaskSchema=z.object({
    title:z.string({
        error: (issue) => issue.input === undefined ? 'Title is required' : 'Invalid type'
    }),
    description:z.string({
        error: (issue) => issue.input === undefined ? 'Description is required' : 'Invalid type'
    }),
    expiryDate:z.coerce.date({
        error: (issue) => issue.input === undefined ? 'Expiry Date is required' : 'Invalid type'
    }),
    status:z.enum(["pending","completed"],{
        error: (issue) => issue.input === undefined ? 'Status is required' : 'Invalid type'
    }).default("pending").optional(),
})

export type CreateTaskInput = z.infer<typeof createTaskSchema>