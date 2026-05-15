import { Router } from 'express';
import { AuthController } from '../controller/auth.controller';
import { AuthService } from '../services/auth.service';
import { SendGridEmailService } from '../services/email.service';
import { StripePaymentService } from '../services/payment.service';
import { MongoUserRepository } from '../repositories/user.repository';
import { BcryptHasher } from '../utils/hasher';
import { SignupOrchestrator } from '../orchestrators/signup.orchestrator';
import { asyncHandler } from '../utils/api.handler';
import { validateBody } from '../middleware/request.validator';
import { signUpSchema } from '../validators/auth.validator';

export const authRouter = Router();

//===DEPENDENCY INJECTION===
const userRepository = new MongoUserRepository();
const hasher = new BcryptHasher();
const authService = new AuthService(userRepository, hasher);
const emailService = new SendGridEmailService();
const paymentService = new StripePaymentService();

//===ORCHESTRATOR====
const signupOrchestrator = new SignupOrchestrator(authService, emailService, paymentService);

//===CONTROLLER===
const authController = new AuthController(signupOrchestrator);

//===ROUTES===
authRouter.post('/signup', validateBody(signUpSchema), asyncHandler(authController.signup));
