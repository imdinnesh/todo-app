import express from "express";
import { connectDB } from "./config/db";
import { NotFoundError } from "./utils/api.error";
import { errorHandler } from "./middleware/error.handler";
import { env } from "./config/env";
import { OkResponse } from "./utils/api.response";
import { authRouter } from "./routes/auth.route";
import { taskRoute } from "./routes/task.route";

const app = express();

//===CONNECT DATABASE===
connectDB();

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

//===APP LISTEN===
app.listen(env.PORT, () => {
  console.log(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
});

