import express from "express";
import { createTask, editTask, deleteTask,getTasksByProject, changeTaskStatus,getAllTasks} from "../controllers/taskController";

const taskRoutes = express.Router();

taskRoutes.post("/", createTask);
taskRoutes.get("/:projectId", getAllTasks);
taskRoutes.put("/:id", editTask);
taskRoutes.delete("/:id", deleteTask);
taskRoutes.get("/project/:projectId", getTasksByProject);
taskRoutes.patch("/:id/status", changeTaskStatus);

export default taskRoutes;