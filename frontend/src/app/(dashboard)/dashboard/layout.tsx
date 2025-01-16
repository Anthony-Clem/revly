import DashboardPageHeader from "@/components/dashboard/dashboard-page-header";
import MobileHeader from "@/components/dashboard/mobile-header";
import Sidebar from "@/components/dashboard/sidebar";
import AuthProvider from "@/components/providers/auth-provider";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen">
      <MobileHeader />
      <div className="h-screen w-full flex">
        <Sidebar />
        <div className="w-full h-full flex flex-col ">
          <DashboardPageHeader />
          <div className="px-10 flex-1">{children}</div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
