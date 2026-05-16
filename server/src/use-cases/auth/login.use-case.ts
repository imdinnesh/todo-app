import { UserRepository } from "../../repositories/user.repository";
import { AuthService } from "../../services/auth.service";
import { TokenService } from "../../services/token.service";
import { LoginInput } from "../../validators/auth.validator";
import { UnauthorizedError } from "../../utils/api.error";

export class LoginUseCase {
    constructor(
        private userRepository: UserRepository,
        private authService: AuthService,
        private tokenService: TokenService
    ) { }

    async execute(credentials: LoginInput) {
        const user = await this.userRepository.findByEmail(credentials.email);

        if (!user || !user.password) {
            throw new UnauthorizedError("Invalid email or password");
        }

        const isPasswordMatch = await this.authService.verifyPassword(credentials.password, user.password);
        if (!isPasswordMatch) {
            throw new UnauthorizedError("Invalid email or password");
        }

        const token = this.tokenService.generateToken({
            mobileNo: user.mobileNo,
            role: user.role
        });

        // Remove password from the entity before returning
        const { password, ...userWithoutPassword } = user;

        return { user: userWithoutPassword, token };
    }
}
