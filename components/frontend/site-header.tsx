"use client";

import * as React from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ShoppingBag,
  Play,
  MapPin,
  Users,
  Briefcase,
  FileText,
  Newspaper,
  Image,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FaPuzzlePiece } from "react-icons/fa";
import { ModeToggle } from "../mode-toggle";
import { Session } from "next-auth";
import AuthenticatedAvatar from "../AuthenticatedAvatar";

const menuItems = [
  {
    title: "Categories",
    href: "#",
    children: [
      {
        title: "Marketplace",
        description: "Browse templates",
        icon: ShoppingBag,
      },
      { title: "Academy", description: "Watch lessons", icon: Play },
      { title: "Plugins", description: "Ecosystem", icon: FaPuzzlePiece },
    ],
  },
  {
    title: "Systems",
    href: "#",
    children: [
      { title: "Meetups", description: "Upcoming events", icon: MapPin },
      { title: "Partners", description: "Affiliate program", icon: Users },
      { title: "Experts", description: "Jobs", icon: Briefcase },
    ],
  },
  {
    title: "React Native",
    href: "#",
    children: [
      { title: "Updates", description: "Changelog", icon: FileText },
      { title: "Blog", description: "Posts", icon: Newspaper },
      { title: "Gallery", description: "Top sites", icon: Image },
    ],
  },
  // { title: "Enterprise", href: "#" },
  { title: "Pricing", href: "#" },
  // { title: "Contact", href: "#" },
];

export default function SiteHeader({ session }: { session: Session | null }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-foreground">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-none">
          <span className="text-lg font-semibold tracking-tight">React UI</span>
          <span className="text-muted-foreground -mt-0.5 text-[10px] tracking-[0.2em] uppercase">
            Templates
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 text-sm">
          <Link
            href="/"
            className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Templates
          </Link>
          <Link
            href="/simple-ui"
            className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Simple UI
          </Link>
          <Link
            href="/expo-ui"
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Expo UI
            <span className="rounded-full border px-1.5 py-0.5 text-[10px] font-medium leading-none text-foreground">
              New
            </span>
          </Link>
        </nav>
        {/* <nav className="hidden lg:flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.children ? (
                    <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                  ) : (
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  )}
                  {item.children && (
                    <NavigationMenuContent>
                      <div className="w-[400px] p-4 md:w-[500px] lg:w-[600px]">
                        <h3 className="text-lg font-semibold mb-2">
                          {item.title}
                        </h3>
                        <ul className="grid gap-3 md:grid-cols-2">
                          {item.children.map((child) => (
                            <ListItem
                              key={child.title}
                              title={child.title}
                              href="#"
                            >
                              <div className="flex items-center">
                                <div className="bg-white dark:bg-gray-800 p-2 rounded-md mr-3 border ">
                                  <child.icon className="h-5 w-5" />
                                </div>
                                <div>
                                  <div className="font-medium">
                                    {child.title}
                                  </div>
                                  <p className="text-sm text-gray-400">
                                    {child.description}
                                  </p>
                                </div>
                              </div>
                            </ListItem>
                          ))}
                        </ul>
                      </div>
                    </NavigationMenuContent>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav> */}
        <div className="hidden lg:flex items-center space-x-4">
          <ModeToggle />
          {session ? (
            <AuthenticatedAvatar session={session} />
          ) : (
            <>
              <Button className="" variant="outline" size="sm">
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm">
                <Link href="/register">Sign up</Link>
              </Button>
            </>
          )}
        </div>
        <div className="flex lg:hidden items-center space-x-4">
          <ModeToggle />
          {session ? (
            <AuthenticatedAvatar session={session} />
          ) : (
            <>
              <Button className="" variant="outline" size="sm">
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm">
                <Link href="/register">Sign up</Link>
              </Button>
            </>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] bg-black text-white"
            >
              <nav className="flex flex-col space-y-4">
                {menuItems.map((item) => (
                  <div key={item.title}>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    {item.children && (
                      <ul className="space-y-2 ml-4">
                        {item.children.map((child) => (
                          <li
                            key={child.title}
                            className="flex items-center space-x-2"
                          >
                            <div className="bg-gray-800 p-1 rounded-md">
                              <child.icon className="h-4 w-4" />
                            </div>
                            <Link href="#" className="text-sm hover:underline">
                              {child.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-slate-600 dark:hover:bg-gray-800 dark:hover:hover:text-white dark:focus:bg-gray-800 focus:text-white",
            className
          )}
          {...props}
        >
          {children}
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
