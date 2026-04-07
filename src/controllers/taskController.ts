import { Request,Response,NextFunction } from "express";
import TaskModel from "../models/task";
import ProjectModel from "../models/project";
import { ApiError } from "../errors/apiError";
import mongoose from "mongoose";

const isValidObjectId = (id: unknown) => mongoose.Types.ObjectId.isValid(String(id));

export const getAllTasks = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { projectId } = req.params;
    const filter: any = { userId: req.userId };
    if (projectId && isValidObjectId(projectId)) {
      filter.projectId = projectId;
    }
    const tasks = await TaskModel.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ status: 'success', data: tasks });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { title, description, status, priority, dueDate, projectId } = req.body;

    if (!isValidObjectId(projectId)) {
      throw new ApiError(400, "Invalid projectId");
    }

    const project = await ProjectModel.findOne({ _id: projectId, userId: req.userId });
    if (!project) {
      throw new ApiError(404, "Project not found or access denied");
    }

    const task = new TaskModel({
      title,
      description,
      status,
      priority,
      dueDate,
      projectId,
      userId: req.userId
    });

    const savedTask = await task.save();

    res.status(201).json({
      status: "success",
      data: savedTask
    });

  } catch (error) {
    next(error);
  }
};

export const editTask = async(req: any, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params;
        const updates = req.body;

        if (!isValidObjectId(id)){
            throw new ApiError(400, "Invalid task ID");
        }

        const task = await TaskModel.findOne({ _id: id, userId: req.userId });
        if (!task) {
            throw new ApiError(404, "Task not found or access denied");
        }

        const updated = await TaskModel.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json({ status: 'success', data: updated });
    }catch(error){
        next(error);
    }
}

export const deleteTask = async(req: any, res: Response, next: NextFunction) => {
    if(!req.params.id){
        return next(new ApiError(400, "Task ID is required"));
    }

    try{
        const { id } = req.params;

        if (!isValidObjectId(id)){
            throw new ApiError(400, "Invalid task ID");
        }

        const deleted = await TaskModel.findOneAndDelete({ _id: id, userId: req.userId });

        if(!deleted){
            throw new ApiError(404, "Task not found or access denied");
        }
        res.status(200).json({ status: 'success', data: deleted });

    }catch(error){
        next(error);
    }
}

export const getTasksByProject = async(req: any, res: Response, next: NextFunction) => {
    try{
        const { projectId } = req.params;

        if (!isValidObjectId(projectId)){
            throw new ApiError(400, "Invalid project ID");
        }

        const tasks = await TaskModel.find({ projectId, userId: req.userId });
        res.status(200).json({ status: 'success', data: tasks });
    }catch(error){
        next(error);
    }
}

export const changeTaskStatus = async(req: any, res: Response, next: NextFunction) => {
    try{
        const { id } = req.params;
        const { status } = req.body;    

        if (!isValidObjectId(id)){
            throw new ApiError(400, "Invalid task ID");
        }
        if (!status) {
            throw new ApiError(400, "Status is required");
        }

        const updated = await TaskModel.findOneAndUpdate(
            { _id: id, userId: req.userId },
            { status },
            { new: true }
        );

        if (!updated) {
            throw new ApiError(404, "Task not found or access denied");
        }

        res.status(200).json({ status: 'success', data: updated });
    }catch(error){
        next(error);
    }
}