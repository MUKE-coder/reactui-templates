import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Navigation, Sidebar, LayoutGrid } from "lucide-react";

// Example data structure
const categories = [
  {
    name: "Navigation",
    items: [
      {
        name: "Navbars",
        count: 9,
        icon: Navigation,
        href: "/simple-ui/site-headers",
      },
      {
        name: "Sidebars",
        count: 5,
        icon: Sidebar,
        href: "/components/sidebars",
      },
      {
        name: "Tabs",
        count: 7,
        icon: LayoutGrid,
        href: "/components/tabs",
      },
    ],
  },
];

export default function SimpleUI() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto container py-10">
        <h1 className="text-3xl font-bold mb-8">Component Gallery</h1>
        <div className="space-y-12">
          {categories.map((category) => (
            <section key={category.name} className="space-y-4">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-semibold">{category.name}</h2>
                <span className="text-sm text-muted-foreground">
                  {category.items.length} components
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group relative overflow-hidden rounded-lg border bg-card transition-colors "
                  >
                    <div className="aspect-[16/9] overflow-hidden bg-muted flex items-center justify-center">
                      <item.icon className="w-12 h-12 text-primary transition-transform group-hover:scale-105" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <span className="text-sm text-muted-foreground">
                          {item.count} variants
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
