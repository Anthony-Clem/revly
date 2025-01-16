type Folder = {
  _id: string;
  name: string;
  feedbacks: Feedback[];
  createdAt: string;
  updatedAt: string;
};

type Feedback = {
  _id: string;
  folderName: string;
  authorName: string;
  feedbackTitle: string;
  feedbackContent: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
};
