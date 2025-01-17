"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "../common/modal";

const DashboardPageHeader = () => {
  const [title, setTitle] = useState("Folders");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("documentation")) {
      setTitle("Documentation");
    } else if (pathname.includes("api-key")) {
      setTitle("API Key");
    } else if (pathname === "/dashboard/settings") {
      setTitle("Settings");
    } else if (pathname === "/dashboard/folders") {
      setTitle("Folders");
    } else {
      setTitle("Feedbacks");
    }
  }, [pathname]);

  return (
    <div className="py-5 px-10 mb-5 flex items-center justify-between">
      <h1 className="text-preset-1">{title}</h1>
      {!pathname.includes("documentation") && <Modal pathname={pathname} />}
    </div>
  );
};

export default DashboardPageHeader;
