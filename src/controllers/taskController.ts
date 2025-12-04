import { Request,Response,NextFunction } from "express";
import TaskModel from "../models/task";
import ProjectModel from "../models/project";
import { ApiError } from "../errors/apiError";
import mongoose from "mongoose";

const isValidObjectId = (id: unknown) => mongoose.Types.ObjectId.isValid(String(id));

export const createTask = async(req:Request, res:Response,next:NextFunction)=>{
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

        const savedTask = await task.save();
        res.status(201).json({ status: 'success', data: savedTask });

    }catch(error){
        next(error);
    }

}

export const editTask = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params;
        const updates = req.body;
        console.log(updates);

        if (!isValidObjectId(id)){
            throw new ApiError(400, "Invalid task ID");
        }

        if(!updates.title || !updates.description || !updates.status){
            throw new ApiError(400, "All fields are required");
        }

        const updated = await TaskModel.findByIdAndUpdate(id, updates, { new: true });

        if(!updated){
            throw new ApiError(404, "Task not found");
        }
        res.status(200).json({ status: 'success', data: updated });
    }catch(error){
        next(error);
    }
}

export const deleteTask = async(req: Request, res: Response, next: NextFunction) => {

    if(!req.params.id){
        return next(new ApiError(400, "Task ID is required"));
    }

    try{
        const { id } = req.params;

        if (!isValidObjectId(id)){
            throw new ApiError(400, "Invalid task ID");
        }

        const deleted = await TaskModel.findByIdAndDelete(id);

        if(!deleted){
            throw new ApiError(404, "Task not found");
        }
        res.status(200).json({ status: 'success', data: deleted });

    }catch(error){
        next(error);
    }
}

export const getTasksByProject = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const { projectId } = req.params;

        if (!isValidObjectId(projectId)){
            throw new ApiError(400, "Invalid project ID");
        }
        const tasks = await TaskModel.find({ projectId });

        res.status(200).json({ status: 'success', data: tasks });
    }catch(error){
        next(error);
    }
}

export const changeTaskStatus = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const { id } = req.params;
        const { status } = req.body;    

        if (!isValidObjectId(id)){
            throw new ApiError(400, "Invalid task ID");
        }
        if (!status) {
            throw new ApiError(400, "Status is required");
        }

        const updated = await TaskModel.findByIdAndUpdate(id, { status }, { new: true });

        if (!updated) {
            throw new ApiError(404, "Task not found");
        }

        res.status(200).json({ status: 'success', data: updated });
    }catch(error){
        next(error);
    }
}