import express from "express";
import { NotFoundError } from "./utils/api.error";
import { errorHandler } from "./middleware/error.handler";
import { OkResponse } from "./utils/api.response";
import { authRouter } from "./routes/auth.route";
import { taskRoute } from "./routes/task.route";

export const app = express();

//===MIDDLEWARES===
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//===HEATHCHECK ROUTE===
app.get("/health", (_req, res) => {
    new OkResponse("Healthy").send(res);
});

//===ROUTERS===
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/tasks", taskRoute)

//===NO ROUTE ERROR HANDLER===
app.use((_req, _res, next) => {
    next(new NotFoundError("Route not found"));
});

//===GLOBAL ERROR HANDLER===
app.use(errorHandler);
