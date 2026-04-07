import { Router } from "express";
import { createTask, editTask, deleteTask, getTasksByProject, changeTaskStatus, getAllTasks } from "../controllers/taskController";
import { authMiddleware } from "../middlewares/authMiddleware";

const taskRouter = Router();

taskRouter.use(authMiddleware);

taskRouter.post("/", createTask);
taskRouter.get("/:projectId", getAllTasks);
taskRouter.put("/:id", editTask);
taskRouter.delete("/:id", deleteTask);
taskRouter.get("/project/:projectId", getTasksByProject);
taskRouter.patch("/:id/status", changeTaskStatus);

export default taskRouter;