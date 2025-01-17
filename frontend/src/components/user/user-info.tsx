"use client";

import { useGetUser } from "@/hooks/user";
import UserActions from "./user-actions";
import UserIcon from "./user-icon";

const UserInfo = () => {
  const { data: user } = useGetUser();

  if (!user) {
    return null;
  }

  return (
    <section className="mt-auto flex items-center max-md:justify-center gap-3 border-t p-3">
      <UserIcon letter={user.email[0]} className="hidden md:inline-flex" />
      <p className="text-preset-3 truncate hidden md:block">{user.email}</p>
      <UserActions letter={user.email[0]} />
    </section>
  );
};

export default UserInfo;
