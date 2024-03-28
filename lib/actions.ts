"use server";

import prisma from "./prisma";

export const removeChat = async (chatId: string) => {
  const chat = await prisma.chat.delete({ where: { id: chatId } });

  return chat;
};
