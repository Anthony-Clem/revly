import "dotenv/config";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

import { CLIENT_URL, NODE_ENV, PORT } from "./config/env";
import { connectDB } from "./config/db";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/auth.route";
import folderRoutes from "./routes/folder.route";
import { authenticate } from "./middlewares/authenticate";
import userRoutes from "./routes/user.route";
import feedbackRoutes from "./routes/feedback.route";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/user", authenticate, userRoutes);
app.use("/api/folders", authenticate, folderRoutes);
app.use("/api/feedbacks", cors(), feedbackRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port:${PORT} in ${NODE_ENV} environment`);
  connectDB();
});
