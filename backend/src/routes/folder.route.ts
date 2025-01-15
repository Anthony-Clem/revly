import { Router } from "express";
import {
  createFolder,
  editFolderName,
  getFolder,
  getFolders,
} from "../controllers/folder.controller";

const folderRoutes = Router();

folderRoutes.post("/", createFolder);

folderRoutes.put("/:id", editFolderName);

folderRoutes.get("/:id", getFolder);
folderRoutes.get("/", getFolders);

export default folderRoutes;
