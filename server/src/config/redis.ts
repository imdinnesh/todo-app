import { createClient } from "redis";
import { env } from "./env";

export const redisClient = createClient({
  url: env.REDIS_URL,
});

redisClient.on("error", (err) => {
  console.error("[Redis Error]", err);
});

redisClient.on("connect", () => {
  console.log("[Redis] Successfully connected to server");
});

export const connectRedis = async (): Promise<void> => {
  try {
    await redisClient.connect();
  } catch (error: any) {
    console.error("[Redis Connection Failed] Proceeding with in-memory fallback:", error.message);
  }
};
