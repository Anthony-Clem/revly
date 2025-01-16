"use client";

import { getUser } from "@/hooks/user";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  const { data: user, isLoading } = getUser();

  React.useEffect(() => {
    if (!isLoading) {
      if (user && pathname.includes("/auth")) {
        router.replace("/dashboard/folders");
      } else if (!user && pathname.includes("/dashboard")) {
        router.replace("/auth/login");
      }
    }
  }, [user, pathname, router, isLoading]);

  if (isLoading || (user && pathname.includes("/auth"))) {
    return (
      <div className="h-screen flex items-center justify-center">
        <AiOutlineLoading3Quarters className="size-5 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;
