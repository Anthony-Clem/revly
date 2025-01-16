import React from "react";
import Logo from "../common/logo";
import { MenuIcon } from "lucide-react";

const MobileHeader = () => {
  return (
    <header className="sm:hidden p-4 border-b flex items-center justify-between">
      <Logo />

      <MenuIcon />
    </header>
  );
};

export default MobileHeader;
