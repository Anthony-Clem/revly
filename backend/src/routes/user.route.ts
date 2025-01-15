import { Router } from "express";
import authRoutes from "./auth.route";
import { generateApiKey, getUser } from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/", getUser);
userRoutes.get("/generate/api-key", generateApiKey);

export default userRoutes;
