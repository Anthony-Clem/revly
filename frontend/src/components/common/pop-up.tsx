import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useDeleteFolderOrFeedback } from "@/hooks/folders";
import LoadingButton from "./loading-button";

interface PopUpProps {
  children: React.ReactNode;
  type: "folder" | "feedback";
  name: string;
  id: string;
}

const PopUp = ({ children, type, name, id }: PopUpProps) => {
  const { mutate: deleteMutation, isPending } = useDeleteFolderOrFeedback({
    type,
  });

  const handleDelete = () => {
    deleteMutation({ id });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete this {type}?
          </DialogTitle>
          <DialogDescription>({name})</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="w-full *:w-1/2 flex gap-2">
            <Button variant="secondary">Cancel</Button>
            <LoadingButton
              isLoading={isPending}
              variant="destructive"
              onClick={handleDelete}
            >
              Delete
            </LoadingButton>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PopUp;
