"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

const navigation = [
  { name: "Solutions", href: "#" },
  { name: "Features", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "Resources", href: "#" },
];

const keyFeatures = [
  { text: "AI-powered insights that boost productivity by 300%" },
  { text: "Enterprise-grade security with SOC 2 and GDPR compliance" },
  { text: "Seamless integration with over 200+ tools and platforms" },
];

export default function HeroSectionTwo() {
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
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(17, 24, 39, 0.85), rgba(17, 24, 39, 0.95)), url(https://14j7oh8kso.ufs.sh/f/HLxTbDBCDLwfpxSxVS3QgNG9hYzVFo5iLR0yrDPTJedWnBH7)",
      }}
    >
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-gray-900/90 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-4 lg:px-8 max-w-7xl mx-auto"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 flex items-center space-x-2">
              <span className="sr-only">Fusion</span>
              <div className="bg-indigo-500 p-2 rounded-lg">
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white&shade=500"
                  className="h-6 w-auto"
                />
              </div>
              <span className="font-bold text-xl text-white">Fusion</span>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-full p-2.5 text-gray-300 hover:bg-gray-800"
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
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
            <a
              href="#"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center"
            >
              Log in
            </a>
            <a
              href="#"
              className="text-sm font-medium px-4 py-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
            >
              Sign up free
            </a>
          </div>
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-700">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5 flex items-center space-x-2">
                <div className="bg-indigo-500 p-2 rounded-lg">
                  <img
                    alt=""
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white&shade=500"
                    className="h-6 w-auto"
                  />
                </div>
                <span className="font-bold text-xl text-white">Fusion</span>
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-full p-2.5 text-gray-400 hover:bg-gray-800"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-700">
                <div className="space-y-1 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6 space-y-3">
                  <a
                    href="#"
                    className="block rounded-lg px-3 py-2.5 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    Log in
                  </a>
                  <a
                    href="#"
                    className="block rounded-full px-3 py-2.5 text-base font-medium text-center text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
                  >
                    Sign up free
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <div className="relative isolate pt-24 lg:pt-32 pb-16 lg:pb-32 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl leading-tight">
              Enterprise Intelligence <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                For The Digital Age
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              The most powerful data analytics platform for businesses that want
              to leverage AI to make better decisions faster than their
              competition.
            </p>

            {/* Feature bullets with check icons */}
            <div className="mt-10 flex flex-col items-start max-w-lg mx-auto space-y-4">
              {keyFeatures.map((feature, index) => (
                <div key={index} className="flex items-center text-left">
                  <CheckCircleIcon className="h-6 w-6 text-indigo-400 flex-shrink-0" />
                  <span className="ml-3 text-base sm:text-lg text-gray-200">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
              <a
                href="#"
                className="rounded-full bg-indigo-600 px-6 py-3.5 text-base font-medium text-white shadow-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 transform hover:-translate-y-1 flex-none w-full sm:w-auto"
              >
                Get started now
              </a>
              <a
                href="#"
                className="rounded-full px-6 py-3.5 text-base font-medium text-gray-200 ring-1 ring-gray-700 hover:ring-gray-500 hover:bg-gray-800/50 transition-all duration-200 flex items-center justify-center gap-x-2 flex-none w-full sm:w-auto"
              >
                Schedule a demo
                <ArrowRightIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Trusted by section */}
            <div className="mt-16 border-t border-gray-700 pt-10">
              <p className="text-sm text-gray-400 mb-6">
                TRUSTED BY INNOVATIVE COMPANIES WORLDWIDE
              </p>
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 opacity-70">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-8 w-32 bg-gray-700 rounded-md"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
