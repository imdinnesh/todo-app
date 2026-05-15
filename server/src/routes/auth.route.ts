import { Router } from 'express';
import { AuthController } from '../controller/auth.controller';
import { AuthService } from '../services/auth.service';
import { SendGridEmailService } from '../services/email.service';
import { StripePaymentService } from '../services/payment.service';
import { MongoUserRepository } from '../repositories/user.repository';
import { BcryptHasher } from '../utils/hasher';
import { JwtTokenService } from '../services/token.service';
import { SignupOrchestrator } from '../orchestrators/signup.orchestrator';
import { asyncHandler } from '../utils/api.handler';
import { validateBody } from '../middleware/request.validator';
import { signUpSchema, loginSchema } from '../validators/auth.validator';

export const authRouter = Router();

//===DEPENDENCY INJECTION===
// 1. Data Layer
const userRepository = new MongoUserRepository();

// 2. Utils
const hasher = new BcryptHasher();
const tokenService = new JwtTokenService();

// 3. Services
const authService = new AuthService(userRepository, hasher, tokenService);
const emailService = new SendGridEmailService();
const paymentService = new StripePaymentService();

// 4. Orchestrator
const signupOrchestrator = new SignupOrchestrator(authService, emailService, paymentService);

// 5. Controller
const authController = new AuthController(signupOrchestrator, authService);

//===ROUTES===
authRouter.post('/signup', validateBody(signUpSchema), asyncHandler(authController.signup));
authRouter.post('/login', validateBody(loginSchema), asyncHandler(authController.login));
