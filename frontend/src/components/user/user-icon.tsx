import { cn } from "@/lib/utils";
import React from "react";

interface UserIconsProps {
  letter: string;
  className?: string;
}

const UserIcon = ({ letter, className }: UserIconsProps) => {
  return (
    <p
      className={cn(
        "uppercase border size-6 p-4 rounded-full inline-flex  items-center justify-center",
        className
      )}
    >
      {letter}
    </p>
  );
};

export default UserIcon;
