export interface EmailService {
    sendWelcomeEmail(email: string): Promise<boolean>;
}
