"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetUser, useUpdateDiscordId } from "@/hooks/user";
import React, { useState } from "react";

const SettingsPage = () => {
  const { data: user } = useGetUser();
  const [discordId, setDiscordId] = useState(user?.discordId || "");
  const { mutate: updateDiscordIdMutation } = useUpdateDiscordId();

  if (!user) {
    return null;
  }

  const handleSubmit = () => {
    if (!discordId) return null;
    updateDiscordIdMutation({ id: discordId });
  };
  return (
    <div>
      <p className="text-preset-5">
        Enter discord ID to recieve instant messages via discord
      </p>
      <div className="flex flex-col gap-2">
        <h1>Discord ID</h1>
        <Input
          placeholder="Enter your discord ID"
          value={discordId}
          onChange={(e) => setDiscordId(e.target.value)}
        />
        <Button className="ml-auto" onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
