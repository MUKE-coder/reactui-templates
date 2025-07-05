"use client";

import { useState } from "react";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  Grid3X3,
  Home,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

//COLORS
//PRIMARY : #204462
//SECONDARY:#f5c704
export default function MomoNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [cartCount] = useState(3);
  const [wishlistCount] = useState(5);

  const categories = [
    { name: "Electronics", href: "/categories/electronics" },
    { name: "Supermarket", href: "/categories/supermarket" },
    { name: "Home & Furniture", href: "/categories/home-furniture" },
    { name: "Sports & Leisure", href: "/categories/sports-leisure" },
    { name: "Fashion", href: "/categories/fashion" },
    { name: "Health & Beauty", href: "/categories/health-beauty" },
  ];

  const mobileNavItems = [
    { icon: Home, label: "Home", href: "/", active: true },
    { icon: Heart, label: "Wishlist", href: "/wishlist", badge: wishlistCount },
    { icon: Grid3X3, label: "Categories", href: "/categories" },
    { icon: ShoppingCart, label: "Cart", href: "/cart", badge: cartCount },
    { icon: User, label: "Profile", href: "/profile" },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        {/* Top Header */}
        <header className="bg-[#204462]  shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center gap-3 hover:opacity-90 transition-opacity"
              >
                <Image
                  src="/images/logo-marketplace.png"
                  alt="Market by MoMo"
                  width={178}
                  height={72}
                  className="rounded-xl shadow-sm w-28"
                />
              </Link>

              {/* Search Bar */}
              <div className="flex-1 max-w-2xl mx-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search on MoMo"
                    className="w-full h-12 pl-4 pr-12 rounded-2xl border-0 shadow-sm focus:ring-2 focus:ring-white/20 focus:outline-none bg-white/95 backdrop-blur-sm text-slate-700 placeholder-slate-500"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center justify-center transition-colors">
                    <Search className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-4">
                <Link
                  href="/wishlist"
                  className="flex items-center gap-2 text-white hover:text-amber-100 transition-colors"
                >
                  <div className="relative">
                    <Heart className="w-5 h-5" />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#f5c704] text-black text-xs rounded-full flex items-center justify-center">
                        {wishlistCount}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-medium">WishList</span>
                </Link>

                <Link
                  href="/cart"
                  className="flex items-center gap-2 text-white hover:text-amber-100 transition-colors"
                >
                  <div className="relative">
                    <ShoppingCart className="w-5 h-5" />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#f5c704] text-black text-xs rounded-full flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-medium">Cart</span>
                </Link>

                <Link
                  href="/auth/signin"
                  className="flex items-center gap-2 text-white hover:text-amber-100 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">Sign-In</span>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Categories Navigation */}
        <nav className="bg-[#f5c704]  shadow-md">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-14">
              <div className="flex items-center gap-8">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-8">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="text-slate-700 hover:text-slate-900 transition-colors text-sm font-medium tracking-wide py-2 border-b-2 border-transparent hover:border-slate-700"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/seller"
                className="bg-[#204462] hover:bg-[#07243c] text-white px-6 py-2 rounded-xl text-sm font-medium tracking-wide transition-all duration-300 hover:shadow-lg flex items-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Sell on marketplace
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#204462] shadow-lg">
          {!isMobileSearchOpen ? (
            <div className="flex items-center justify-between h-16 px-4">
              <Link
                href="/"
                className="flex items-center gap-3 hover:opacity-90 transition-opacity"
              >
                <Image
                  src="/images/logo-marketplace.png"
                  alt="Market by MoMo"
                  width={178}
                  height={72}
                  className="rounded-lg w-28"
                />
              </Link>

              <button
                onClick={() => setIsMobileSearchOpen(true)}
                className="w-10 h-10 bg-amber-400 hover:bg-amber-500 rounded-xl flex items-center justify-center transition-colors"
              >
                <Search className="w-5 h-5 text-slate-800" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 h-16 px-4">
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="w-10 h-10 bg-slate-600 hover:bg-slate-500 rounded-xl flex items-center justify-center transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search on MoMo"
                  autoFocus
                  className="w-full h-10 px-4 rounded-xl border-0 shadow-sm focus:ring-2 focus:ring-amber-400 focus:outline-none bg-white text-slate-700 placeholder-slate-500"
                />
              </div>
              <button className="w-10 h-10 bg-amber-400 hover:bg-amber-500 rounded-xl flex items-center justify-center transition-colors">
                <Search className="w-5 h-5 text-slate-800" />
              </button>
            </div>
          )}
        </header>
        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#204462]  shadow-2xl">
          <div className="flex items-center justify-around h-16 px-2">
            {mobileNavItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 ${
                    item.active ? "text-[#f5c704] " : "text-white "
                  }`}
                >
                  <div className="relative">
                    <Icon className="w-5 h-5" />
                    {item.badge && item.badge > 0 && (
                      <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#f5c704] text-black text-xs rounded-full flex items-center justify-center">
                        {item.badge > 9 ? "9+" : item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-medium tracking-wide">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
        {/* Mobile Content Spacer */}
        <div className="h-16" /> {/* Top spacer */}
        <div className="min-h-screen bg-slate-50">
          {/* Your page content goes here */}
          <div className="p-4">
            <div className="text-center py-20">
              <h1 className="text-2xl font-light text-slate-800 mb-4">
                Premium Mobile Experience
              </h1>
              <p className="text-slate-600">
                Content area with proper spacing for fixed navigation
              </p>
              <div className="mt-8 space-y-4">
                <p className="text-sm text-slate-500">
                  Try clicking the search button on mobile to see the search bar
                </p>
                <p className="text-sm text-slate-500">
                  All navigation items are now clickable links
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-16" /> {/* Bottom spacer */}
      </div>

      {/* Desktop Menu Overlay */}
      {isMenuOpen && (
        <div className="hidden lg:block fixed inset-0 z-40 bg-black/50 backdrop-blur-sm">
          <div className="fixed left-0 top-32 bottom-0 w-80 bg-white shadow-2xl rounded-r-2xl">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-light text-slate-900">
                  All Categories
                </h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-slate-600" />
                </button>
              </div>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors font-medium"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm">
          <div className="fixed left-0 top-0 bottom-0 w-80 bg-white shadow-2xl">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-light text-slate-900">
                  Categories
                </h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-slate-600" />
                </button>
              </div>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors font-medium"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
