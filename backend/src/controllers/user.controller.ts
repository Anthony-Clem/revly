import crypto from "crypto";
import bcrypt from "bcryptjs";
import UserModel from "../models/user.model";
import { catchErrors } from "../utils/catchErrors";
import z from "zod";

export const getUser = catchErrors(async (req, res) => {
  const user = await UserModel.findById(req.userId);

  if (!user) {
    return res.status(404).json("User not found");
  }

  return res.status(200).json(user);
});

export const generateApiKey = catchErrors(async (req, res) => {
  const user = await UserModel.findById(req.userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const now = new Date();
  if (user.lastTimeGeneratingKey) {
    const lastGeneratedTime = new Date(user.lastTimeGeneratingKey);
    const timeDifference = now.getTime() - lastGeneratedTime.getTime();

    const oneHoursMS = 60 * 60 * 1000;

    if (timeDifference < oneHoursMS) {
      return res.status(429).json({
        message: "You can only generate a new API key once per hour.",
      });
    }
  }

  const generatedKey = crypto.randomBytes(32).toString("hex");
  const apiKey = await bcrypt.hash(generatedKey, 10);

  user.apiKey = apiKey;
  user.lastTimeGeneratingKey = now;
  await user.save();

  return res.status(200).json({ apiKey: generatedKey });
});

export const updateDiscordId = catchErrors(async (req, res) => {
  const id = z.string().parse(req.body.id);

  const user = await UserModel.findByIdAndUpdate(req.userId, {
    discordId: id,
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return res.status(200).json({ message: "Discord Id updated successfully" });
});
