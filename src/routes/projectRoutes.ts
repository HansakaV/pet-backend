import express from "express";
import { createProject, getProjects, deleteProject } from "../controllers/projectController";

const projectRoutes = express.Router();

projectRoutes.post("/", createProject);
projectRoutes.get("/", getProjects);
projectRoutes.delete("/:id", deleteProject);

export default projectRoutes;