import { BadRequestError, UnauthorizedError } from "../utils/api.error";
import { UserRepository } from "../repositories/user.repository";
import { LoginInput, SignUpInput } from "../validators/auth.validator";
import { Hasher } from "../utils/hasher";
import { TokenService } from "./token.service";

export class AuthService {

    constructor(
        private userRepository: UserRepository,
        private hasher: Hasher,
        private tokenService: TokenService
    ) { }

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

    async login(credentials: LoginInput) {
        const user = await this.userRepository.findByEmail(credentials.email);

        if (!user || !user.password) {
            throw new UnauthorizedError("Invalid email or password");
        }

        const isPasswordMatch = await this.hasher.compare(credentials.password, user.password);
        if (!isPasswordMatch) {
            throw new UnauthorizedError("Invalid email or password");
        }

        // Generate Token with custom payload: mobileNo and role
        const token = this.tokenService.generateToken({
            mobileNo: user.mobileNo,
            role: user.role
        });

        const userObj = user.toObject ? user.toObject() : user;
        delete userObj.password;

        return { user: userObj, token };
    }
}
