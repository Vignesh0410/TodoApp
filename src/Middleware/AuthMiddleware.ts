import { Request, Response, NextFunction } from "express";
import { JwtService } from "../service/JwtService";

const jwtService = new JwtService();

export function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const payload = jwtService.verifyToken(token);
    (req as any).userId = (payload as any).userId;
    next();
  } catch (error: any) {
    return res.status(401).json({ error: error.message });
  }
}
