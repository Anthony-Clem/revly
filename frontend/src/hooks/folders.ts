/* eslint-disable @typescript-eslint/no-explicit-any */

import { axiosInstance } from "@/lib/axios";
import { queryClient } from "@/lib/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

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

type ErrorResponse = {
  response?: {
    data?: {
      message: string;
    };
  };
};

export const useGetFolders = () => {
  return useQuery<Folder[] | null>({
    queryKey: ["folders"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/folders");
        return res.data;
      } catch (error: any) {
        if (error.response) {
          console.log(error.response.data.message || "Something went wrong");
        }
        return null;
      }
    },
  });
};

export const useGetFolder = ({ id }: { id: string }) => {
  return useQuery<Folder | null>({
    queryKey: ["folder"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`/folders/${id}`);
        return res.data;
      } catch (error: any) {
        if (error.response) {
          console.log(error.response.data.message || "Something went wrong");
        }
        return null;
      }
    },
    refetchInterval: 60000,
  });
};

export const useCreateFolder = () => {
  return useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      const res = await axiosInstance.post("/folders", { name });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};

export const useDeleteFolderOrFeedback = ({
  type,
}: {
  type: "folder" | "feedback";
}) => {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const res = await axiosInstance.delete(`/${type}s/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      queryClient.invalidateQueries({ queryKey: ["folder"] });
      toast.success(`${type} deleted successfully`);
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};
