import {Router} from "express";
import projectRoutes from "./projectRoutes";

const rootRouter = Router();

rootRouter.use("/projects", projectRoutes);

export default rootRouter;