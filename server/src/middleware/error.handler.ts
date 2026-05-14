import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/api.error';
import { env } from '../config/env';

export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let httpStatus = 500;
  let internalCode = 1;
  let message = 'Something went wrong';

  if (err instanceof ApiError) {
    httpStatus = err.httpStatus;
    internalCode = err.statusCode;
    message = err.message;
  }

  // Handle Mongoose Duplicate Key Error
  if ((err as any).code === 11000) {
    httpStatus = 400;
    internalCode = 1;
    const field = Object.keys((err as any).keyValue)[0];
    message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  }

  // Handle Mongoose Validation Error
  if (err.name === 'ValidationError') {
    httpStatus = 400;
    internalCode = 1;
    message = Object.values((err as any).errors).map((val: any) => val.message).join(', ');
  }

  res.status(httpStatus).json({
    status: 'error',
    statusCode: internalCode,
    statusDesc: message,
    ...(env.NODE_ENV === 'development' && {
      actualError: (err as ApiError).actualError || err.message,
      stack: err.stack,
    }),
  });
};
