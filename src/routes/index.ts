import {Router} from "express";
import projectRoutes from "./projectRoutes";
import taskRoutes from "./taskRoutes";

const rootRouter = Router();

rootRouter.use("/projects", projectRoutes);
rootRouter.use("/tasks", taskRoutes);

export default rootRouter;