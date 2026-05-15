import { PaymentService } from "../interfaces/payment.interface";
import { InternalServerError } from "../utils/api.error";

export class StripePaymentService implements PaymentService {
    async createCustomer(email: string) {
        try {
            console.log(`[StripePaymentService] Creating payment profile in Stripe for ${email}`);
            // Real implementation would use Stripe SDK: await stripe.customers.create({ email })
            return { customerId: 'cus_mock12345' };
        } catch (error: any) {
            throw new InternalServerError("Failed to create customer", error.message);
        }
    }
}
