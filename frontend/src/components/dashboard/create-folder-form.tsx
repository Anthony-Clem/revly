import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCreateFolder } from "@/hooks/folders";
import LoadingButton from "../common/loading-button";

interface CreateFolderFormProps {
  closeModal: () => void;
}

const CreateFolderForm = ({ closeModal }: CreateFolderFormProps) => {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { mutate: createFolderMutation, isPending } = useCreateFolder();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name) {
      setError("Required");
      return;
    }

    createFolderMutation(
      { name },
      {
        onSuccess: () => {
          closeModal();
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex items-center justify-between">
        <Label htmlFor="name">Name</Label>
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>

      <Input
        id="name"
        placeholder="Enter folder name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="flex w-full gap-2 *:w-1/2">
        <Button
          variant="secondary"
          type="button"
          onClick={() => {
            setName("");
            closeModal();
          }}
        >
          Cancel
        </Button>
        <LoadingButton isLoading={isPending} type="submit">
          Create
        </LoadingButton>
      </div>
    </form>
  );
};

export default CreateFolderForm;
