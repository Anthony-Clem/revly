import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";

import { PORT } from "./config/env";
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

app.use("/api/auth", authRoutes);
app.use("/api/user", authenticate, userRoutes);
app.use("/api/folders", authenticate, folderRoutes);
app.use("/api/feedbacks", feedbackRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
  connectDB();
});
