import React, { ReactNode } from "react";

export default async function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 lg:px-8">{children}</div>
    </div>
  );
}
