import { EmailService } from "../interfaces/email.interface";
import { PaymentService } from "../interfaces/payment.interface";
import { AuthService } from "../services/auth.service";

export class SignupOrchestrator {
    constructor(
        private authService: AuthService,
        private emailService: EmailService,
        private paymentService: PaymentService
    ) { }

    async execute(userData: any) {
        // Register User
        const newUser = await this.authService.signup(userData);

        // Create Stripe Customer
        await this.paymentService.createCustomer(newUser.email);

        // Send Welcome Mail
        await this.emailService.sendWelcomeEmail(newUser.email);

        return newUser;
    }
}
