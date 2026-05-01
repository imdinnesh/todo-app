"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError_1 = require("../utils/AppError");
const env_1 = require("../config/env");
const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'Something went wrong';
    if (err instanceof AppError_1.AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    // Handle Mongoose Duplicate Key Error
    if (err.code === 11000) {
        statusCode = 400;
        const field = Object.keys(err.keyValue)[0];
        message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
    }
    // Handle Mongoose Validation Error
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map((val) => val.message).join(', ');
    }
    res.status(statusCode).json(Object.assign({ status: 'error', statusCode: 1, statusDesc: message }, (env_1.env.NODE_ENV === 'development' && {
        actualError: err.message,
        stack: err.stack,
    })));
};
exports.errorHandler = errorHandler;
