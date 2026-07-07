import Link from "next/link";
import { ArrowRight, Copy, Smartphone, Zap } from "lucide-react";
import { expoCategories, expoTotal } from "./categories";

export default function ExpoUiGallery() {
  return (
    <div>
      {/* Hero */}
      <div className="border-b pb-10">
        <span className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
          <Smartphone className="h-3.5 w-3.5" /> React Native · Expo · NativeWind
        </span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
          Expo UI
        </h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          {expoTotal} production-ready React Native components, rendered live in
          your browser and copy-pasteable as real mobile source. Drop them
          straight into your Expo app.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Zap className="h-4 w-4" /> Live previews
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Copy className="h-4 w-4" /> Copy the real source
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Smartphone className="h-4 w-4" /> {expoCategories.length} categories
          </span>
        </div>
      </div>

      {/* Category grid */}
      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {expoCategories.map((c) => (
          <Link
            key={c.slug}
            href={`/expo-ui/${c.slug}`}
            className="group flex items-center gap-4 rounded-xl border bg-card p-4 transition-colors hover:border-foreground/20 hover:bg-muted/40"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-background text-foreground">
              <c.icon className="h-[18px] w-[18px]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <h3 className="text-sm font-medium">{c.name}</h3>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {c.count}
                </span>
              </div>
              <p className="truncate text-[13px] text-muted-foreground">
                {c.description}
              </p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
          </Link>
        ))}
      </div>
    </div>
  );
}
