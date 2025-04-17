"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Search,
  ChevronDown,
  ShoppingCart,
  User,
  Menu,
  Plus,
  Minus,
  X,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Type definitions
interface Category {
  id: number;
  title: string;
  slug: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Dummy data for categories
const dummyCategories: Category[] = [
  { id: 1, title: "Gift hampers", slug: "gift-hampers" },
  { id: 2, title: "Home & Kitchen", slug: "home-kitchen" },
  { id: 3, title: "Beauty and Personal Care", slug: "beauty-personal-care" },
  { id: 4, title: "Appliances", slug: "appliances" },
  { id: 5, title: "Electronics", slug: "electronics" },
  { id: 6, title: "Office & School supplies", slug: "office-school-supplies" },
  { id: 7, title: "TVs & Audios", slug: "tvs-audios" },
  { id: 8, title: "Men Clothings", slug: "men-clothings" },
  { id: 9, title: "Shoes", slug: "shoes" },
  { id: 10, title: "Bags", slug: "bags" },
  { id: 11, title: "Phones and Tablets", slug: "phones-tablets" },
];

// Dummy data for cart items
const dummyCartItems: CartItem[] = [
  {
    id: 1,
    name: "Wireless Noise Cancelling Headphones",
    price: 199.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 2,
    name: "Smartphone 128GB",
    price: 599.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNtYXJ0cGhvbmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 3,
    name: "Smart Watch Series 5",
    price: 349.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNtYXJ0JTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  },
];

interface MobileLinkProps {
  href: string;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}

interface MobileNavBarProps {
  categories?: Category[];
}

function MobileNavBar({ categories = dummyCategories }: MobileNavBarProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden text-white"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0 p-0 bg-[#131921]">
        <div className="flex h-16 items-center px-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="kyaja logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="font-bold text-xl text-white">KYAJA</span>
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="p-4">
            <h3 className="text-white font-medium mb-2">Shop By Category</h3>
            <div className="space-y-1">
              {categories?.map((category) => (
                <MobileLink
                  key={category.id}
                  href={`/c/${category.slug}`}
                  className="block rounded px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
                  onOpenChange={setOpen}
                >
                  {category.title}
                </MobileLink>
              ))}
            </div>
            <div className="mt-6 border-t border-gray-700 pt-4">
              <MobileLink
                href="/account"
                className="flex items-center rounded px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
                onOpenChange={setOpen}
              >
                <User className="mr-2 h-4 w-4" />
                My Account
              </MobileLink>
              <MobileLink
                href="/orders"
                className="flex items-center rounded px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
                onOpenChange={setOpen}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Orders
              </MobileLink>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

function Logo(): JSX.Element {
  return (
    <Link href="/" className="flex items-center gap-2">
      {/* <div className="relative w-12 h-12 overflow-hidden">
        <Image
          src="/logo.svg"
          alt="KYAJA"
          width={48}
          height={48}
          className="object-contain"
        />
      </div> */}
      <span className="text-2xl font-bold text-white">Simple UI</span>
    </Link>
  );
}

interface SearchBarProps {
  onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps): JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (e: React.FormEvent): void => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex h-10 w-full rounded-md overflow-hidden"
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="flex items-center justify-between bg-[#f3f3f3] px-3 text-sm text-gray-700 hover:bg-gray-200 min-w-[80px]"
          >
            All
            <ChevronDown className="ml-1 h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem>All Categories</DropdownMenuItem>
          <DropdownMenuItem>Electronics</DropdownMenuItem>
          <DropdownMenuItem>Home & Kitchen</DropdownMenuItem>
          <DropdownMenuItem>Clothing</DropdownMenuItem>
          <DropdownMenuItem>Beauty</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Input
        type="text"
        className="flex-1 border-none px-2 text-black outline-none rounded-none h-full"
        placeholder="Search products, categories..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        type="submit"
        className="flex w-12 items-center justify-center bg-[#febd69] hover:bg-orange-500"
      >
        <Search className="h-5 w-5 text-[#131921]" />
      </button>
    </form>
  );
}

