import mongoose from "mongoose";
import { FeedbackDocument } from "./feedback.model";

interface FolderDocument extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId;
  name: string;
  feedbacks: mongoose.Schema.Types.ObjectId[];
}

const folderSchema = new mongoose.Schema<FolderDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    feedbacks: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Feedback",
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

folderSchema.pre("findOneAndDelete", async function (next) {
  const folderId = this.getQuery()._id;
  await mongoose.model("Feedback").deleteMany({ folderId });
  next();
});

const FolderModel = mongoose.model<FolderDocument>("Folder", folderSchema);
export default FolderModel;
