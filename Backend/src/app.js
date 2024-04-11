import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app } from "./socket/socket.js";

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import

import router from "./routes/user.route.js";
import messageRouter from "./routes/message.route.js";
import activeUserRouter from "./routes/activeUsers.route.js";

// routes declaration

app.use("/api/v1/users", router);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/active-users", activeUserRouter);

export default app;
