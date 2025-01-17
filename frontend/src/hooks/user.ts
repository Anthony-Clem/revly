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

export const getUser = () => {
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

export const getAPIKey = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.get("/user/generate/api-key");
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("API Key generated");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};

export const updateDiscordId = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const res = await axiosInstance.post("/user/discord", { id });
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Discord Id updated");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};
