import Sidebar from "@/components/sidebar";
import React from "react";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-svh flex">
      <Sidebar />
      {children}
    </main>
  );
};

export default ChatLayout;
