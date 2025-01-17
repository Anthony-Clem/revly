"use client";

import { useGetUser } from "@/hooks/user";
import { formatDateTime } from "@/lib/utils";

const ApiKeyPage = () => {
  const { data: user } = useGetUser();

  if (!user) {
    return null;
  }
  return (
    <div>
      <div className="bg-gray-900 text-gray-300 py-4 px-2 max-sm:text-sm flex flex-col sm:flex-row gap-3 sm:gap-0 items-center justify-between">
        <p>API key last time generated:</p>
        {!user.lastTimeGeneratingKey ? (
          <p>No API key generated yet</p>
        ) : (
          <p>{formatDateTime(user.lastTimeGeneratingKey)}</p>
        )}
      </div>
    </div>
  );
};

export default ApiKeyPage;
