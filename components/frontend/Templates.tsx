"use client";
import Link from "next/link";
import * as React from "react";
import { Check, ChevronDown, List } from "lucide-react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-9 w-full items-center justify-between rounded-md bg-zinc-800 px-3 py-2 text-sm text-white shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 min-w-[8rem] overflow-hidden rounded-md bg-zinc-800 text-white shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-zinc-700 focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
import { Badge } from "../ui/badge";
import { LayoutGrid } from "lucide-react";
import TemplateHorizontalCard from "./TemplateCard";
export type TemplateProps = {
  name: string;
  price: number;
  screenShots: string[]; // Array of image URLs or paths
  description: string;
  authorName: string;
  categoryName: string;
  thumbnail: string; // URL or path to the thumbnail image
};

export const templates: TemplateProps[] = [
  {
    name: "Modern Agency Template",
    price: 49,
    screenShots: ["/1.png", "/2.png", "/3.png"],
    description:
      "A sleek and modern template for digital agencies.A sleek and modern template for digital agencies.A sleek and modern template for digital agencies.A sleek and modern template for digital agencies.",
    authorName: "John Doe",
    categoryName: "Agency",
    thumbnail: "/1.jpg",
  },
  {
    name: "Minimal Blog Template",
    price: 19,
    screenShots: ["/1.png", "/2.png", "/3.png"],
    description: "A minimal and clean blog template for content creators.",
    authorName: "Jane Smith",
    categoryName: "Blog",
    thumbnail: "/2.png",
  },
  {
    name: "Ecommerce Storefront",
    price: 99,
    screenShots: ["/1.png", "/2.png", "/3.png"],
    description:
      "A comprehensive template for online stores with payment integrations.",
    authorName: "Alex Johnson",
    categoryName: "Ecommerce",
    thumbnail: "/3.png",
  },
  {
    name: "Health & Wellness",
    price: 35,
    screenShots: ["/1.png", "/2.png", "/3.png"],
    description: "A professional template for health and wellness businesses.",
    authorName: "Emily Turner",
    categoryName: "Health",
    thumbnail: "/4.png",
  },
  {
    name: "SaaS Dashboard",
    price: 0,
    screenShots: ["/1.png", "/2.png", "/3.png"],
    description:
      "A robust SaaS dashboard template for analytics and data visualization.",
    authorName: "Mike Brown",
    categoryName: "SaaS",
    thumbnail: "/5.png",
  },
];

export default function Templates() {
  const [isGrid, setIsGrid] = React.useState(true);
  return (
    <div className="bg-background py-8">
      <div className="max-w-7xl px-4 mx-auto">
        <div className="flex items-center justify-between pb-8">
          <div className="flex space-x-4 ">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Popular" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Popular</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="paid-free">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Paid + Free" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paid-free">Paid + Free</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="free">Free</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-6 items-center">
            <button onClick={() => setIsGrid(!isGrid)}>
              {isGrid ? <LayoutGrid /> : <List />}
            </button>
            <p>14 Templates</p>
          </div>
        </div>
        {isGrid ? (
          <div className="grid lg:grid-cols-4 gap-4  grid-cols-2 md:grid-cols-3">
            {templates.map((item, i) => {
              const price = item.price > 0 ? `$ ${item.price}` : "Free";
              return (
                <Link
                  key={i}
                  href={`/web-templates/slug`}
                  className="rounded-xl overflow-hidden border"
                >
                  <img src={item.thumbnail} alt="" />
                  <div className="px-3 pb-3">
                    <h2 className="py-1.5 font-semibold">{item.name}</h2>
                    <div className="flex items-center justify-between">
                      <Badge className="py-1.5 px-4">{price}</Badge>
                      <p>{item.authorName}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4 py-12">
            {templates.map((item, i) => {
              return <TemplateHorizontalCard data={item} key={i} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
