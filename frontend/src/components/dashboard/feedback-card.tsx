import React from "react";
import { Card } from "../ui/card";
import { formatDate } from "@/lib/utils";
import { Star } from "lucide-react";

const FeedbackCard = ({ feedback }: { feedback: Feedback }) => {
  return (
    <Card className=" p-3 hover:scale-105 active:scale-100 cursor-pointer">
      <div className="flex flex-col gap-1 text-left">
        <p className="text-preset-2">Name: {feedback.authorName}</p>
        <p
          className="text-preset-3 overflow-hidden text-ellipsis whitespace-nowrap"
          style={{ width: "100%" }}
        >
          Content: {feedback.feedbackContent}
        </p>
        <p>{formatDate(feedback.createdAt)}</p>
      </div>
      {feedback.rating && (
        <div className="mt-4 flex items-center justify-between">
          <p>Rating:</p>
          <div className="flex">
            {Array.from({ length: feedback.rating }, (_, index) => (
              <Star key={index} className="text-yellow-500" />
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default FeedbackCard;
