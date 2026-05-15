import { EmailService } from "../interfaces/email.interface";
import { InternalServerError } from "../utils/api.error";

export class SendGridEmailService implements EmailService {
    async sendWelcomeEmail(email: string) {
        try {
            console.log(`[SendGridEmailService] Sending welcome email to ${email}`);
            // Real implementation would use SendGrid, AWS SES, etc.
            return true;
        } catch (error: any) {
            throw new InternalServerError("Failed to send welcome email", error.message);
        }
    }
}
