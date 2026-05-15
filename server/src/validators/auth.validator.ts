import { z } from 'zod';

//===SCHEMAS====
export const signUpSchema = z.object({
  name: z.string({
    error: (issue) => issue.input === undefined ? 'Name is required' : 'Invalid type'
  }).min(2, 'Name must be at least 2 characters'),
  email: z.string({
    error: (issue) => issue.input === undefined ? 'Email is required' : 'Invalid type'
  }).email('Invalid email address'),
  password: z.string({
    error: (issue) => issue.input === undefined ? 'Password is required' : 'Invalid type'
  }).min(8, 'Password must be at least 8 characters'),
  mobileNo: z.string({
    error: (issue) => issue.input === undefined ? 'Mobile Number is required' : 'Invalid type'
  }).regex(/^\d{10}$/, 'Mobile Number must be exactly 10 digits'),
  role: z.enum(['user', 'admin']).default('user').optional()
});

export const loginSchema = z.object({
  email: z.string({
    error: (issue) => issue.input === undefined ? 'Email is required' : 'Invalid type'
  }).email('Invalid email address'),
  password: z.string({
    error: (issue) => issue.input === undefined ? 'Password is required' : 'Invalid type'
  }).min(8, 'Password must be at least 8 characters')
});


//===TYPES====
export type SignUpInput = z.infer<typeof signUpSchema>;

export type LoginInput = z.infer<typeof loginSchema>;
