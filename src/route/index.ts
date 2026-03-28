import { Router } from "express";
import route from "./ExpressRoutes";
const routes = Router();

routes.use("/todos", route);

export default routes;
