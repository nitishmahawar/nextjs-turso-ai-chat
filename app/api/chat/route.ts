import OpenAI from "openai";
import { Message, OpenAIStream, StreamingTextResponse } from "ai";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Chat } from "@prisma/client";
import prisma from "@/lib/prisma";

export const runtime = "edge";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
// export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { messages, chatId } = await req.json();

    let chat: Chat | null = null;

    const prompt = messages[messages.length - 1].content;

    if (!chatId) {
      chat = await prisma.chat.create({ data: { title: prompt, userId } });
    } else {
      chat = await prisma.chat.findUnique({ where: { id: chatId } });

      if (!chat) {
        return NextResponse.json(
          { message: "Chat not found" },
          { status: 404 }
        );
      }
    }

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages,
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response, {
      async onFinal(completion) {
        await prisma.message.create({
          data: { content: prompt, role: "user", chatId: chat?.id! },
        });
        await prisma.message.create({
          data: { content: completion, role: "assistant", chatId: chat?.id! },
        });
      },
    });
    // Respond with the stream
    return new StreamingTextResponse(stream, { headers: { chatId: chat.id } });
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      return NextResponse.json({ name, status, headers, message }, { status });
    } else {
      throw error;
    }
  }
}
