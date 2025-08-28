import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/http.error';

export const errorHandlerMiddleware = (
    err: Error, 
    _req: Request, 
    res: Response, 
    _next: NextFunction
) => {
    if (err instanceof HttpError) {
        return res.status(err.statusCode).json({
            title: err.title,
            description: err.message,
        });
    }

    console.error('Error no controlado:', err);

    return res.status(500).json({
        title: 'Error Interno del Servidor',
        description: 'Ha ocurrido un error inesperado. Por favor, inténtelo de nuevo más tarde.',
    });
};