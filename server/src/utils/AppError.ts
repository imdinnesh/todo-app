export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly actualError?: string;

  constructor(message: string, statusCode: number, actualError?: string) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.actualError = actualError;

    Error.captureStackTrace(this, this.constructor);
  }
}
