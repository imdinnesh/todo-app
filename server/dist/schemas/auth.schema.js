"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.signUpSchema = void 0;
const zod_1 = require("zod");
exports.signUpSchema = zod_1.z.object({
    name: zod_1.z.string({
        error: (issue) => issue.input === undefined ? 'Name is required' : 'Invalid type'
    }).min(2, 'Name must be at least 2 characters'),
    email: zod_1.z.string({
        error: (issue) => issue.input === undefined ? 'Email is required' : 'Invalid type'
    }).email('Invalid email address'),
    password: zod_1.z.string({
        error: (issue) => issue.input === undefined ? 'Password is required' : 'Invalid type'
    }).min(8, 'Password must be at least 8 characters'),
    mobileNo: zod_1.z.string({
        error: (issue) => issue.input === undefined ? 'Mobile Number is required' : 'Invalid type'
    }).regex(/^\d{10}$/, 'Mobile Number must be exactly 10 digits'),
    role: zod_1.z.enum(['user', 'admin']).default('user')
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string({
        error: (issue) => issue.input === undefined ? 'Email is required' : 'Invalid type'
    }).email('Invalid email address'),
    password: zod_1.z.string({
        error: (issue) => issue.input === undefined ? 'Password is required' : 'Invalid type'
    }).min(8, 'Password must be at least 8 characters')
});
