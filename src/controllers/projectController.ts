import { Request,Response,NextFunction } from "express";
import ProjectModel from "../models/project";
import { ApiError } from "../errors/apiError";

export const createProject = async(req: Request, res: Response, next: NextFunction) => {
    console.log("createProject called" , req.body);
    try{
        const project = new ProjectModel(req.body);
        if(!project.name ){
            throw new ApiError(400, "Project name is  required");
        }

        const duplicate = await ProjectModel.findOne({ name: project.name });
        if (duplicate) {
            throw new ApiError(409, "Project with the same name already exists");
        }

        await project.save();
        res.status(201).json({ status: 'success', data: project });
    } catch (error) {
        next(error);
    }
}

export const getProjects = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const projects = await ProjectModel.find().sort({ startDate: -1 });
        res.status(200).json({ status: 'success', data: projects });
    } catch (error) {
        next(error);
    }
}

export const deleteProject = async(req: Request, res: Response, next: NextFunction) => {

    if(!req.params.projectId){
        return next(new ApiError(400, "Project ID is required"));
    }

    try{
        const { projectId } = req.params;
        const project = await ProjectModel.findByIdAndDelete(projectId);
        if (!project) {
            throw new ApiError(404, "Project not found");
        }
        res.status(200).json({ status: 'success', data: project });
    } catch (error) {
        next(error);
    }
}