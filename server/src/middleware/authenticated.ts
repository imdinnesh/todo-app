import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { decodedToken, isValidToken } from "../services/auth.service";

export const authenticated = (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('Unauthorized', 401));
    }

    // Verify Token
    const isTokenValid = isValidToken(token);

    if (!isTokenValid) {
        return next(new AppError('Unauthorized', 401));
    }

    const tokenProperties=decodedToken(token)
    req.tokenProperties=tokenProperties
    next();
};