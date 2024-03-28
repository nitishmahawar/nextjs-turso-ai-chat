import React from "react";
import Markdown from "markdown-to-jsx";
import { Message as MessageProps } from "ai/react";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

const Message: React.FC<MessageProps> = ({ content, role }) => {
  const isUser = role === "user";

  return (
    <article
      className={cn(
        "mb-4 flex items-start gap-4 p-4 md:p-5 rounded-2xl max-w-2xl mx-auto",
        isUser ? "" : "bg-neutral-100"
      )}
    >
      <Avatar isUser={isUser} />
      <Markdown
        className={cn(
          "py-1.5 md:py-1 space-y-4"
          // isUser ? "font-semibold" : ""
        )}
        options={{
          overrides: {
            ol: ({ children }) => <ol className="list-decimal">{children}</ol>,
            ul: ({ children }) => <ol className="list-disc">{children}</ol>,
          },
        }}
      >
        {content}
      </Markdown>
    </article>
  );
};

const Avatar: React.FC<{ isUser?: boolean; className?: string }> = ({
  isUser = false,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center size-8 shrink-0 rounded-full",
        isUser ? "bg-gray-200 text-gray-700" : "bg-neutral-900 text-white",
        className
      )}
    >
      {isUser ? <User size={20} /> : <Bot size={20} />}
    </div>
  );
};

export default Message;
export { Avatar };
