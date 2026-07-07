import Link from "next/link";
import { ArrowRight, Smartphone, LayoutGrid } from "lucide-react";

// Clean-minimal landing hero introducing the two component libraries + templates.
export default function CleanHero() {
  return (
    <section className="border-b">
      <div className="container mx-auto max-w-5xl px-4 py-20 sm:py-28 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
          Web templates · Simple UI · Expo UI
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
          Ship beautiful UI, faster.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-lg">
          Copy-paste components and full templates for React and React Native —
          built with TypeScript, Tailwind, shadcn/ui and NativeWind. Preview
          live, copy the real source, drop it into your app.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/expo-ui"
            className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            <Smartphone className="h-4 w-4" />
            Browse Expo UI
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/simple-ui"
            className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            <LayoutGrid className="h-4 w-4" />
            Browse Simple UI
          </Link>
        </div>

        <dl className="mx-auto mt-14 grid max-w-lg grid-cols-3 gap-6 border-t pt-8">
          {[
            { n: "52", l: "Expo components" },
            { n: "130+", l: "Web components" },
            { n: "10", l: "Categories" },
          ].map((s) => (
            <div key={s.l}>
              <dt className="text-2xl font-semibold tracking-tight">{s.n}</dt>
              <dd className="mt-1 text-xs text-muted-foreground">{s.l}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
