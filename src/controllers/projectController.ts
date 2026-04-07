import { Request,Response,NextFunction } from "express";
import ProjectModel from "../models/project";
import { ApiError } from "../errors/apiError";

export const createProject = async(req: any, res: Response, next: NextFunction) => {
    try{
        const { name, description, projectId } = req.body;
        if(!name ){
            throw new ApiError(400, "Project name is required");
        }

        const duplicate = await ProjectModel.findOne({ name, userId: req.userId });
        if (duplicate) {
            throw new ApiError(409, "Project with the same name already exists in your workspace");
        }

        const project = new ProjectModel({
            name,
            description,
            projectId,
            userId: req.userId
        });

        await project.save();
        res.status(201).json({ status: 'success', data: project });
    } catch (error) {
        next(error);
    }
}

export const getProjects = async(req: any, res: Response, next: NextFunction) => {
    try{
        const projects = await ProjectModel.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.status(200).json({ status: 'success', data: projects });
    } catch (error) {
        next(error);
    }
}

export const deleteProject = async(req: any, res: Response, next: NextFunction) => {
    if(!req.params.id){
        return next(new ApiError(400, "Project ID is required"));
    }

    try{
        const { id } = req.params;
        const project = await ProjectModel.findOneAndDelete({ _id: id, userId: req.userId });
        if (!project) {
            throw new ApiError(404, "Project not found or you don't have permission to delete it");
        }
        res.status(200).json({ status: 'success', data: project });
    } catch (error) {
        next(error);
    }
}

export const getProjectById = async(req: any, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const project = await ProjectModel.findOne({ _id: id, userId: req.userId });
        if (!project) {
            throw new ApiError(404, "Project not found");
        }
        res.status(200).json({ status: 'success', data: project });
    } catch (error) {
        next(error);
    }
}
