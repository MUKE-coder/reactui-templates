const templateCategories: string[] = [
  "All",
  "3D",
  "Agency",
  "AI",
  "Animated",
  "App",
  "Blog",
  "Brand Guidelines",
  "Business",
  "Changelog",
  "Documentation",
  "Ecommerce",
  "Education",
  "Entertainment",
  "Food",
  "Free",
  "Health",
  "Landing Page",
  "Membership",
  "Minimal",
  "Modern",
  "New",
  "News",
  "Personal",
  "Photography",
  "Podcast",
  "Portfolio",
  "Real Estate",
  "Restaurant",
  "Resume",
  "SaaS",
  "Sidebar",
  "Splash",
  "Startup",
  "Tech",
  "Web3",
];

import React from "react";
import { Badge } from "../ui/badge";
import Link from "next/link";

export default function HomeCategories() {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-8">
      {templateCategories.map((item) => (
        <Badge
          key={item}
          variant="secondary"
          className="py-1.5 px-4 text-sm font-medium bg-white/10 hover:bg-white/20 dark:bg-slate-800/50 dark:hover:bg-slate-800/70 transition-colors duration-200"
        >
          <Link href="#">{item}</Link>
        </Badge>
      ))}
    </div>
  );
}
