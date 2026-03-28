import { Request, Response, NextFunction } from "express";
export function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey) {
    return res.status(401).json("Unauthorized");
  }
  next();
}
