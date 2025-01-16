import { axiosInstance } from "@/lib/axios";
import { queryClient } from "@/lib/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const getFolders = () => {
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

export const getFolder = ({ id }: { id: string }) => {
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

export const createFolder = () => {
  return useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      const res = await axiosInstance.post("/folders", { name });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};

export const deleteFolderOrFeedback = ({
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
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};
