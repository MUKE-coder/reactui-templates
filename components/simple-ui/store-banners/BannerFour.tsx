"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Heart,
  ShoppingCart,
  ArrowRight,
  Play,
  Star,
} from "lucide-react";

// Enhanced Button component with refined styling
import { ButtonHTMLAttributes } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "accent"
  | "cta"
  | "luxury";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  icon,
  ...props
}) => {
  const baseClasses =
    "font-medium transition-all duration-300 rounded-md flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-black text-white hover:bg-gray-800 focus:ring-black shadow-md",
    secondary:
      "bg-white text-black border border-gray-200 hover:bg-gray-50 focus:ring-gray-400 shadow-sm",
    outline:
      "bg-transparent border border-current hover:bg-gray-50 focus:ring-gray-400",
    accent:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-md",
    cta: "bg-yellow-400 text-black hover:bg-yellow-500 focus:ring-yellow-400 shadow-md",
    luxury:
      "bg-gradient-to-r from-amber-700 to-yellow-500 text-white hover:from-amber-800 hover:to-yellow-600 focus:ring-amber-500 shadow-lg",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default function BannerFour() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    // Optional: Add scroll event listener for additional animations
    const handleScroll = () => {
      // Add any scroll-based animations here
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeInClass = isVisible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-10";

  return (
    <div className="relative bg-gradient-to-br from-sky-100 to-sky-200 rounded-2xl overflow-hidden shadow-xl transition-all duration-700">
      {/* Premium badge */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
        <div className="bg-gradient-to-r from-amber-600 to-yellow-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center">
          <Star className="w-4 h-4 mr-1 fill-white" />
          <span className="font-semibold text-sm">PREMIUM</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 px-4 sm:px-8 py-12 md:py-16 lg:py-20">
          {/* Left content */}
          <div
            className={`md:col-span-5 flex flex-col justify-center transition-all duration-1000 ${fadeInClass}`}
          >
            <div className="inline-block mb-6 px-4 py-1.5 bg-sky-700/10 backdrop-blur-sm rounded-full text-sky-800 text-sm font-medium transform hover:scale-105 transition-transform">
              <span className="relative inline-flex">
                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                </span>
                Premium Organic Products
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">
                ORGANIC
              </span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">
                COMES
              </span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">
                KNOCKING
              </span>
            </h1>
            <p className="text-gray-700 mb-8 text-base sm:text-lg leading-relaxed max-w-lg">
              Our new premium nuts are the finest selection for your well-being.
              Handpicked with care, these exceptional products bring natural
              goodness right to your doorstep.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="luxury"
                className="px-6 py-3 sm:px-8 sm:py-4 text-sm uppercase tracking-wider shadow-lg transform hover:translate-y-[-2px]"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Collection
              </Button>
              <Button
                variant="outline"
                className="px-6 py-3 sm:px-8 sm:py-4 text-sm uppercase tracking-wider text-gray-700 border-gray-400"
              >
                About Our Process
              </Button>
            </div>

            {/* Trust badges - mobile only */}
            <div className="mt-8 md:hidden flex flex-wrap gap-3">
              <div className="bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm flex items-center">
                <span className="text-amber-600 mr-1">⭐</span>
                <span className="text-xs font-medium">Premium Quality</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm flex items-center">
                <span className="text-green-600 mr-1">🌱</span>
                <span className="text-xs font-medium">100% Organic</span>
              </div>
            </div>
          </div>

          {/* Right content */}
          <div
            className={`md:col-span-7 relative transition-all duration-1000 delay-300 ${fadeInClass}`}
          >
            <div className="flex items-center justify-center relative">
              {/* Main product image with enhanced presentation */}
              <div className="relative">
                <div className="absolute inset-0 -m-4 bg-gradient-to-br from-white/20 to-sky-200/30 rounded-full blur-2xl transform animate-pulse"></div>
                <img
                  src="https://14j7oh8kso.ufs.sh/f/HLxTbDBCDLwfEgYGMLSTvKwb91zky4YOuLWjn7Mq3hJCaUDr"
                  alt="Premium organic product"
                  className="h-auto max-w-full object-contain z-10 rounded-lg shadow-2xl transform -rotate-2 hover:rotate-0 transition-all duration-500 filter drop-shadow-xl"
                />

                {/* Floating price tag - optional */}
                <div className="absolute -right-6 bottom-6 bg-white rounded-full shadow-lg p-3 transform hover:scale-110 transition-transform duration-300">
                  <div className="bg-gradient-to-r from-amber-600 to-yellow-500 rounded-full p-1 w-14 h-14 flex flex-col items-center justify-center text-white">
                    <span className="text-xs font-light">from</span>
                    <span className="font-bold text-lg">$49</span>
                  </div>
                </div>
              </div>

              {/* Product cards improved with hover effects and positioning */}
              <div className="absolute right-0 top-0 space-y-4 hidden sm:block">
                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
                  <div className="relative h-32 w-32 md:h-36 md:w-36 lg:h-40 lg:w-40">
                    <img
                      src="https://14j7oh8kso.ufs.sh/f/HLxTbDBCDLwf2jJrbRVCYhOLHQTd4aXPKu5mZrRfBIzglonW"
                      alt="Dried fruits"
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-red-500/90 to-transparent"></div>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 text-white">
                    <p className="font-medium">Dried Fruits</p>
                    <button className="text-white text-sm group mt-1 flex items-center font-light">
                      Explore
                      <ChevronRight className="h-3 w-3 ml-1 group-hover:ml-2 transition-all duration-300" />
                    </button>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
                  <div className="relative h-32 w-32 md:h-36 md:w-36 lg:h-40 lg:w-40">
                    <img
                      src="https://14j7oh8kso.ufs.sh/f/HLxTbDBCDLwfkjpbb7QTQ7pf0e9PsF46LyowGjaXbxmYVUvg"
                      alt="Advent calendars"
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/90 to-transparent"></div>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <p className="font-medium">Advent Calendars</p>
                    <button className="text-white text-sm group mt-1 flex items-center font-light">
                      Explore
                      <ChevronRight className="h-3 w-3 ml-1 group-hover:ml-2 transition-all duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features banner with improved styling */}
        <div className="bg-gradient-to-r from-white/90 to-white/80 backdrop-blur-md py-6 px-4 sm:px-8 flex flex-wrap justify-between gap-4 sm:gap-6 rounded-b-2xl shadow-inner">
          <div className="flex items-center gap-3 transform hover:translate-y-[-2px] transition-transform duration-300">
            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 shadow-sm">
              🚚
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-800">
              Short supply chain
            </span>
          </div>
          <div className="flex items-center gap-3 transform hover:translate-y-[-2px] transition-transform duration-300">
            <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 shadow-sm">
              ⚖️
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-800">
              Fair prices
            </span>
          </div>
          <div className="flex items-center gap-3 transform hover:translate-y-[-2px] transition-transform duration-300">
            <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 shadow-sm">
              👍
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-800">
              High quality
            </span>
          </div>
          <div className="flex items-center gap-3 transform hover:translate-y-[-2px] transition-transform duration-300">
            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 shadow-sm">
              🌱
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-800">
              Transparency
            </span>
          </div>

          <div className="flex items-center gap-3 transform hover:translate-y-[-2px] transition-transform duration-300">
            <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 shadow-sm">
              🚀
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-800">
              Fast delivery
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
