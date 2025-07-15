"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import {
  ChevronDown,
  ShoppingCart,
  Bell,
  Heart,
  Search,
  Code2,
  Menu,
  User,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sparkles,
  TrendingUp,
  Home,
  Tag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Type definitions
export interface NavProps {
  searchQuery?: string;
  user?: User | null;
}

export interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface ProductSuggestion {
  id: string;
  title: string;
  slug: string;
  image?: string;
  category?: string;
}

// Dummy data for product suggestions
const dummySuggestions: ProductSuggestion[] = [
  {
    id: "1",
    title: "Premium Bluetooth Headphones",
    slug: "premium-bluetooth-headphones",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    category: "Electronics",
  },
  {
    id: "2",
    title: "Smartwatch Pro Series",
    slug: "smartwatch-pro-series",
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNtYXJ0JTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    category: "Wearables",
  },
  {
    id: "3",
    title: "Leather Laptop Sleeve",
    slug: "leather-laptop-sleeve",
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGxhcHRvcCUyMGJhZ3xlbnwwfHwwfHx8MA%3D&auto=format&fit=crop&w=500&q=60",
    category: "Accessories",
  },
  {
    id: "4",
    title: "Organic Cotton T-shirt",
    slug: "organic-cotton-t-shirt",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRzaGlydHxlbnwwfHwwfHx8MA%3D&auto=format&fit=crop&w=500&q=60",
    category: "Clothing",
  },
];

// Dummy data for departments
interface Department {
  id: string;
  title: string;
  slug: string;
}

// Simplified departments data without categories and subcategories
const dummyDepartments: Department[] = [
  {
    id: "1",
    title: "Electronics",
    slug: "electronics",
  },
  {
    id: "2",
    title: "Fashion",
    slug: "fashion",
  },
  {
    id: "3",
    title: "Home & Kitchen",
    slug: "home-kitchen",
  },
  {
    id: "4",
    title: "Beauty & Personal Care",
    slug: "beauty-personal-care",
  },
  {
    id: "5",
    title: "Sports & Outdoors",
    slug: "sports-outdoors",
  },
  {
    id: "6",
    title: "Toys & Games",
    slug: "toys-games",
  },
];

// Animation variants for cart count
const cartCountVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 15,
    },
  },
  exit: { scale: 0.8, opacity: 0 },
};

// Logo Component
function Logo({
  variant = "light",
  size = "md",
  full = true,
  href = "/",
}: {
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  full?: boolean;
  href?: string;
}) {
  if (variant === "light") {
    return (
      <Link href={href} className="flex items-center space-x-2">
        <div className="bg-[#404553] rounded-full p-1">
          <span className="font-bold text-xl text-white">
            <Code2 className={cn("w-6 h-6", size === "lg" && "w-10 h-10")} />
          </span>
        </div>
        <span
          className={cn(" font-black text-xl", size === "lg" && "text-4xl")}
        >
          Simple UI
        </span>
      </Link>
    );
  } else {
    return (
      <Link href={"/"} className="flex items-center space-x-2">
        <div className="bg-white rounded-full p-1">
          <span className="text-blue-800 font-bold text-xl">
            <Code2 />
          </span>
        </div>
        <span className="font-bold text-xl">Simple UI</span>
      </Link>
    );
  }
}

