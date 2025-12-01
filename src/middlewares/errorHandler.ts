import { NextFunction,Request,Response } from "express";
import mongoose, {Mongoose} from "mongoose";
import { ApiError } from "../errors/apiError";

export const errorHandler = (err:any, req: Request, res: Response, next: NextFunction) => {

    console.error("centralized error:", err);

    if(err instanceof mongoose.Error){
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }

    if (err instanceof ApiError){
        res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
        return;
    }

    res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    });

};

