"use client";

import { useGetUser } from "@/hooks/user";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  const { data: user, isLoading } = useGetUser();

  const [isRedirecting, setIsRedirecting] = React.useState(false);

  React.useEffect(() => {
    if (!isLoading) {
      if (user && pathname.includes("/auth")) {
        setIsRedirecting(true);
        router.replace("/dashboard/folders");
      } else if (!user && pathname.includes("/dashboard")) {
        setIsRedirecting(true);
        router.replace("/auth/login");
      } else {
        setIsRedirecting(false);
      }
    }
  }, [user, pathname, router, isLoading]);

  if (
    isLoading ||
    isRedirecting ||
    (!user && pathname.includes("/dashboard"))
  ) {
    return (
      <div className="h-screen flex items-center justify-center">
        <AiOutlineLoading3Quarters className="size-5 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;
