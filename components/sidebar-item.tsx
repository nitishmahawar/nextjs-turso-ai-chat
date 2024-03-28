"use client";
import { removeChat } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { Chat } from "@prisma/client";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { FC } from "react";

interface SidebarItemProps {
  chat: Chat;
}

const SidebarItem: FC<SidebarItemProps> = ({ chat }) => {
  const pathname = usePathname();
  const isActive = `/chat/${chat.id}` === pathname;
  const router = useRouter();
  const handleClick = async () => {
    await removeChat(chat.id);
    router.push("/");
    router.refresh();
  };

  return (
    <Link
      href={`/chat/${chat.id}`}
      className={cn(
        "px-2.5 py-2 rounded-md flex items-center justify-between",
        isActive ? "bg-neutral-200/60" : "hover:bg-neutral-200/40"
      )}
    >
      <span className="break-all truncate font-medium">{chat.title}</span>
      <button onClick={handleClick}>
        <Trash2 size={16} />
      </button>
    </Link>
  );
};

export default SidebarItem;
