import { Router } from "express";
import {
  generateApiKey,
  getUser,
  updateDiscordId,
} from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/", getUser);
userRoutes.get("/generate/api-key", generateApiKey);
userRoutes.post("/discord", updateDiscordId);

export default userRoutes;
