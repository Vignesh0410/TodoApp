import { NextFunction, Request, Response } from "express";
export class RouteLogger {
  info(req: Request, res: Response, next: NextFunction) {
    console.log(`[INFO] [${new Date().toISOString()}] ${req.url}`);
    next();
  }

  warn(req: Request, res: Response, next: NextFunction) {
    console.error(`[WARN] [${new Date().toISOString()}] ${req.url}`);
    next();
  }

  error(req: Request, res: Response, next: NextFunction) {
    console.error(`[ERROR] [${new Date().toISOString()}] ${req.url}`);
    next();
  }
}
