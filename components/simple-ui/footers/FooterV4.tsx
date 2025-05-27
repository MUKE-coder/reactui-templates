"use client";

import Link from "next/link";
import { ChevronRight, Globe } from "lucide-react";

const footerSections = [
  {
    title: "Shop",
    links: [
      { name: "New Arrivals", href: "/new" },
      { name: "Best Sellers", href: "/bestsellers" },
      { name: "Sale", href: "/sale" },
      { name: "Collections", href: "/collections" },
    ],
  },
  {
    title: "Help",
    links: [
      { name: "Customer Service", href: "/support" },
      { name: "Size Guide", href: "/size-guide" },
      { name: "Shipping & Returns", href: "/shipping" },
      { name: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "About",
    links: [
      { name: "Our Story", href: "/about" },
      { name: "Sustainability", href: "/sustainability" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
    ],
  },
];

const socialPlatforms = [
  { name: "Instagram", href: "#", handle: "@ecostore" },
  { name: "Twitter", href: "#", handle: "@ecostore" },
  { name: "Facebook", href: "#", handle: "EcoStore" },
];

export default function FooterV4() {
  return (
    <footer className="bg-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-3xl font-light text-gray-900 mb-8 block tracking-wide"
            >
              EcoStore
            </Link>
            <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-md">
              Thoughtfully designed products for conscious living. Every
              purchase supports sustainable practices and ethical manufacturing.
            </p>

            {/* Social Links */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Follow Us
              </h4>
              <div className="space-y-2">
                {socialPlatforms.map((platform) => (
                  <Link
                    key={platform.name}
                    href={platform.href}
                    className="flex items-center justify-between text-gray-600 hover:text-gray-900 transition-colors py-1 group"
                  >
                    <span className="text-sm">{platform.name}</span>
                    <span className="text-sm text-gray-400">
                      {platform.handle}
                    </span>
                    <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Sections */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {footerSections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-6">
                    {section.title}
                  </h3>
                  <ul className="space-y-4">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-gray-600 hover:text-gray-900 transition-colors text-sm flex items-center justify-between group"
                        >
                          <span>{link.name}</span>
                          <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
            {/* Left Side */}
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8">
              <p className="text-gray-500 text-sm">© 2024 EcoStore, Inc.</p>
              <div className="flex items-center space-x-6">
                <Link
                  href="/privacy"
                  className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/accessibility"
                  className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
                >
                  Accessibility
                </Link>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-6">
              {/* Language Selector */}
              <div className="flex items-center space-x-2 text-gray-500">
                <Globe className="h-4 w-4" />
                <select className="bg-transparent text-sm border-none focus:outline-none cursor-pointer">
                  <option>English (US)</option>
                  <option>Español</option>
                  <option>Français</option>
                </select>
              </div>

              {/* Payment Methods */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-5 bg-gray-200 rounded border"></div>
                <div className="w-8 h-5 bg-gray-200 rounded border"></div>
                <div className="w-8 h-5 bg-gray-200 rounded border"></div>
                <div className="w-8 h-5 bg-gray-200 rounded border"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
