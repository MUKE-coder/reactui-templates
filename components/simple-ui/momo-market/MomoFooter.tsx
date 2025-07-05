"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const footerSections = [
  {
    title: "Company",
    links: [
      { name: "Privacy policy", href: "/privacy-policy" },
      { name: "Terms and Conditions", href: "/terms-conditions" },
    ],
  },
  {
    title: "Help",
    links: [
      { name: "Contact us", href: "/contact" },
      { name: "Return & Refund", href: "/return-refund" },
      { name: "Warranty Policy", href: "/warranty" },
      { name: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Account",
    links: [
      { name: "My Orders", href: "/orders" },
      { name: "My Address", href: "/address" },
      { name: "My Profile", href: "/profile" },
    ],
  },
  {
    title: "Seller hub",
    links: [{ name: "Sell on Marketplace", href: "/seller" }],
  },
];

const paymentMethods = [
  {
    name: "MTN",
    logo: "/placeholder.svg?height=30&width=60",
    alt: "MTN Mobile Money",
  },
  {
    name: "Mastercard",
    logo: "/placeholder.svg?height=30&width=50",
    alt: "Mastercard",
  },
  {
    name: "Visa",
    logo: "/placeholder.svg?height=30&width=50",
    alt: "Visa",
  },
];

export default function MomoFooter() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[#204462] text-white relative">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-lg font-medium text-white tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-300 hover:text-white transition-colors text-sm leading-relaxed"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Logo Section */}
          <div className="lg:col-span-1 flex justify-center lg:justify-end">
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
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-600">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-slate-400 text-xs text-center lg:text-left leading-relaxed">
            All rights reserved for Group FinCommerce Inc. in the Republic of
            South Africa
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 bg-amber-400 hover:bg-amber-500 text-slate-900 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg z-50"
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5" />
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            TOP
          </span>
        </button>
      )}
    </footer>
  );
}
