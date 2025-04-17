"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon, SparklesIcon } from "@heroicons/react/24/solid";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

export default function HeroSectionSix() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed navigation - enhanced with better CTAs and styling */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-sm shadow-sm"
            : "bg-white/90 backdrop-blur-sm"
        }`}
      >
        <nav
          className="flex items-center justify-between p-4 md:p-6 lg:px-8 max-w-7xl mx-auto"
          aria-label="Global"
        >
          <div className="flex lg:flex-1 items-center">
            <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
              <span className="sr-only">Company</span>
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-2 shadow-md">
                <svg
                  className="h-6 w-auto text-white"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                >
                  <path d="M16 4C9.372 4 4 9.372 4 16c0 6.627 5.372 12 12 12s12-5.373 12-12c0-6.628-5.372-12-12-12z" />
                </svg>
              </div>
              <span className="font-semibold text-xl text-gray-900">
                Dataviz
              </span>
            </a>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-full p-2.5 text-gray-700 hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-6">
            <a
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Log in
            </a>
            <a
              href="#"
              className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 transition-all duration-200 flex items-center"
            >
              Get started
              <ArrowRightIcon className="ml-2 h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </nav>

        {/* Enhanced mobile menu */}
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-2">
                  <svg
                    className="h-6 w-auto text-white"
                    viewBox="0 0 32 32"
                    fill="currentColor"
                  >
                    <path d="M16 4C9.372 4 4 9.372 4 16c0 6.627 5.372 12 12 12s12-5.373 12-12c0-6.628-5.372-12-12-12z" />
                  </svg>
                </div>
                <span className="font-semibold text-xl text-gray-900">
                  Dataviz
                </span>
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-full p-2.5 text-gray-700 hover:bg-gray-100"
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
                <div className="py-6 space-y-3">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2.5 text-base font-medium text-white shadow-sm hover:bg-indigo-500"
                  >
                    Get started
                    <ArrowRightIcon
                      className="ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <main>
        <div className="relative overflow-hidden bg-white">
          <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {/* Enhanced announcement banner */}
              <div className="mb-8 mt-8 inline-flex items-center gap-2 rounded-full bg-gray-50 px-4 py-1.5 text-sm text-gray-700 ring-1 ring-gray-900/10 shadow-sm">
                <SparklesIcon className="h-4 w-4 text-indigo-600" />
                <span>New analytics features now available</span>
                <a
                  href="#"
                  className="ml-1 font-semibold text-indigo-600 inline-flex items-center"
                >
                  Read more
                  <ArrowRightIcon className="ml-1 h-3 w-3" aria-hidden="true" />
                </a>
              </div>

              <div className="max-w-2xl">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:leading-tight">
                  Data to enrich your business
                </h1>
                <p className="mt-6 text-lg text-gray-600 max-w-lg">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                  qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
                  occaecat fugiat aliqua.
                </p>

                {/* Enhanced CTAs */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-x-4">
                  <a
                    href="#"
                    className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-base font-semibold text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 text-center"
                  >
                    Get started
                  </a>
                  <a
                    href="#"
                    className="rounded-full bg-white px-6 py-3 text-base font-semibold text-gray-700 ring-1 ring-gray-300 shadow-sm hover:bg-gray-50 transition-all duration-200 flex items-center justify-center"
                  >
                    Learn more
                    <ArrowRightIcon
                      className="ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  </a>
                </div>

                {/* Social proof */}
                <div className="mt-10 ">
                  <p className="text-sm text-gray-500 mb-2">
                    Trusted by innovative companies
                  </p>
                  <div className="flex items-center gap-6">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="h-8 w-24 bg-gray-200 rounded"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Improved diagonal image section with better responsiveness */}
            <div className="hidden sm:block absolute inset-y-0 right-0 top-24 w-full overflow-hidden sm:right-0 sm:top-auto sm:h-full sm:w-5/12 lg:right-0 lg:w-1/2">
              {/* Enhanced diagonal background with gradient */}
              <div
                className="absolute -left-40 top-0 h-[750px] w-[1000px] rotate-[14deg] bg-gradient-to-r from-indigo-50 via-gray-100 to-gray-50 sm:left-auto sm:right-0 sm:translate-x-1/2"
                aria-hidden="true"
              />

              {/* Image wrapper with enhanced styling */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-full w-full max-w-none overflow-hidden sm:opacity-100">
                  {/* Subtle overlay to match brand colors */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/5 mix-blend-overlay"></div>

                  {/* Main image */}
                  <img
                    src="https://14j7oh8kso.ufs.sh/f/HLxTbDBCDLwfZ4gu2wU9C3gHFdyzTE0q7PpDnjchu6XsKk1l"
                    alt="Dashboard analytics"
                    className="h-full w-full object-cover object-center"
                  />

                  {/* Floating card element for visual interest */}
                  <div className="absolute hidden md:block top-1/4 -left-12 bg-white rounded-lg shadow-xl p-4 w-64">
                    <div className="flex items-center">
                      <div className="rounded-full bg-indigo-100 p-2">
                        <svg
                          className="h-6 w-6 text-indigo-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">
                          Revenue Growth
                        </p>
                        <p className="text-2xl font-bold text-indigo-600">
                          +24%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
