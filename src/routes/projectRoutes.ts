import { Router } from "express";
import { createProject, getProjects, deleteProject, getProjectById } from "../controllers/projectController";
import { authMiddleware } from "../middlewares/authMiddleware";

const projectRouter = Router();

projectRouter.use(authMiddleware);

projectRouter.get("/", getProjects);
projectRouter.get("/:id", getProjectById);
projectRouter.post("/", createProject);
projectRouter.delete("/:id", deleteProject);

export default projectRouter;