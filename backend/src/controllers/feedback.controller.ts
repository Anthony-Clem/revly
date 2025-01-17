import bcrypt from "bcryptjs";
import { feedbackSchema } from "../lib/schemas";
import UserModel from "../models/user.model";
import { catchErrors } from "../utils/catchErrors";
import FolderModel from "../models/folder.model";
import FeedbackModel from "../models/feedback.model";
import { DiscordClient } from "../lib/discord-client";
import { DISCORD_BOT_TOKEN } from "../config/env";

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

  if (rating && rating > 5) {
    return res.status(400).json({
      message: "Ratings must be out of 5",
    });
  }

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

  if (user.discordId) {
    const discord = new DiscordClient(DISCORD_BOT_TOKEN);

    const dmChannel = await discord.createDM(user.discordId);
    await discord.sendEmbed(dmChannel.id, {
      title: "New Feedback Received",
      description: "You have received new feedback!",
      fields: [
        { name: "Title", value: feedbackTitle || "No Title", inline: true },
        { name: "Author", value: authorName || "Anonymous", inline: true },
        {
          name: "Rating",
          value: rating ? `${rating}/5` : "No Rating",
          inline: true,
        },
        {
          name: "Content",
          value: feedbackContent || "No Feedback Content",
        },
        { name: "Folder", value: folderName, inline: true },
      ],
      color: 0x00ff00, // Optional: Green color for success
      footer: {
        text: "Feedback System",
        icon_url: "https://example.com/logo.png", // Optional: Footer icon
      },
      timestamp: new Date().toISOString(),
    });
  }

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
