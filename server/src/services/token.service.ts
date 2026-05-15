import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export interface TokenService {
    generateToken(payload: object): string;
    verifyToken(token: string): any;
}

export class JwtTokenService implements TokenService {
    private readonly secret = env.JWT_SECRET;
    private readonly expiresIn = env.JWT_EXPIRES_IN;

    generateToken(payload: object): string {
        return jwt.sign(payload, this.secret, {
            expiresIn: this.expiresIn as jwt.SignOptions['expiresIn'],
        });
    }

    verifyToken(token: string): any {
        try {
            return jwt.verify(token, this.secret);
        } catch (error) {
            return null;
        }
    }
}
