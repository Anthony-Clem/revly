import z from "zod";
import { catchErrors } from "../utils/catchErrors";
import FolderModel from "../models/folder.model";

export const createFolder = catchErrors(async (req, res) => {
  const folderName = z.string().min(1, "Required").parse(req.body.name);

  const existingFolder = await FolderModel.findOne({
    name: folderName.toLowerCase(),
  });
  console.log(existingFolder);
  if (existingFolder) {
    return res.status(409).json({
      message: "Already have a folder with this name",
    });
  }

  const folder = await FolderModel.create({
    name: folderName,
    userId: req.userId,
  });

  return res.status(201).json(folder);
});

export const getFolders = catchErrors(async (req, res) => {
  const folders = await FolderModel.find({ userId: req.userId });

  return res.status(200).json(folders);
});

export const getFolder = catchErrors(async (req, res) => {
  const folder = await FolderModel.findOne({
    _id: req.params.id,
    userId: req.userId,
  }).populate("feedbacks", "authorName feedbackTitle feedbackContent rating");

  if (!folder) {
    return res.status(404).json({ message: "Folder not found" });
  }

  return res.status(200).json(folder);
});

export const editFolderName = catchErrors(async (req, res) => {
  const folderName = z.string().min(1, "Required").parse(req.body.name);

  const folder = await FolderModel.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    {
      name: folderName,
    },
    { new: true }
  );

  if (!folder) {
    return res.status(404).json({ message: "Folder not found" });
  }

  return res.status(200).json(folder);
});

export const deleteFolder = catchErrors(async (req, res) => {
  const folder = await FolderModel.findOneAndDelete({
    _id: req.params.id,
    userId: req.userId,
  });

  if (!folder) {
    return res.status(404).json({ message: "Folder not found" });
  }

  return res.status(200).json({ message: "Folder deleted successfully" });
});
