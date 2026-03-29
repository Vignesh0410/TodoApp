import { Request, Response, NextFunction, RequestHandler } from "express";
import { RedisCache } from "../cache/RedisCache";

const cacheService = new RedisCache();

export function rateLimiter(
  maxRequests: number,
  windowSeconds: number,
): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip;
    const key = `rate_limit:${ip}`;

    const current = parseInt((await cacheService.get(key)) || "0", 10);
    console.log(`Current requests from ${ip}: ${current}`);
    if (current >= maxRequests) {
      return res.status(429).json({ error: "Too many requests" });
    }
    await cacheService.set(key, current + 1, windowSeconds);
    next();
  };
}
