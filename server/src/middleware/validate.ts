import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';
import { AppError } from '../utils/AppError';

const validateRequest = (schema: ZodObject<any, any>, source: 'body' | 'params' | 'query' | 'headers') =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      // Validate the specific part of the request
      const validated = await schema.parseAsync(req[source] || {});
      
      // Replace the original data with the validated data (to handle defaults/transforms)
      req[source] = validated;
      
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const issue = error.issues[0];
        const message = `${issue.message}`;
        return next(new AppError(message, 400));
      }
      return next(error);
    }
  };

export const validateBody = (schema: ZodObject<any, any>) => validateRequest(schema, 'body');
export const validateParams = (schema: ZodObject<any, any>) => validateRequest(schema, 'params');
export const validateQuery = (schema: ZodObject<any, any>) => validateRequest(schema, 'query');
export const validateHeaders = (schema: ZodObject<any, any>) => validateRequest(schema, 'headers');
