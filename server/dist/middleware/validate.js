"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateHeaders = exports.validateQuery = exports.validateParams = exports.validateBody = void 0;
const zod_1 = require("zod");
const AppError_1 = require("../utils/AppError");
const validateRequest = (schema, source) => (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate the specific part of the request
        const validated = yield schema.parseAsync(req[source] || {});
        // Replace the original data with the validated data (to handle defaults/transforms)
        req[source] = validated;
        return next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const issue = error.issues[0];
            const message = `${issue.message}`;
            return next(new AppError_1.AppError(message, 400));
        }
        return next(error);
    }
});
const validateBody = (schema) => validateRequest(schema, 'body');
exports.validateBody = validateBody;
const validateParams = (schema) => validateRequest(schema, 'params');
exports.validateParams = validateParams;
const validateQuery = (schema) => validateRequest(schema, 'query');
exports.validateQuery = validateQuery;
const validateHeaders = (schema) => validateRequest(schema, 'headers');
exports.validateHeaders = validateHeaders;
