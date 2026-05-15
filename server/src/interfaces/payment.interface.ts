export interface PaymentService {
    createCustomer(email: string): Promise<{ customerId: string }>;
}
