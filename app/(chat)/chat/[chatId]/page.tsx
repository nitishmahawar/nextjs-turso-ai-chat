import Chat from "@/components/chat";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { Message } from "ai";
import { notFound, redirect } from "next/navigation";
import React from "react";

export const runtime = "edge";

const Page = async ({ params: { chatId } }: { params: { chatId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const chat = await prisma.chat.findUnique({
    where: { id: chatId, userId },
    include: { messages: true },
  });

  if (!chat) {
    return notFound();
  }

  const vercelAIMessages: Message[] = chat.messages.map(
    ({ id, role, content }) => ({ id, role: role as Message["role"], content })
  );

  return <Chat initialMessages={vercelAIMessages} chatId={chatId} />;
};

export default Page;
