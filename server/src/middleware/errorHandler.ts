import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { env } from '../config/env';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Something went wrong';

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Handle Mongoose Duplicate Key Error
  if ((err as any).code === 11000) {
    statusCode = 400;
    const field = Object.keys((err as any).keyValue)[0];
    message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  }

  // Handle Mongoose Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values((err as any).errors).map((val: any) => val.message).join(', ');
  }

  // Handle MongoDB Connection Error (when DB goes down)
  if (err.name === 'MongoServerSelectionError') {
    statusCode = 503;
    message = 'Database connection lost. Please try again later.';
  }

  res.status(statusCode).json({
    status: 'error',
    statusCode: 1,
    statusDesc: message,
    ...(env.NODE_ENV === 'development' && {
      actualError: (err as AppError).actualError || err.message,
      stack: err.stack,
    }),
  });
};
