import { Request, Response, NextFunction } from "express";
import { RouteLogger } from "../Logger/RouteLogger";
export class ErrorHandler {
  constructor(private logger: RouteLogger) {}
  handleError(
    err: any,
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    this.logger.error(request, response, next);
    response
      .status(500)
      .json({ error: err.message || "internal server error" });
  }
}
