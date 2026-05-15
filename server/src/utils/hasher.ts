import bcrypt from 'bcryptjs';

export interface Hasher {
    hash(value: string): Promise<string>;
    compare(value: string, hashedValue: string): Promise<boolean>;
}

export class BcryptHasher implements Hasher {
    private readonly saltRounds = 10;

    async hash(value: string): Promise<string> {
        return bcrypt.hash(value, this.saltRounds);
    }

    async compare(value: string, hashedValue: string): Promise<boolean> {
        return bcrypt.compare(value, hashedValue);
    }
}
