import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodTypeAny } from 'zod';
import { ApiError } from '../utils/api.error';

const validateRequest = (schema: ZodTypeAny, source: 'body' | 'params' | 'query' | 'headers') =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const validated = await schema.parseAsync(req[source] || {});
      req[source] = validated;
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const issue = error.issues[0];
        const message = `${issue.message}`;
        return next(new ApiError(message, 1, 400));
      }
      return next(error);
    }
  };

export const validateBody = (schema: ZodTypeAny) => validateRequest(schema, 'body');
export const validateParams = (schema: ZodTypeAny) => validateRequest(schema, 'params');
export const validateQuery = (schema: ZodTypeAny) => validateRequest(schema, 'query');
export const validateHeaders = (schema: ZodTypeAny) => validateRequest(schema, 'headers');
