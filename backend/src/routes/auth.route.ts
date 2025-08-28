import { Router } from 'express';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { validationMiddleware } from '../middlewares/validation.middleware';
import { asyncHandler } from '../utils/async-handler';
import { RegisterDto } from '../dtos/auth/register.dto';
import { LoginUserDto } from '../dtos/auth/login.dto';

const userRepository = AppDataSource.getRepository(User);
const userService = new UserService(userRepository);
const authService = new AuthService(userService);
const authController = new AuthController(authService);

const router = Router();

router.post(
    '/register',
    validationMiddleware(RegisterDto),
    asyncHandler(authController.register.bind(authController))
);

router.post(
    '/login',
    validationMiddleware(LoginUserDto),
    asyncHandler(authController.login.bind(authController))
);

export default router;