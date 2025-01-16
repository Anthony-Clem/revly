"use client";

import LoadingButton from "@/components/common/loading-button";
import FeedbackCard from "@/components/dashboard/feedback-card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteFolderOrFeedback, getFolder } from "@/hooks/folders";
import { formatDate } from "@/lib/utils";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Star } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const FolderPage = () => {
  const [openFeedbackId, setOpenFeedbackId] = useState<string | null>(null);
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!id) {
    return null;
  }
  const { data: folder } = getFolder({ id });

  const { mutate: deleteFeedback, isPending: deletingFeedbackPending } =
    deleteFolderOrFeedback({ type: "feedback" });
  if (!folder) {
    return null;
  }

  if (!folder.feedbacks || folder.feedbacks.length === 0) {
    return (
      <div className="flex flex-col gap-2 h-full items-center sm:justify-center">
        <p className="text-preset-1">No Feedbacks yet!</p>
        <p className="text-preset-3">
          Connect our api to your code and wait for requests to start coming on!
        </p>
        <p className="text-preset-4 text-gray-500">
          Vist our{" "}
          <Link
            className="font-bold text-blue-500 underline"
            href="/documentation"
          >
            Documentation
          </Link>{" "}
          page to learn more
        </p>
      </div>
    );
  }
  return (
    <div className="flex gap-3 flex-wrap">
      {folder.feedbacks.map((feedback) => (
        <Dialog
          key={feedback._id}
          open={openFeedbackId === feedback._id}
          onOpenChange={() =>
            setOpenFeedbackId((prev) =>
              prev === feedback._id ? null : feedback._id
            )
          }
        >
          <DialogTrigger className="max-w-[300px] w-full">
            <FeedbackCard feedback={feedback} />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Feedback Author: {feedback.authorName}</DialogTitle>
              <DialogDescription>
                Date: {formatDate(feedback.createdAt)}
              </DialogDescription>
              <div className="flex">
                {Array.from({ length: feedback.rating }, (_, index) => (
                  <Star key={index} className="text-yellow-500" />
                ))}
              </div>
            </DialogHeader>
            <div className="max-h-[100px] h-full overflow-y-auto border bg-gray-100 p-1">
              {feedback.feedbackContent}
            </div>

            <LoadingButton
              onClick={() =>
                deleteFeedback(
                  { id: feedback._id },
                  {
                    onSuccess: () => {
                      setOpenFeedbackId(null);
                    },
                  }
                )
              }
              isLoading={deletingFeedbackPending}
              variant="destructive"
            >
              Delete
            </LoadingButton>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default FolderPage;
