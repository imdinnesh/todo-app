import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../services/token.service';
import { UnauthorizedError } from '../utils/api.error';
import { AuthUser } from '../types/auth.types';

export const authentication = (tokenService: TokenService) => {
    return async (req: Request, _res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers.authorization;
            
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                throw new UnauthorizedError("Authentication required. Please provide a Bearer token.");
            }

            const token = authHeader.split(' ')[1];

            // 2. Verify token
            const decoded = tokenService.verifyToken(token) as AuthUser;
            
            if (!decoded) {
                throw new UnauthorizedError("Invalid or expired token. Please login again.");
            }

            // 3. Attach user to request
            req.user = {
                mobileNo: decoded.mobileNo,
                role: decoded.role
            };

            next();
        } catch (error) {
            next(error);
        }
    };
};
