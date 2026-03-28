import { Router } from "express";
import router from "./AuthRoute";

const userRoute = Router();
userRoute.use("/users", router);

export default userRoute;