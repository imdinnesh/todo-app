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
        Object.setPrototypeOf(this, ApiError.prototype);

        // Capture stack trace, excluding the constructor from the trace
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
