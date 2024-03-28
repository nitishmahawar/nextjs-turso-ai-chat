"use client";
import { Input } from "@/components/ui/input";
import { useChat, Message as MessageProps } from "ai/react";
import { useRouter } from "next/navigation";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import PoweredBy from "./powered-by";
import ChatInput from "./chat-input";
import { cn } from "@/lib/utils";
import MessageLoading from "./message-loading";
import Message from "./message";

interface ChatProps {
  initialMessages: MessageProps[];
  chatId?: string;
}

const Chat: FC<ChatProps> = ({ initialMessages, chatId }) => {
  const [streaming, setStreaming] = useState(false);
  const chatIdRef = useRef<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    body: {
      chatId,
    },
    onResponse(response) {
      const resChatId = response.headers.get("chatId");
      chatIdRef.current = resChatId || "";
      setStreaming(false);
    },
    initialMessages,
    onFinish(message) {
      router.push(`/chat/${chatIdRef.current}`);
      router.refresh();
    },
  });

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [messages]);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSubmit(e);
      setStreaming(true);
    },
    [handleSubmit]
  );

  return (
    <main className="relative w-full p-4 md:p-6 flex grow !pb-32 md:!pb-40 overflow-y-auto">
      <div className="w-full grow">
        {messages.map((message) => {
          return <Message key={message.id} {...message} />;
        })}

        {/* loading */}
        {streaming && <MessageLoading />}

        {/* bottom ref */}
        <div ref={messagesEndRef} />
      </div>

      <div
        className={cn(
          "fixed z-10 bottom-0 inset-x-0 md:ml-72",
          "flex justify-center items-center",
          "bg-white"
        )}
      >
        <span
          className="absolute bottom-full h-10 inset-x-0 from-white/0
       bg-gradient-to-b to-white pointer-events-none"
        />

        <div className="w-full max-w-screen-md rounded-xl px-4 md:px-5 py-4">
          <ChatInput
            ref={formRef}
            onSubmit={onSubmit}
            inputProps={{
              // disabled: streaming,
              value: input,
              onChange: handleInputChange,
              autoFocus: true,
            }}
            buttonProps={{
              disabled: streaming,
            }}
          />

          <PoweredBy />
        </div>
      </div>
    </main>
  );
};

export default Chat;
