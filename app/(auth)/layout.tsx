import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-svh flex items-center justify-center">{children}</main>
  );
};

export default AuthLayout;
