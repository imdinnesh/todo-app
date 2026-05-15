import { Request } from 'express';

export interface AuthUser {
    mobileNo: string;
    role: 'user' | 'admin';
}

export interface AuthenticatedRequest extends Request {
    user: AuthUser;
}
