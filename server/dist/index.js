"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const env_1 = require("./config/env");
const db_1 = require("./config/db");
const errorHandler_1 = require("./middleware/errorHandler");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const AppError_1 = require("./utils/AppError");
const app = (0, express_1.default)();
// 1) CONNECT DATABASE
(0, db_1.connectDB)();
// 2) GLOBAL MIDDLEWARES
app.use((0, helmet_1.default)()); // Security headers
app.use((0, cors_1.default)()); // CORS
app.use(express_1.default.json({ limit: '10kb' })); // Body parser
if (env_1.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev')); // Logging
}
// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        statusCode: 0,
        statusDesc: 'Healthy',
    });
});
// 3) ROUTES
app.use('/api/v1/auth', auth_routes_1.default);
// Handle undefined routes
app.all('*path', (req, res, next) => {
    next(new AppError_1.AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
// 4) GLOBAL ERROR HANDLER
app.use(errorHandler_1.errorHandler);
const PORT = env_1.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running in ${env_1.env.NODE_ENV} mode on port ${PORT}`);
});
