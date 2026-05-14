/**
 * Standardized API Response class.
 * Used to ensure all successful responses follow the same structure.
 */
export class ApiResponse<T = any> {
    public readonly status: 'success' | 'error';

    /**
     * @param statusCode - Internal status code (0 for success, 1 for error)
     * @param httpStatus - HTTP status code (e.g., 200, 201)
     * @param statusDesc - Descriptive message or status string
     * @param data - Optional payload to return to the client
     */
    constructor(
        public readonly statusCode: number,
        public readonly httpStatus: number,
        public readonly statusDesc: string,
        public readonly data?: T
    ) {
        this.status = statusCode === 0 ? 'success' : 'error';
    }
}
