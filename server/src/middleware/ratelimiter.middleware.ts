import { Request, Response, NextFunction } from "express";
import { TooManyRequestsError } from "../utils/api.error";

interface RateLimitConfig {
  windowMs: number; // Duration of the rolling window in milliseconds
  max: number;      // Maximum number of requests allowed in the window
  message?: string; // Optional custom message for error response
}

export const rateLimiter = (config: RateLimitConfig) => {
  const ipRequests = new Map<string, { count: number; resetTime: number }>();

  return (req: Request, _res: Response, next: NextFunction) => {
    const ip = req.ip || (req.headers["x-forwarded-for"] as string) || "unknown";
    const now = Date.now();

    const requestData = ipRequests.get(ip);

    if (!requestData) {
      ipRequests.set(ip, { count: 1, resetTime: now + config.windowMs });
      return next();
    }

    // If the window has expired, reset the tracking for this IP
    if (now > requestData.resetTime) {
      ipRequests.set(ip, { count: 1, resetTime: now + config.windowMs });
      return next();
    }

    // If the count exceeds the max allowed requests, reject the call
    if (requestData.count >= config.max) {
      const secondsLeft = Math.ceil((requestData.resetTime - now) / 1000);
      const defaultMessage = `Too many requests from this IP. Please try again in ${secondsLeft} seconds.`;
      return next(new TooManyRequestsError(config.message || defaultMessage));
    }

    // Increment request count
    requestData.count++;
    next();
  };
};