export default function NavBarTwo(): JSX.Element {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>(dummyCartItems);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // For search functionality
  const handleSearch = (query: string): void => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  // Track scroll position for styling changes
  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cart functions
  const updateQuantity = (id: number, increment: boolean): void => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: increment
              ? item.quantity + 1
              : Math.max(1, item.quantity - 1),
          };
        }
        return item;
      })
    );
  };

  const removeItem = (id: number): void => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const calculateTotal = (): number => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <header className="flex flex-col w-full">
      {/* Main navbar */}
      <div className="bg-[#131921] text-white">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Left: Mobile menu + Logo */}
            <div className="flex items-center">
              <MobileNavBar categories={dummyCategories} />
              <Logo />
            </div>

            {/* Search bar - desktop */}
            <div className="hidden md:flex flex-1 max-w-3xl mx-4">
              <SearchBar onSearch={handleSearch} />
            </div>

            {/* Right side navigation */}
            <div className="flex items-center gap-1 md:gap-4">
              {/* Account & Lists */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="hidden h-12 border border-transparent px-2 py-1 hover:border-white md:block">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-300">
                        Hello, sign in
                      </span>
                      <div className="flex items-center">
                        <span className="text-sm font-bold">
                          Account & Lists
                        </span>
                        <ChevronDown className="ml-1 h-3 w-3" />
                      </div>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>Your Account</DropdownMenuItem>
                  <DropdownMenuItem>Your Orders</DropdownMenuItem>
                  <DropdownMenuItem>Your Lists</DropdownMenuItem>
                  <DropdownMenuItem>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Returns & Orders */}
              <Link
                href="/orders"
                className="hidden h-12 border border-transparent px-2 py-1 hover:border-white md:block"
              >
                <div className="flex flex-col">
                  <span className="text-xs text-gray-300">Returns</span>
                  <span className="text-sm font-bold">& Orders</span>
                </div>
              </Link>

              {/* Cart - Sheet Implementation */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-12 border border-transparent px-2 py-1 hover:border-white"
                  >
                    <div className="relative flex items-center">
                      <ShoppingCart className="h-6 w-6" />
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#febd69] text-xs font-bold text-[#131921]">
                        {cartItems.reduce(
                          (total, item) => total + item.quantity,
                          0
                        )}
                      </span>
                      <span className="ml-1 text-sm font-bold md:block">
                        Cart
                      </span>
                    </div>
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-white w-full sm:max-w-md p-0 flex flex-col">
                  <SheetHeader className="p-4 border-b">
                    <SheetTitle className="text-xl font-bold">
                      Your Cart (
                      {cartItems.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}{" "}
                      items)
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex-1 overflow-auto py-6 px-4">
                    {cartItems.length === 0 ? (
                      <div className="flex h-full flex-col items-center justify-center py-10">
                        <ShoppingCart className="h-16 w-16 text-gray-300" />
                        <p className="mt-6 text-lg font-medium">
                          Your cart is empty
                        </p>
                        <p className="mt-2 text-sm text-gray-500 text-center max-w-xs">
                          Looks like you haven't added anything to your cart
                          yet.
                        </p>
                        <SheetClose asChild>
                          <Button className="mt-8 bg-[#febd69] hover:bg-orange-500 text-[#131921]">
                            Continue Shopping
                          </Button>
                        </SheetClose>
                      </div>
                    ) : (
                      <div className="grid gap-6">
                        {cartItems.map((item) => (
                          <div
                            key={item.id}
                            className="grid grid-cols-[80px_1fr] gap-4"
                          >
                            <div className="aspect-square overflow-hidden rounded-md bg-gray-100">
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={80}
                                height={80}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="grid gap-1">
                              <div className="flex items-start justify-between">
                                <h3 className="font-medium leading-tight">
                                  {item.name}
                                </h3>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-full"
                                  onClick={() => removeItem(item.id)}
                                >
                                  <X className="h-4 w-4" />
                                  <span className="sr-only">Remove</span>
                                </Button>
                              </div>
                              <p className="text-sm text-gray-500">
                                ${item.price.toFixed(2)}
                              </p>
                              <div className="flex items-center gap-3 mt-2">
                                <div className="flex items-center border rounded">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() =>
                                      updateQuantity(item.id, false)
                                    }
                                  >
                                    <Minus className="h-3 w-3" />
                                    <span className="sr-only">
                                      Decrease quantity
                                    </span>
                                  </Button>
                                  <span className="w-8 text-center text-sm">
                                    {item.quantity}
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() =>
                                      updateQuantity(item.id, true)
                                    }
                                  >
                                    <Plus className="h-3 w-3" />
                                    <span className="sr-only">
                                      Increase quantity
                                    </span>
                                  </Button>
                                </div>
                                <div className="ml-auto font-medium">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {cartItems.length > 0 && (
                    <SheetFooter className="p-4 border-t">
                      <div className="w-full space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            Subtotal
                          </span>
                          <span className="font-medium">
                            ${calculateTotal().toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            Shipping
                          </span>
                          <span className="font-medium">
                            Calculated at checkout
                          </span>
                        </div>
                        <div className="flex items-center justify-between border-t pt-4">
                          <span className="text-base font-semibold">Total</span>
                          <span className="text-base font-semibold">
                            ${calculateTotal().toFixed(2)}
                          </span>
                        </div>
                        <div className="grid gap-2">
                          <Button className="w-full bg-[#febd69] hover:bg-orange-500 text-[#131921] py-6 font-bold">
                            Proceed to Checkout
                          </Button>
                          <SheetClose asChild>
                            <Button variant="outline" className="w-full">
                              Continue Shopping
                            </Button>
                          </SheetClose>
                        </div>
                      </div>
                    </SheetFooter>
                  )}
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="bg-[#131921] md:hidden px-4 pb-2">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Categories Navigation */}
      <div className="bg-[#232f3e] text-white overflow-x-auto">
        <div className="container mx-auto px-4">
          <div className="flex h-12 items-center">
            {dummyCategories.map((category) => (
              <Link
                key={category.id}
                href={`/c/${category.slug}`}
                className="flex h-full items-center whitespace-nowrap px-3 text-sm font-medium hover:bg-gray-700"
              >
                {category.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
