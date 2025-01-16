import { FaRegFolderOpen } from "react-icons/fa";
import { IoDocumentOutline } from "react-icons/io5";
import { LuKeyRound } from "react-icons/lu";

export const SIDEBAR_NAV_ITEMS = [
  {
    icon: FaRegFolderOpen,
    label: "Folders",
    href: "/dashboard/folders",
  },
  {
    icon: IoDocumentOutline,
    label: "Documentation",
    href: "/dashboard/documentation",
  },
  {
    icon: LuKeyRound,
    label: "API Key",
    href: "/dashboard/api-key",
  },
];
