"use client";

import { useState, useEffect, useRef } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Search, X, ChevronDown, Sparkles } from "lucide-react";

const navigation = [
  { name: "Templates", href: "#" },
  { name: "Courses", href: "#" },
  { name: "Documentation", href: "#" },
  { name: "Blogs", href: "#" },
  { name: "Fullstack Roadmap", href: "#" },
  { name: "Guides", href: "#" },
];

const popularSearches = [
  "landing page",
  "authentication",
  "dashboard",
  "e-commerce",
  "portfolio",
  "blog template",
];

export default function HeroSearchVariation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Search state
  const [inputValue, setInputValue] = useState("");
  const [category, setCategory] = useState("all");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const handleSearch = () => {
    if (inputValue.trim()) {
      // Handle search submission
      console.log("Searching for:", inputValue, "in category:", category);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setInputValue("");
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    handleSearch();
  };

  return (
    <div className="min-h-screen bg-[#f5f7ff]">
      {/* Fixed navigation */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-sm" : "bg-white"
        }`}
      >
        <nav
          className="flex items-center justify-between p-4 lg:px-8 max-w-7xl mx-auto"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 flex items-center">
              <span className="sr-only">CodeMint</span>
              <div className="bg-emerald-500 p-2 rounded-md">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 8L3 12L7 16M17 8L21 12L17 16M14 4L10 20"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="ml-2">
                <span className="font-bold text-xl text-gray-900">
                  Code<span className="text-emerald-500">Mint</span>
                </span>
                <span className="block text-xs text-gray-500">
                  Fullstack Templates
                </span>
              </div>
            </a>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-6">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-emerald-500 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-4">
            <a href="#" className="p-1 text-gray-700 hover:text-gray-900">
              <Search className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="rounded-md bg-emerald-500 px-3.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
            >
              <span className="hidden lg:inline">Clone on GitHub</span>
              <span className="lg:hidden">GitHub</span>
            </a>
            <button className="p-1 text-gray-700 hover:text-gray-900">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 16.5V12M12 8V8.00999M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5 flex items-center">
                <div className="bg-emerald-500 p-2 rounded-md">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 8L3 12L7 16M17 8L21 12L17 16M14 4L10 20"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="ml-2">
                  <span className="font-bold text-xl text-gray-900">
                    Code<span className="text-emerald-500">Mint</span>
                  </span>
                  <span className="block text-xs text-gray-500">
                    Fullstack Templates
                  </span>
                </div>
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium text-gray-900 hover:bg-gray-50"
                  >
                    Search
                  </a>
                  <a
                    href="#"
                    className="mt-4 block rounded-md bg-emerald-500 px-3 py-2.5 text-center text-base font-medium text-white shadow-sm hover:bg-emerald-600"
                  >
                    Clone on GitHub
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <main>
        <div className="relative pt-20 pb-16 sm:pt-24 sm:pb-24 lg:pb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 sm:mb-20">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
                Discover the best developer resources
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-gray-600">
                Explore thousands of templates, APIs, landing pages, and tools
                created by the developer community
              </p>
            </div>

            {/* Enhanced search section */}
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* Enhanced search box */}
                <div
                  className={`flex flex-col md:flex-row rounded-xl border shadow-md overflow-hidden bg-white transition-all duration-200 ${
                    isFocused ? "ring-2 ring-emerald-200 shadow-lg" : ""
                  }`}
                >
                  <div className="flex-1 flex items-center pl-4 md:pl-6 pr-2 bg-white">
                    <Search className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Search for templates, APIs, landing pages..."
                      className="flex-1 border-0 focus:ring-0 focus:outline-none py-6 text-gray-800 w-full bg-transparent"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setTimeout(() => setIsFocused(false), 100)}
                    />
                    {inputValue && (
                      <button
                        className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                        onClick={handleClear}
                        title="Clear search"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <div className="hidden md:block border-l border-gray-200">
                    <div className="relative inline-block text-left h-full">
                      <button
                        type="button"
                        className="inline-flex w-full justify-between items-center gap-x-1.5 px-4 py-6 text-sm font-medium text-gray-900"
                        id="category-menu-button"
                      >
                        {category === "all" ? "All categories" : category}
                        <ChevronDown
                          className="h-4 w-4 text-gray-400"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>

                  <button
                    className="rounded-none md:rounded-r-xl py-6 px-8 bg-emerald-600 hover:bg-emerald-700 text-base font-medium text-white"
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                </div>

                {/* Popular searches dropdown */}
                {isFocused && !inputValue && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-white shadow-lg rounded-lg border border-gray-100 z-10 overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-center mb-3 text-sm text-gray-500">
                        <Sparkles className="h-3.5 w-3.5 mr-2 text-amber-500" />
                        <span>Popular searches</span>
                      </div>
                      <div className="space-y-1">
                        {popularSearches.map((search, index) => (
                          <button
                            key={index}
                            className="w-full text-left p-2.5 rounded-md hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 transition-colors flex items-center"
                            onClick={() => handleSuggestionClick(search)}
                          >
                            <Search className="h-4 w-4 mr-2 text-gray-400" />
                            {search}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Popular search tags */}
              <div className="mt-8 flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-x-1">
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Popular searches:
                  </span>
                </div>
                {popularSearches.slice(0, 4).map((search, index) => (
                  <button
                    key={index}
                    className="inline-flex items-center rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50"
                    onClick={() => handleSuggestionClick(search)}
                  >
                    <Search className="mr-1 h-3.5 w-3.5 text-gray-500" />
                    {search}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured resources */}
            <div className="mt-16 sm:mt-24">
              <div className="flex items-center">
                <Sparkles className="h-6 w-6 text-yellow-500" />
                <h2 className="ml-2 text-2xl font-bold text-gray-900">
                  Featured Resources
                </h2>
              </div>

              {/* Featured items grid */}
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg"
                  >
                    <div className="aspect-[16/9] bg-gray-200">
                      <div className="h-full w-full object-cover" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 line-clamp-1">
                        Featured Resource {index + 1}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                        A detailed description of this amazing developer
                        resource that you might find useful.
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                          Template
                        </span>
                        <span className="text-xs text-gray-500">
                          1.2k downloads
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
