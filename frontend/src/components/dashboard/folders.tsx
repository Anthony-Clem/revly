"use client";

import { getFolders } from "@/hooks/folders";
import { Card, CardContent, CardHeader } from "../ui/card";
import { formatDate } from "@/lib/utils";
import { FaTrash } from "react-icons/fa";
import PopUp from "../common/pop-up";
import Link from "next/link";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Folders = () => {
  const { data: folders, isPending } = getFolders();

  if (isPending) {
    return (
      <div className="size-full flex items-center justify-center">
        <AiOutlineLoading3Quarters className="animate-spin size-4" />
      </div>
    );
  }

  if (!folders || folders.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <p className="text-preset-1">No folders yet!</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-stretch gap-2 flex-wrap">
      {folders.map((folder) => (
        <Card key={folder._id} className="sm:w-[200px] w-full">
          <CardHeader>
            <div className="flex flex-row items-center justify-between">
              <Link
                href={`/dashboard/folders/${folder._id}`}
                className="text-preset-2 capitalize truncate cursor-pointer hover:text-blue-600 transition"
              >
                {folder.name}
              </Link>
              <PopUp type="folder" id={folder._id} name={folder.name}>
                <FaTrash className="hover:text-destructive transition cursor-pointer" />
              </PopUp>
            </div>
          </CardHeader>
          <CardContent className="flex">
            <p className="ml-auto text-preset-5 text-muted-foreground">
              {formatDate(folder.createdAt)}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Folders;
