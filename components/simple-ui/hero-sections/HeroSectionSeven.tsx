"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

const features = [
  "Deploys from GitHub",
  "Real-time status updates",
  "Integrated with your development workflow",
];

export default function HeroSectionSeven() {
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
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Grid background that fades toward the bottom */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_0%,rgba(255,255,255,1)_100%)]"
          style={{
            backgroundSize: "60px 60px",
            backgroundImage: `
              linear-gradient(to right, rgba(229, 231, 235, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(229, 231, 235, 0.15) 1px, transparent 1px)
            `,
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundSize: "60px 60px",
            backgroundImage: `
              linear-gradient(to right, rgba(79, 70, 229, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(79, 70, 229, 0.05) 1px, transparent 1px)
            `,
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0) 100%)",
          }}
        />
      </div>

      {/* Fixed navigation */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-sm shadow-sm"
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <nav
          className="flex items-center justify-between p-6 lg:px-8 max-w-7xl mx-auto"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 flex items-center space-x-2">
              <span className="sr-only">Protocol</span>
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg p-1.5 shadow-lg">
                <svg
                  className="h-7 w-auto text-white"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M27 16C27 21.5228 22.5228 26 17 26C11.4772 26 7 21.5228 7 16C7 10.4772 11.4772 6 17 6C22.5228 6 27 10.4772 27 16Z"
                  />
                </svg>
              </div>
              <span className="font-semibold text-lg text-gray-900">
                Protocol
              </span>
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

          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-900 hover:text-indigo-600 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-6">
            <a
              href="#"
              className="flex items-center text-sm font-medium text-gray-900 hover:text-indigo-600 transition-colors"
            >
              Log in
            </a>
            <a
              href="#"
              className="rounded-md bg-indigo-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started
            </a>
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
              <a href="#" className="-m-1.5 p-1.5 flex items-center space-x-2">
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg p-1.5">
                  <svg
                    className="h-7 w-auto text-white"
                    viewBox="0 0 32 32"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M27 16C27 21.5228 22.5228 26 17 26C11.4772 26 7 21.5228 7 16C7 10.4772 11.4772 6 17 6C22.5228 6 27 10.4772 27 16Z"
                    />
                  </svg>
                </div>
                <span className="font-semibold text-lg">Protocol</span>
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
                <div className="py-6 space-y-3">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                  <a
                    href="#"
                    className="block rounded-md px-3 py-2.5 text-base font-medium text-center text-white bg-indigo-600 hover:bg-indigo-500"
                  >
                    Get started
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <div className="relative isolate z-10">
        <div className="mx-auto max-w-7xl pt-24 lg:pt-32 pb-16 sm:pb-24 lg:flex lg:gap-8 lg:py-40">
          {/* Left side content */}
          <div className="px-6 lg:px-8 lg:flex-1 lg:pt-4">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <div className="inline-flex items-center space-x-2 px-3 py-1 mb-6 bg-indigo-50 rounded-full text-indigo-700 text-sm font-medium">
                <SparklesIcon className="h-4 w-4" />
                <span>New deployment features available</span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-5xl xl:text-6xl">
                A better way to ship your projects
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
                fugiat aliqua. Anim aute id magna aliqua ad ad non deserunt
                sunt.
              </p>

              {/* Feature list */}
              <div className="mt-8 space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center">
                      <CheckCircleIcon className="h-4 w-4 text-indigo-600" />
                    </div>
                    <span className="text-gray-700 ml-3 font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Enhanced CTAs */}
              <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-x-6">
                <a
                  href="#"
                  className="rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-800 px-6 py-3.5 text-base font-semibold text-white shadow-lg hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200 w-full sm:w-auto text-center transform hover:-translate-y-0.5"
                >
                  Get started
                </a>
                <a
                  href="#"
                  className="rounded-lg px-6 py-3.5 text-base font-semibold text-indigo-700 bg-white ring-1 ring-indigo-200 shadow-sm hover:bg-indigo-50 transition-all duration-200 flex items-center justify-center w-full sm:w-auto"
                >
                  Learn more
                  <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>

              {/* Social proof */}
              <div className="mt-12 flex items-center">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-200"
                    ></div>
                  ))}
                </div>
                <p className="ml-3 text-sm text-gray-500">
                  Joined by{" "}
                  <span className="font-medium text-gray-900">12,000+</span>{" "}
                  development teams
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Mobile app mockup */}
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-1 lg:pr-8">
            <div className="relative flex justify-center">
              {/* Enhanced glow effect behind phone */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute h-64 w-64 rounded-full bg-indigo-300/20 blur-3xl"></div>
              </div>

              {/* Phone frame */}
              <div className="relative mx-auto w-[318px] h-[642px] bg-gray-900 rounded-[48px] overflow-hidden shadow-2xl ring-1 ring-gray-900/10">
                {/* Phone notch */}
                <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 flex justify-center z-10">
                  <div className="w-1/2 h-full rounded-b-3xl bg-black"></div>
                </div>

                {/* Status bar */}
                <div className="absolute top-0 inset-x-0 h-10 flex items-center justify-between px-8 text-white z-10">
                  <div className="text-xs">9:41</div>
                  <div className="flex items-center space-x-1">
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </div>
                </div>

                {/* App UI */}
                <div className="h-full w-full bg-gray-800 pt-10">
                  {/* App header */}
                  <div className="flex justify-between items-center px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs">
                        P
                      </div>
                    </div>
                    <button className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 2V10M2 6H10"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Search bar */}
                  <div className="mx-4 mt-3 bg-gray-700 rounded-md flex items-center px-3 py-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-gray-400"
                    >
                      <path
                        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="ml-2 text-sm text-gray-400">
                      Search projects...
                    </div>
                  </div>

                  {/* Deployments list */}
                  <div className="mt-4 px-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-white">
                        Deployments
                      </h3>
                      <div className="flex items-center text-xs text-gray-400">
                        Sort by
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="ml-1"
                        >
                          <path
                            d="M6 9L12 15L18 9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* List items */}
                    <div className="mt-2 space-y-3">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-gray-700 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  i % 3 === 0 ? "bg-gray-500" : "bg-green-500"
                                }`}
                              ></div>
                              <div className="ml-2">
                                <div className="text-xs font-medium text-white">
                                  Planetaria{" "}
                                  {i % 2 === 0 ? "/ ios-app" : "/ mobile-api"}
                                </div>
                                <div className="text-xs text-gray-400">
                                  Deploys from GitHub •{" "}
                                  {i % 2 === 0 ? "Initiated" : "Deployed"}{" "}
                                  {i + 1}m ago
                                </div>
                              </div>
                            </div>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="text-gray-400"
                            >
                              <path
                                d="M9 6L15 12L9 18"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-indigo-50"></div>
              <div className="absolute -top-6 -right-6 h-16 w-16 rounded-full bg-indigo-100"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
