import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { SignUpInput } from '../schemas/auth.schema';

export const signToken = (reqBody:SignUpInput): string => {
  return jwt.sign({
    mobileNo:reqBody.mobileNo,
    role:reqBody.role

  }, env.JWT_SECRET as string, {
    expiresIn: env.JWT_EXPIRES_IN as any,
  });
};
