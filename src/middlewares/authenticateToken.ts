import { NextFunction,Request,Response } from "express";
import jwt, {JsonWebTokenError,TokenExpiredError} from "jsonwebtoken";
import { ApiError } from "../errors/apiError";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    try{
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            throw new ApiError(401, 'Token not provided');
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET !, (err, decoded) => {
            if (err) {
                if (err instanceof TokenExpiredError) {
                    throw new ApiError(401, 'Token expired');
                } else if (err instanceof JsonWebTokenError) {
                    throw new ApiError(401, 'Invalid token');
                } else {
                    throw new ApiError(500, 'Token verification failed');
                }
            }
            if (!decoded || typeof decoded === 'string') {
                throw new ApiError(401, 'Invalid token payload');
            }
            
            next();
        });
    } catch (error) {
        next(error);
    }


}