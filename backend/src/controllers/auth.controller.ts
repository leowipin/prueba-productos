import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dtos/auth/register.dto';
import { LoginUserDto } from '../dtos/auth/login.dto';

export class AuthController {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }
    
    public register = async (req: Request, res: Response): Promise<Response> => {
        const registerDto: RegisterDto = req.body;
        const newUserResponse = await this.authService.register(registerDto);
        return res.status(201).json(newUserResponse);
    }

    public login = async (req: Request, res: Response): Promise<Response> => {
        const loginDto: LoginUserDto = req.body;
        const loginResponse = await this.authService.login(loginDto);
        return res.status(200).json(loginResponse);
    }
}