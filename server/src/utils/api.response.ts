import { Response } from 'express';

/**
 * Base class for all success responses.
 */
export class SuccessResponse<T = any> {
    constructor(
        public readonly statusDesc: string,
        public readonly data?: T,
        public readonly statusCode: number = 0
    ) {}

    /**
     * Sends the response to the client.
     */
    send(res: Response, httpStatus: number = 200) {
        return res.status(httpStatus).json({
            status: 'success',
            statusCode: this.statusCode,
            statusDesc: this.statusDesc,
            ...(this.data !== undefined && { data: this.data })
        });
    }
}

/**
 * 200 OK Response
 */
export class OkResponse<T = any> extends SuccessResponse<T> {
    constructor(statusDesc: string = "Success", data?: T) {
        super(statusDesc, data);
    }

    send(res: Response) {
        return super.send(res, 200);
    }
}

/**
 * 201 Created Response
 */
export class CreatedResponse<T = any> extends SuccessResponse<T> {
    constructor(statusDesc: string = "Created successfully", data?: T) {
        super(statusDesc, data);
    }

    send(res: Response) {
        return super.send(res, 201);
    }
}
