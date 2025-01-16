"use client";

import { SIDEBAR_NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SidebarNav = () => {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-5 md:gap-3 pb-4">
      {SIDEBAR_NAV_ITEMS.map((item) => {
        const isActive = pathname.includes(item.href);

        return (
          <Link
            href={item.href}
            key={item.href}
            className={`relative flex items-center max-sm:justify-center gap-3 text-preset-3 py-2 px-3 hover:text-neutral-500 group ${
              isActive ? "text-neutral-500" : ""
            }`}
          >
            <item.icon className="max-md:mx-auto" />
            <span className="hidden md:block">{item.label}</span>
            {/* Animated underline */}
            <span
              className={`absolute bottom-0 left-0 h-[2px] w-full transition-transform duration-300 origin-left ${
                isActive
                  ? "scale-x-100 bg-neutral-500"
                  : "scale-x-0 bg-neutral-500 group-hover:scale-x-100"
              }`}
            ></span>
          </Link>
        );
      })}
    </nav>
  );
};

export default SidebarNav;
