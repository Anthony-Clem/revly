import { Dialog } from "@radix-ui/react-dialog";
import React, { useState } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa";
import CreateFolderForm from "../dashboard/create-folder-form";
import GenerateApiKey from "./generate-api-key";

const Modal = ({ pathname }: { pathname: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isFolderRoute = pathname.includes("folders");

  const closeModal = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FaPlus />
          <span className="sm:block hidden">
            {" "}
            New {isFolderRoute ? "Folder" : "API Key"}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isFolderRoute ? "Create a new Folder" : "Generate API Key"}
          </DialogTitle>
        </DialogHeader>
        {isFolderRoute ? (
          <CreateFolderForm closeModal={closeModal} />
        ) : (
          <GenerateApiKey closeModal={closeModal} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
