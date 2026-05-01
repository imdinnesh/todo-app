import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import { connectDB } from './config/db';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth.routes';
import { AppError } from './utils/AppError';

const app = express();

// 1) CONNECT DATABASE
connectDB();

// 2) GLOBAL MIDDLEWARES
app.use(helmet()); // Security headers
app.use(cors()); // CORS
app.use(express.json({ limit: '10kb' })); // Body parser
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // Logging
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
app.use('/api/v1/auth', authRoutes);

// Handle undefined routes
app.all('*path', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// 4) GLOBAL ERROR HANDLER
app.use(errorHandler);

const PORT = env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${env.NODE_ENV} mode on port ${PORT}`);
});
