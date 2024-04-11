import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app } from "./socket/socket.js";
import path from "path";

const __dirname = path.resolve();

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

app.use(express.static(path.join(__dirname, "/frontend/vite-project/dist")));

// routes import

import router from "./routes/user.route.js";
import messageRouter from "./routes/message.route.js";
import activeUserRouter from "./routes/activeUsers.route.js";

// routes declaration

app.use("/api/v1/users", router);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/active-users", activeUserRouter);
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "frontend", "vite-project", "dist", "index.html"),
  );
});

export default app;
