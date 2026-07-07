import { ReactNode } from "react";
import ExpoSidebar from "@/components/expo-ui/ExpoSidebar";

export default function ExpoUiLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:py-10">
      <div className="lg:flex lg:gap-10">
        <ExpoSidebar />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
