import { Request, Response, NextFunction } from "express";
import { TooManyRequestsError } from "../utils/api.error";
import { redisClient } from "../config/redis";

interface RateLimitConfig {
  windowMs: number; // Duration of the rolling window in milliseconds
  max: number;      // Maximum number of requests allowed in the window
  message?: string; // Optional custom message for error response
}

// Keep the in-memory fallback state in a closure so it persists across requests
const ipRequests = new Map<string, { count: number; resetTime: number }>();

export const rateLimiter = (config: RateLimitConfig) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const ip = req.ip || (req.headers["x-forwarded-for"] as string) || "unknown";

    // 1. High-Performance Path: Redis Rate Limiter
    if (redisClient.isOpen) {
      try {
        const key = `ratelimit:${req.baseUrl || req.path}:${ip}`;
        const count = await redisClient.incr(key);

        // Set TTL on new rate keys
        if (count === 1) {
          const seconds = Math.ceil(config.windowMs / 1000);
          await redisClient.expire(key, seconds);
        }

        // Limit reached
        if (count > config.max) {
          const ttl = await redisClient.ttl(key);
          const secondsLeft = ttl > 0 ? ttl : Math.ceil(config.windowMs / 1000);
          const defaultMessage = `Too many requests from this IP. Please try again in ${secondsLeft} seconds.`;
          return next(new TooManyRequestsError(config.message || defaultMessage));
        }

        return next();
      } catch (redisError: any) {
        console.warn("[Redis Rate Limiter Error] Falling back to in-memory rate limiting:", redisError.message);
        // Fall through to in-memory fallback path
      }
    }

    // 2. High-Availability Fallback Path: In-Memory Rate Limiter
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

