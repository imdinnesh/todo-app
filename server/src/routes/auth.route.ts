import { Router } from 'express';
import { AuthController } from '../controller/auth.controller';
import { AuthService } from '../services/auth.service';
import { SendGridEmailService } from '../services/email.service';
import { StripePaymentService } from '../services/payment.service';
import { MongoUserRepository } from '../repositories/user.repository';
import { BcryptHasher } from '../utils/hasher';
import { JwtTokenService } from '../services/token.service';
import { LoginUseCase } from '../use-cases/auth/login.use-case';
import { asyncHandler } from '../utils/api.handler';
import { validateBody } from '../middleware/request.validator';
import { signUpSchema, loginSchema } from '../validators/auth.validator';
import { SignupUseCase } from '../use-cases/auth/signup.use-case';

export const authRouter = Router();

//===DEPENDENCY INJECTION===
// 1. Data Layer
const userRepository = new MongoUserRepository();

// 2. Utils
const hasher = new BcryptHasher();
const tokenService = new JwtTokenService();

// 3. Services (Independent)
const authService = new AuthService(hasher);
const emailService = new SendGridEmailService();
const paymentService = new StripePaymentService();

// 4. Use Cases
const signupUseCase = new SignupUseCase(userRepository, authService, emailService, paymentService);
const loginUseCase = new LoginUseCase(userRepository, authService, tokenService);

// 5. Controller
const authController = new AuthController(signupUseCase, loginUseCase);

//===ROUTES===
authRouter.post('/signup', validateBody(signUpSchema), asyncHandler(authController.signup));
authRouter.post('/login', validateBody(loginSchema), asyncHandler(authController.login));
