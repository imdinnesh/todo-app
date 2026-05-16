import { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '../utils/api.error';
import { AuthenticatedRequest } from '../types/auth.types';

export const authorisation = (...allowedRoles: string[]) => {
    return async (req: Request, _res: Response, next: NextFunction) => {
        const authReq = req as AuthenticatedRequest;

        if (!authReq.user) {
            return next(new ForbiddenError("User context missing."));
        }

        if (allowedRoles.includes(authReq.user.role)) {
            return next();
        }
        next(new ForbiddenError("You do not have the required permissions to perform this action."));
    };
};
