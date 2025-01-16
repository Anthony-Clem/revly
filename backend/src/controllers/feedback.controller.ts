import bcrypt from "bcryptjs";
import { feedbackSchema } from "../lib/schemas";
import UserModel from "../models/user.model";
import { catchErrors } from "../utils/catchErrors";
import FolderModel from "../models/folder.model";
import FeedbackModel from "../models/feedback.model";

export const createFeedback = catchErrors(async (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(400).json({ message: "Authorization header required" });
  }

  const apiKey = authHeader.split(" ")[1];
  if (!apiKey) {
    return res.status(400).json({ message: "API Key is required" });
  }

  const users = await UserModel.find();
  const user = await Promise.all(
    users.map(async (user) => ({
      user,
      match: await bcrypt.compare(apiKey, user.apiKey),
    }))
  ).then((results) => results.find(({ match }) => match)?.user);

  if (!user) {
    return res.status(400).json({ message: "Invalid API Key" });
  }

  const { folderName, feedbackContent, feedbackTitle, authorName, rating } =
    feedbackSchema.parse(req.body);

  if (!feedbackContent && !rating) {
    return res
      .status(400)
      .json({ message: "Must have feedback content or rating" });
  }

  //TODO Add a user prefrence allowing the automated creation of folders through this route

  const folder = await FolderModel.findOne({ name: folderName });
  if (!folder) {
    return res.status(404).json({ message: "Folder not found" });
  }

  const feedback = await FeedbackModel.create({
    folderName,
    feedbackContent,
    feedbackTitle,
    authorName,
    rating,
    userId: user._id,
  });

  folder.feedbacks.push(feedback.id);
  await folder.save();

  return res.status(200).json(feedback);
});

export const deleteFeedback = catchErrors(async (req, res) => {
  const feedbackToDelete = await FeedbackModel.findOne({
    userId: req.userId,
    _id: req.params.id,
  });

  if (!feedbackToDelete) {
    return res.status(404).json({ message: "Feedback not found" });
  }

  const folder = await FolderModel.findOne({
    name: feedbackToDelete.folderName,
  });
  if (!folder) {
    return res.status(404).json({ message: "Folder not found" });
  }

  folder.feedbacks = folder.feedbacks.filter(
    (feedback) => String(feedback) !== String(feedbackToDelete._id)
  );

  await folder.save();

  await feedbackToDelete.deleteOne();

  return res.status(200).json({ message: "Feedback deleted successfully" });
});
