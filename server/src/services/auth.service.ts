import { BadRequestError } from "../utils/api.error";
import { UserRepository } from "../repositories/user.repository";
import { SignUpInput } from "../validators/auth.validator";
import { Hasher } from "../utils/hasher";

export class AuthService {

    constructor(
        private userRepository: UserRepository,
        private hasher: Hasher
    ) {}

    async signup(userData: SignUpInput) {
        
        const existingUser = await this.userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new BadRequestError("Email is already in use");
        }

        // Hash the password before saving
        const hashedPassword = await this.hasher.hash(userData.password);
        
        const newUser = await this.userRepository.create({
            ...userData,
            password: hashedPassword
        });
        
        const userObj = newUser.toObject ? newUser.toObject() : newUser;
        delete userObj.password;

        return userObj;
    }
}
