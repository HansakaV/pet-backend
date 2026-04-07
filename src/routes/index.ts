import {Router} from "express";
import projectRoutes from "./projectRoutes";
import taskRoutes from "./taskRoutes";
import authRoutes from "./authRoutes";

const rootRouter = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/projects", projectRoutes);
rootRouter.use("/tasks", taskRoutes);

export default rootRouter;