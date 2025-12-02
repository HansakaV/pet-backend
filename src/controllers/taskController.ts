import { Request,Response,NextFunction } from "express";
import TaskModel from "../models/task";
import ProjectModel from "../models/project";
import { ApiError } from "../errors/apiError";
import mongoose from "mongoose";

const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

export const createProject = async(req:Request, res:Response,next:NextFunction)=>{
    try{
        const task = new TaskModel(req.body);
        if(!task ){
            throw new ApiError(400, "All Fields are required");
        }
        if(!isValidObjectId(task.projectId)){
            throw new ApiError(400, "Invalid projectId");
        }

        const project = await ProjectModel.findById(task.projectId);
        if(!project){
            throw new ApiError(404, "Project not found");
        }
    }catch(error){
        next(error);
    }

}