import dotenv from "dotenv";
import helmet from "helmet";
dotenv.config(); // MUST be before all other imports

import express, { Application } from "express";
import routes from "./route";
import { ErrorHandler } from "./Error/ErrorHandler";
import { AuthMiddleware } from "./Middleware/AuthMiddleware";
import { RouteLogger } from "./Logger/RouteLogger";
import connectDB from "./config/Db";
import userRoute from "./route/UserRoute";

const logger = new RouteLogger();
const errorHandler = new ErrorHandler(logger);

const app: Application = express();

connectDB();

app.use(express.json());

app.use(helmet());

app.use(logger.info);

app.use(userRoute);

// app.use(AuthMiddleware);

app.use(AuthMiddleware);

app.use(routes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(errorHandler.handleError.bind(errorHandler));

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
