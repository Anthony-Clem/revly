"use client";

import { axiosInstance } from "@/lib/axios";
import { queryClient } from "@/lib/queryClient";
import { loginSchema, registerSchema } from "@/lib/schemas";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export const register = () => {
  return useMutation({
    mutationFn: async (data: z.infer<typeof registerSchema>) => {
      const res = await axiosInstance.post("/auth/register", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};

export const login = () => {
  return useMutation({
    mutationFn: async (data: z.infer<typeof loginSchema>) => {
      const res = await axiosInstance.post("/auth/login", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};

export const logout = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.get("/auth/logout");
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};
