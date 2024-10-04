import React from "react";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
export type CategoryProps = {
  title: string;
  slug: string;
  description: string;
};

export default function HeroSection({
  title,
  description,
  categories,
  slug = "all",
}: {
  title: string;
  description: string;
  categories: Category[];
  slug?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 dark:from-cyan-900 dark:via-blue-900 dark:to-purple-900">
      <div className="absolute inset-0 bg-grid-white/[0.05] dark:bg-grid-white/[0.02]" />
      <div className="relative px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl drop-shadow-md">
            {/* Beautifully designed website templates */}
            {title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/90 dark:text-white/80 max-w-2xl mx-auto mb-8">
            {/* 100+ beautiful templates and systems built with React, TypeScript,
            Tailwind CSS, and Framer Motion. Save thousands of hours, create a
            beautiful landing page, and convert your visitors into customers. */}
            {description}
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((item) => (
              <Badge
                key={item.slug}
                variant="secondary"
                className={cn(
                  "py-1.5 px-4 text-sm font-medium bg-white/10 hover:bg-white/20 dark:bg-slate-800/50 dark:hover:bg-slate-800/70 transition-colors duration-200",
                  slug === item.slug && "bg-white hover:bg-slate-50"
                )}
              >
                <Link href={`/category/${item.slug}`}>{item.title}</Link>
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
