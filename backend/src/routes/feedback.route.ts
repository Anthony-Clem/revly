import { Router } from "express";
import {
  createFeedback,
  deleteFeedback,
} from "../controllers/feedback.controller";
import { authenticate } from "../middlewares/authenticate";

const feedbackRoutes = Router();

feedbackRoutes.post("/", createFeedback);
feedbackRoutes.delete("/:id", authenticate, deleteFeedback);

export default feedbackRoutes;
