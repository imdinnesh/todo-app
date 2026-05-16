export interface User {
    id: string;
    name: string;
    email: string;
    mobileNo: string;
    password?: string;
    role: 'user' | 'admin';
    createdAt: Date;
    updatedAt: Date;
}
