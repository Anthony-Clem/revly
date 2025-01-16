import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { IoEllipsisVertical } from "react-icons/io5";
import { Button } from "../ui/button";
import { logout } from "@/hooks/auth";
import UserIcon from "./user-icon";

const UserActions = ({ letter }: { letter: string }) => {
  const { mutate: logoutMutation } = logout();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full size-8" variant="ghost">
          <IoEllipsisVertical className="hidden md:block" />
          <UserIcon letter={letter} className="md:hidden" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem>Theme</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive font-bold"
          onClick={() => logoutMutation()}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserActions;
