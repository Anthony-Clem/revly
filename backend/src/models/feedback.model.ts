import mongoose from "mongoose";

export interface FeedbackDocument extends mongoose.Document {
  folderName: string;
  authorName?: string;
  feedbackTitle?: string;
  feedbackContent?: string;
  rating?: number;
  userId: mongoose.Schema.Types.ObjectId;
}

const feedbackSchema = new mongoose.Schema<FeedbackDocument>(
  {
    folderName: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      default: "Anonymous",
    },
    feedbackTitle: {
      type: String,
      default: new Date().toLocaleDateString("en-US"),
    },
    feedbackContent: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      default: null,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const FeedbackModel = mongoose.model<FeedbackDocument>(
  "Feedback",
  feedbackSchema
);
export default FeedbackModel;
