"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { expoCategories, expoTotal } from "@/app/(ui)/expo-ui/categories";

export default function ExpoSidebar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Expo UI categories"
      className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:w-60 lg:shrink-0"
    >
      <Link
        href="/expo-ui"
        className="hidden lg:flex items-center gap-2 px-3 pb-4 mb-2 border-b"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
          <Smartphone className="h-4 w-4" />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-sm font-semibold">Expo UI</span>
          <span className="text-[11px] text-muted-foreground">
            {expoTotal} components
          </span>
        </span>
      </Link>

      {/* Mobile: horizontal scroll. Desktop: vertical list. */}
      <ul className="flex gap-1 overflow-x-auto pb-2 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:pb-0">
        {expoCategories.map((c) => {
          const href = `/expo-ui/${c.slug}`;
          const active = pathname === href;
          return (
            <li key={c.slug} className="shrink-0">
              <Link
                href={href}
                className={cn(
                  "group flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors whitespace-nowrap",
                  active
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                <c.icon
                  className={cn(
                    "h-4 w-4 shrink-0",
                    active ? "text-foreground" : "text-muted-foreground"
                  )}
                />
                <span className="flex-1">{c.name}</span>
                <span
                  className={cn(
                    "hidden lg:inline text-xs tabular-nums",
                    active ? "text-muted-foreground" : "text-muted-foreground/60"
                  )}
                >
                  {c.count}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
