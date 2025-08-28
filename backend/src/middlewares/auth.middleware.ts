import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../types/user.type';
import { UnauthorizedError, ForbiddenError } from '../errors/http.error';
import { TokenPayload } from '../types/auth.type';

export const authMiddleware = (allowedRoles: UserRole[]) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                throw new UnauthorizedError('Formato de token inválido. Se esperaba "Bearer <token>".');
            }

            const token = authHeader.split(' ')[1];

            if (!process.env.JWT_SECRET) {
                throw new Error('JWT_SECRET no está definido en las variables de entorno.');
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET) as TokenPayload;
            
            req.user = { id: decoded.id, role: decoded.role, username: decoded.username };

            if (!allowedRoles.includes(decoded.role)) {
                throw new ForbiddenError('No tienes los permisos necesarios para realizar esta acción.');
            }

            next();
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                next(new UnauthorizedError('Token inválido o expirado.'));
            } else {
                next(error);
            }
        }
    };
};