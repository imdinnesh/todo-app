import { EmailService } from "../interfaces/email.interface";
import { PaymentService } from "../interfaces/payment.interface";
import { UserRepository } from "../repositories/user.repository";
import { AuthService } from "../services/auth.service";
import { SignUpInput } from "../validators/auth.validator";
import { BadRequestError } from "../utils/api.error";

export class SignupUseCase {
    constructor(
        private userRepository: UserRepository,
        private authService: AuthService,
        private emailService: EmailService,
        private paymentService: PaymentService
    ) { }

    async execute(userData: SignUpInput) {
        // Check if user exists
        const existingUser = await this.userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new BadRequestError("Email is already in use");
        }

        // Hash password via independent AuthService
        const hashedPassword = await this.authService.hashPassword(userData.password);

        // Register User
        const newUser = await this.userRepository.create({
            ...userData,
            password: hashedPassword
        });

        // Create Stripe Customer
        await this.paymentService.createCustomer(newUser.email);

        // Send Welcome Mail
        await this.emailService.sendWelcomeEmail(newUser.email);

        const userObj = newUser.toObject ? newUser.toObject() : newUser;
        delete userObj.password;

        return userObj;
    }
}
