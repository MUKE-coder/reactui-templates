// Uncomment Line 160 to 171
"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon, StarIcon } from "@heroicons/react/24/solid";

const navigation = [
  { name: "Features", href: "#" },
  { name: "Solutions", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "Resources", href: "#" },
  { name: "Customers", href: "#" },
];

export default function HeroSectionFour() {
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
    <div className="bg-white min-h-screen">
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/90 backdrop-blur-sm shadow-sm" : "bg-transparent"
        }`}
      >
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-4 lg:px-8 max-w-7xl mx-auto"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 flex items-center space-x-2">
              <span className="sr-only">Fusion</span>
              <div className="bg-purple-600 p-2 rounded-lg">
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white&shade=600"
                  className="h-6 w-auto"
                />
              </div>
              <span className="font-bold text-xl text-gray-900">Fusion</span>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-full p-2.5 text-gray-700 hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
            <a
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors flex items-center"
            >
              Log in
            </a>
            <a
              href="#"
              className="text-sm font-medium px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors shadow-sm"
            >
              Get access
            </a>
          </div>
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5 flex items-center space-x-2">
                <div className="bg-purple-600 p-2 rounded-lg">
                  <img
                    alt=""
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white&shade=600"
                    className="h-6 w-auto"
                  />
                </div>
                <span className="font-bold text-xl text-gray-900">Fusion</span>
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-full p-2.5 text-gray-700 hover:bg-gray-100"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-200">
                <div className="space-y-1 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6 space-y-3">
                  <a
                    href="#"
                    className="block rounded-lg px-3 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                  <a
                    href="#"
                    className="block rounded-full px-3 py-2.5 text-base font-medium text-center text-white bg-purple-600 hover:bg-purple-700 transition-colors shadow-sm"
                  >
                    Get access
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <div className="relative isolate pt-24 md:pt-32 pb-0 px-6 lg:px-8">
        {/* Decorative elements */}
        {/* <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-purple-500 to-indigo-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div> */}

        <div className="mx-auto max-w-7xl">
          {/* Announcement badge */}
          <div className="mb-10 sm:mb-16 flex justify-center">
            <div className="relative flex items-center gap-x-2 rounded-full px-4 py-2 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 bg-white/80 backdrop-blur-sm shadow-sm">
              <SparklesIcon
                className="h-4 w-4 text-purple-600"
                aria-hidden="true"
              />
              <span className="font-medium">
                New AI-powered features now available
              </span>
              <a
                href="#"
                className="flex items-center gap-x-1 font-semibold text-purple-600"
              >
                <span>See what's new</span>
                <ArrowRightIcon className="h-3 w-3" aria-hidden="true" />
                <span className="absolute inset-0" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Main hero content */}
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl leading-tight">
              The analytics platform
              <br className="hidden sm:inline" /> for
              <span className="text-purple-600"> data-driven teams</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Get real-time insights, predictive analytics, and actionable
              recommendations that help your team make better decisions faster.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
              <a
                href="#"
                className="rounded-full bg-purple-600 px-6 py-3.5 text-base font-medium text-white shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 transform hover:-translate-y-1 flex-none w-full sm:w-auto"
              >
                Start your free trial
              </a>
              <a
                href="#"
                className="rounded-full px-6 py-3.5 text-base font-medium text-gray-700 ring-1 ring-gray-200 hover:ring-gray-300 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-x-2 flex-none w-full sm:w-auto"
              >
                Schedule a demo
                <ArrowRightIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Client ratings */}
            <div className="mt-8 flex items-center justify-center space-x-2">
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-600">
                Rated 4.9/5 from over 1,200+ reviews
              </span>
            </div>
          </div>

          {/* Full width image below CTAs */}
          <div className="mt-16 sm:mt-24 overflow-hidden rounded-t-3xl shadow-2xl mx-auto max-w-7xl">
            <img
              src="https://14j7oh8kso.ufs.sh/f/HLxTbDBCDLwfZqftiIU9C3gHFdyzTE0q7PpDnjchu6XsKk1l"
              alt="Dashboard preview"
              className="w-full h-auto object-cover object-center"
            />
          </div>
        </div>

        {/* Bottom gradient */}
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-purple-500 to-indigo-500 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
