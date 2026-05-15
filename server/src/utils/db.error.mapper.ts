import { DatabaseConnectivityError, InternalServerError } from "./api.error";

/**
 * Centralized mapper to translate technical database errors into 
 * meaningful, categorized ApiErrors.
 */
export class DatabaseErrorMapper {
    /**
     * Maps a raw error to a specific ApiError.
     * @param error - The raw error from the database driver (Mongoose/MongoDB)
     * @param businessMessage - The human-readable message for this specific operation
     */
    static map(error: any, businessMessage: string) {
        const technicalMessage = error.message || 'Unknown database error';

        // 1. Handle Connectivity & Timeouts
        if (
            error.name === 'MongoServerSelectionError' || 
            error.name === 'MongoNetworkError' ||
            technicalMessage.toLowerCase().includes('timeout') ||
            technicalMessage.toLowerCase().includes('exceeded time limit')
        ) {
            return new DatabaseConnectivityError(
                "Database is temporarily busy or unreachable", 
                technicalMessage
            );
        }

        // 2. Handle Mongoose Duplicate Key Errors (e.g., unique email)
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue || {})[0] || 'Field';
            const formattedField = field.charAt(0).toUpperCase() + field.slice(1);
            return new InternalServerError(`${formattedField} already exists`, technicalMessage);
        }

        // 3. Fallback: Generic Database/Internal Error
        return new InternalServerError(businessMessage, technicalMessage);
    }
}
