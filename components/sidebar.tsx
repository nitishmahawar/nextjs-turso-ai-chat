import prisma from "@/lib/prisma";
import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import SidebarItem from "./sidebar-item";
import { Button } from "./ui/button";
import Link from "next/link";

const Sidebar = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const chats = await prisma.chat.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="w-72 shrink-0 h-full border-r flex flex-col gap-1.5 py-4 px-2.5 ">
      <Button asChild className="w-full">
        <Link href="/">New Chat</Link>
      </Button>
      <div className="flex items-center gap-2">
        <div className="w-full h-px bg-neutral-300"></div>
        <div className="text-xs font-semibold tracking-wide uppercase shrink-0">
          Chat History
        </div>
        <div className="w-full h-px bg-neutral-300"></div>
      </div>
      <div className="grow flex flex-col gap-1.5">
        {chats.map((chat) => (
          <SidebarItem key={chat.id} chat={chat} />
        ))}
      </div>
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
};

export default Sidebar;
