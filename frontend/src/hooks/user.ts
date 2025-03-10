/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { axiosInstance } from "@/lib/axios";
import { queryClient } from "@/lib/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

interface User {
  _id: string;
  email: string;
  discordId: string;
  lastTimeGeneratingKey: string;
}

type ErrorResponse = {
  response?: {
    data?: {
      message: string;
    };
  };
};

export const useGetUser = () => {
  return useQuery<User | null>({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/user");
        return res.data;
      } catch (error: any) {
        if (error.response) {
          console.log(error.response.data.message || "Something went wrong");
        } else {
          toast.error("Network error or server not reachable");
        }
        return null;
      }
    },
    retry: false,
  });
};

export const useGetAPIKey = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.get("/user/generate/api-key");
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("API Key generated");
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};

export const useUpdateDiscordId = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const res = await axiosInstance.post("/user/discord", { id });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Discord Id updated");
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};
