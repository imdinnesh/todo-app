/**
 * Custom Error class for API-related errors.
 * Extends the built-in Error class to include status codes and operational flags.
 */
export class ApiError extends Error {
    public readonly isOperational: boolean;

    /**
     * @param message - Human-readable error message
     * @param statusCode - Internal status code (e.g., 1 for error)
     * @param httpStatus - HTTP status code (defaults to 500)
     * @param actualError - The original error or detailed message for internal logging
     */
    constructor(
        public readonly message: string,
        public readonly statusCode: number,
        public readonly httpStatus: number = 500,
        public readonly actualError?: string
    ) {
        super(message);

        this.isOperational = true;

        // Ensure the prototype chain is correctly set (needed for custom errors in TS)
        Object.setPrototypeOf(this, new.target.prototype);

        // Capture stack trace, excluding the constructor from the trace
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export class BadRequestError extends ApiError {
    constructor(message: string = "Bad Request", actualError?: string) {
        super(message, 1, 400, actualError);
    }
}

export class UnauthorizedError extends ApiError {
    constructor(message: string = "Unauthorized", actualError?: string) {
        super(message, 1, 401, actualError);
    }
}

export class ForbiddenError extends ApiError {
    constructor(message: string = "Forbidden", actualError?: string) {
        super(message, 1, 403, actualError);
    }
}

export class NotFoundError extends ApiError {
    constructor(message: string = "Not Found", actualError?: string) {
        super(message, 1, 404, actualError);
    }
}

export class InternalServerError extends ApiError {
    constructor(message: string = "Internal Server Error", actualError?: string) {
        super(message, 1, 500, actualError);
    }
}

export class DatabaseConnectivityError extends ApiError {
    constructor(message: string = "Database is busy or unreachable. Please try again later.", actualError?: string) {
        super(message, 1, 503, actualError);
    }
}

export class TooManyRequestsError extends ApiError {
    constructor(message: string = "Too Many Requests", actualError?: string) {
        super(message, 1, 429, actualError);
    }
}

