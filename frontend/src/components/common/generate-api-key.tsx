import React, { useState } from "react";
import { Button } from "../ui/button";
import LoadingButton from "./loading-button";
import { getAPIKey } from "@/hooks/user";
import { PiCopySimple } from "react-icons/pi";
import { toast } from "sonner";

const GenerateApiKey = ({ closeModal }: { closeModal: () => void }) => {
  const [newApiKey, setNewApiKey] = useState<string | null>(null);
  const { mutate: getAPIKeyMutation, isPending } = getAPIKey();

  const handleGenerateApiKey = () => {
    getAPIKeyMutation(undefined, {
      onSuccess: (data) => {
        setNewApiKey(data.apiKey);
      },
    });
  };

  const handleCopyToClipboard = () => {
    if (newApiKey) {
      navigator.clipboard
        .writeText(newApiKey)
        .then(() => {
          toast.success("API Key copied to clipboard!");
        })
        .catch(() => {
          toast.error("Failed to copy API Key. Please try again.");
        });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <p className="text-preset-3">
          Are you sure you want to generate a new API key?
        </p>
        <p className="text-preset-6">
          This will render the previous key invalid and require you to exchange
          it for the new one.
        </p>
        {/* Display the new API Key */}
        {newApiKey && (
          <div className="p-4 bg-gray-100 rounded-md max-w-[460px] w-full">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-700">New API Key:</p>
              <button onClick={handleCopyToClipboard}>
                <PiCopySimple />
              </button>
            </div>
            <p className="mt-1 text-sm text-gray-900 font-mono truncate">
              {newApiKey}
            </p>
          </div>
        )}
      </div>
      <div className="w-full flex gap-3 *:w-1/2">
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <LoadingButton isLoading={isPending} onClick={handleGenerateApiKey}>
          Generate
        </LoadingButton>
      </div>
    </div>
  );
};

export default GenerateApiKey;
