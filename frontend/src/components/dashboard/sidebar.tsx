import React from "react";
import UserInfo from "../user/user-info";
import Logo from "../common/logo";
import SidebarNav from "./sidebar-nav";

const Sidebar = () => {
  return (
    <aside className="hidden sm:flex flex-col w-[80px] md:max-w-[250px] md:w-full border-r">
      <div className="space-y-10">
        <div className="p-3">
          <Logo />
        </div>
        <SidebarNav />
      </div>
      <UserInfo />
    </aside>
  );
};

export default Sidebar;
