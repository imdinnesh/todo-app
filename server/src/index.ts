import { app } from "./app";
import { connectDB } from "./config/db";
import { connectRedis } from "./config/redis";
import { env } from "./config/env";

//===CONNECT DATABASES===
connectDB();
connectRedis();

//===APP LISTEN===
app.listen(env.PORT, () => {
  console.log(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
});

