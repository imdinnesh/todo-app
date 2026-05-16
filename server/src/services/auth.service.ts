import { Hasher } from "../utils/hasher";

export class AuthService {
    constructor(
        private hasher: Hasher
    ) { }

    async hashPassword(password: string): Promise<string> {
        return await this.hasher.hash(password);
    }

    async verifyPassword(password: string, hashed: string): Promise<boolean> {
        return await this.hasher.compare(password, hashed);
    }
}
