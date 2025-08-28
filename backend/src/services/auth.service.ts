import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ConflictError, UnauthorizedError } from '../errors/http.error';
import { RegisterDto } from '../dtos/auth/register.dto';
import { UserResponseDto } from '../dtos/auth/user-response.dto';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { LoginUserDto } from '../dtos/auth/login.dto';
import { LoginResponseDto } from '../dtos/auth/login-response.dto';
import { plainToInstance } from 'class-transformer';

export class AuthService {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }
    
    public async register(registerDto: RegisterDto): Promise<UserResponseDto> {
        const { email, password } = registerDto;

        const existingUser = await this.userService.findByEmail(email);

        if (existingUser) {
            throw new ConflictError('El email ya está en uso.');
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const savedUser = await this.userService.createUser({
            ...registerDto,
            password: hashedPassword,
        });

        return plainToInstance(UserResponseDto, savedUser, {excludeExtraneousValues: true});
    }

    public async login(loginDto: LoginUserDto): Promise<LoginResponseDto> {
        const { email, password } = loginDto;

        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new UnauthorizedError('Credenciales inválidas.');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedError('Credenciales inválidas.');
        }

        return this.signJwt(user);
    }

    // private functions

    private signJwt(user: User): LoginResponseDto {
        const payload = {
            id: user.id, 
            role: user.role,
            username: user.username
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET!, {
            expiresIn: process.env.JWT_EXPIRES_IN
        } as jwt.SignOptions);

        return {token}
    }
}