// User Dropdown Component
function UserDropdownMenu({
  username,
  email,
  avatarUrl,
}: {
  username: string;
  email: string;
  avatarUrl?: string;
}) {
  const handleLogout = async () => {
    console.log("Logging out...");
  };

  const handleUpgrade = () => {
    console.log("Upgrading to Pro...");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 px-2 hover:bg-transparent hover:text-orange-500"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl} alt={username} />
            <AvatarFallback className="text-xs">{username[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex flex-col space-y-1 p-2">
          <p className="text-sm font-medium leading-none">{username}</p>
          <p className="text-xs leading-none text-muted-foreground">{email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleUpgrade} className="cursor-pointer">
          <Sparkles className="mr-2 h-4 w-4" />
          <span>Upgrade to Pro</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link className="flex items-center gap-1" href="/dashboard/orders">
            <DropdownMenuItem>
              <ShoppingCart className="mr-2 h-4 w-4" />
              <span>Orders</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <Link className="flex items-center gap-1" href="/dashboard">
              <TrendingUp className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              className="flex items-center gap-1"
              href="/dashboard/notifications"
            >
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Search Input Component
function SearchInput({
  className = "",
  initialQuery = "",
}: {
  className?: string;
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery || "");
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch suggestions when query changes (using dummy data)
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        // Filter dummy suggestions based on query
        const filtered = dummySuggestions.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(filtered);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      console.log(`Searching for: ${query}`);
      setIsFocused(false);
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSearch} className="w-full">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="What are you looking for?"
            className="w-full border rounded-lg outline-none  border-gray-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-0  focus:border-blue-500 transition-all"
            aria-label="Search"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            aria-label="Search"
          >
            <Search className="h-5 w-5 text-gray-400" />
          </motion.button>
        </div>
      </form>

      {/* Suggestions dropdown */}
      <AnimatePresence>
        {isFocused && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden"
          >
            <div className="py-1 max-h-60 overflow-auto">
              {suggestions.map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.slug}`}
                  className="flex items-center px-4 py-2 hover:bg-yellow-50 transition-colors"
                  onClick={() => setIsFocused(false)}
                >
                  {item.image && (
                    <div className="flex-shrink-0 h-10 w-10 mr-3">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={40}
                        height={40}
                        className="h-10 w-10 object-cover rounded"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.title}
                    </p>
                    {item.category && (
                      <p className="text-xs text-gray-500 truncate">
                        {item.category}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Simplified Category Navigation Component (only departments)
function CategoryNav() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Using dummy departments data
  const departments = dummyDepartments;

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="relative border-b border-black/10 bg-[#fcfbf4]">
      <div className="container mx-auto px-4">
        <div className="relative flex items-center justify-between">
          {isLoading ? (
            // Skeleton loader for departments
            <div className="flex items-center gap-8 py-2 pr-16">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Skeleton key={i} className="h-6 w-24 rounded-md" />
              ))}
            </div>
          ) : (
            <div
              ref={scrollContainerRef}
              className="flex items-center gap-8 overflow-x-auto py-2 scrollbar-hide pr-16"
              onScroll={checkScroll}
            >
              {departments.map((department) => (
                <Link
                  key={department.id}
                  href={`/d/${department.slug}`}
                  className={cn(
                    "relative text-base font-semibold whitespace-nowrap hover:text-black/70 transition-colors pb-2"
                  )}
                >
                  {department.title}
                </Link>
              ))}
            </div>
          )}

          {showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50 transition-all z-10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {showRightArrow && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50 transition-all z-10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

// Bottom Tab Navigation Component for Mobile
function BottomTabNavigation() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
      <div className="flex justify-around items-center py-2">
        <Link href="/" className="flex flex-col items-center">
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link href="/categories" className="flex flex-col items-center">
          <Menu className="h-6 w-6" />
          <span className="text-xs mt-1">Categories</span>
        </Link>
        <Link href="/deals" className="flex flex-col items-center">
          <Tag className="h-6 w-6" />
          <span className="text-xs mt-1">Deals</span>
        </Link>
        <Link href="/cart" className="flex flex-col items-center">
          <ShoppingCart className="h-6 w-6" />
          <span className="text-xs mt-1">Cart</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center">
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
}

// Main Header Component
function HomeHeader({ searchQuery, user }: NavProps) {
  // In a real app, this would come from a store
  const [cartCount, setCartCount] = useState(3);

  return (
    <header className="w-full bg-mainPrimary sticky top-0 z-40 shadow-sm">
      {/* Desktop Header */}
      <div className="hidden md:block">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-8 justify-center">
            {/* Logo */}
            <Logo />

            {/* Search Bar */}
            <div className="w-[50%] gap-3">
              <SearchInput initialQuery={searchQuery} />
            </div>

            {/* Right Section */}
            <div className="flex h-5 items-center space-x-4 text-sm">
              <motion.button
                className="text-sm hover:text-orange-500 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                العربية
              </motion.button>
              <Separator orientation="vertical" />

              <div className="md:flex hidden">
                {user ? (
                  <UserDropdownMenu
                    username={user.name || "User"}
                    email={user.email || ""}
                    avatarUrl={user.image || undefined}
                  />
                ) : (
                  <Link
                    href="/auth"
                    className="relative font-bold flex items-center gap-2"
                  >
                    <motion.button
                      className="text-sm h-auto p-0 font-semibold hover:text-orange-500 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Log in
                    </motion.button>
                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-user text-[#8d871c]"
                      >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </motion.div>
                  </Link>
                )}
              </div>

              <Separator orientation="vertical" />
              <Link
                href="/wishlist"
                className="relative font-bold flex items-center gap-2"
              >
                <motion.button
                  className="text-sm h-auto p-0 font-semibold hover:text-orange-500 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Wishlist
                </motion.button>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-[#8d871c]"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </motion.div>
              </Link>
              <Separator orientation="vertical" />
              <Link href="/cart" className="relative">
                <span className="sr-only">Cart</span>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ShoppingCart className="h-6 w-6" />
                </motion.div>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={cartCount}
                    className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#3866df] text-xs text-white"
                    variants={cartCountVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    {cartCount}
                  </motion.span>
                </AnimatePresence>
              </Link>
            </div>
          </div>
        </div>

        <CategoryNav />
      </div>

      {/* Mobile Header */}
      <div className="block md:hidden">
        <div className="flex flex-col relative">
          <div className="flex items-center justify-between px-4 py-2.5">
            <div className="flex items-center gap-3">
              <motion.div whileTap={{ scale: 0.95 }}>
                <Menu className="h-6 w-6 text-gray-700" />
              </motion.div>
              <Logo />
            </div>
            <div className="flex items-center gap-4">
              <Link href="/cart" className="relative">
                <span className="sr-only">Cart</span>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ShoppingCart className="h-7 w-7" />
                </motion.div>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={cartCount}
                    className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#3866df] text-xs text-white"
                    variants={cartCountVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    {cartCount}
                  </motion.span>
                </AnimatePresence>
              </Link>

              {user && (
                <UserDropdownMenu
                  username={user.name || "User"}
                  email={user.email || ""}
                  avatarUrl={user.image || undefined}
                />
              )}
            </div>
          </div>
          <div className="px-4 py-2">
            <SearchInput initialQuery={searchQuery} />
          </div>
        </div>
      </div>

      {/* Bottom Tab Navigation for Mobile */}
      <BottomTabNavigation />
    </header>
  );
}

// Main component that brings everything together
export default function NavBarSix() {
  // Mock user data - in a real app this would come from auth
  const demoUser = {
    name: "John Doe",
    email: "john@example.com",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  };

  return (
    <div className="bg-mainPrimary">
      {/* Main Header with User and Search */}
      <HomeHeader searchQuery="" user={demoUser} />
    </div>
  );
}
