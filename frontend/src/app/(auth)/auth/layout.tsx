import Logo from "@/components/common/logo";
import AuthProvider from "@/components/providers/auth-provider";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <main className="flex flex-col items-center justify-center gap-4 h-screen">
        <Logo className="hidden sm:block" />
        {children}
      </main>
    </AuthProvider>
  );
};

export default AuthLayout;
