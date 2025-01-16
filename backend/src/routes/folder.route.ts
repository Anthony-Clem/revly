import { Router } from "express";
import {
  createFolder,
  deleteFolder,
  editFolderName,
  getFolder,
  getFolders,
} from "../controllers/folder.controller";

const folderRoutes = Router();

folderRoutes.post("/", createFolder);

folderRoutes.put("/:id", editFolderName);

folderRoutes.delete("/:id", deleteFolder);

folderRoutes.get("/:id", getFolder);
folderRoutes.get("/", getFolders);

export default folderRoutes;
