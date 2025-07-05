"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Banner {
  id: string;
  desktopImage: string;
  mobileImage: string;
  link: string;
  alt: string;
}

const banners: Banner[] = [
  {
    id: "electronics-sale",
    desktopImage: "/images/momo/1.png",
    mobileImage: "/images/momo/b1.png",
    link: "/categories/electronics",
    alt: "Electronics Sale Banner",
  },
  {
    id: "fashion-week",
    desktopImage: "/images/momo/2.png",
    mobileImage: "/images/momo/b2.png",
    link: "/categories/fashion",
    alt: "Fashion Week Banner",
  },
  {
    id: "home-furniture",
    desktopImage: "/images/momo/3.png",
    mobileImage: "/images/momo/b3.png",
    link: "/categories/home-furniture",
    alt: "Home Furniture Banner",
  },
];

export default function MomoBannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 to-white">
      <div className="relative w-full h-[200px] md:h-[350px]  overflow-hidden">
        {/* Banner Slides */}
        <div className="relative w-full h-full">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }`}
            >
              <Link
                href={banner.link}
                className="block border border-red-600 w-full h-full md:h-auto"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="relative w-full h-full md:h-auto overflow-hidden">
                  {/* Desktop Image */}
                  <Image
                    src={banner.desktopImage || "/placeholder.svg"}
                    alt={banner.alt}
                    width={1376}
                    height={330}
                    className="object-cover w-full hidden md:block"
                    priority={index === 0}
                  />
                  {/* Mobile Image */}
                  <Image
                    src={banner.mobileImage || "/placeholder.svg"}
                    alt={banner.alt}
                    width={343}
                    height={195}
                    className="object-cover w-full block md:hidden"
                    priority={index === 0}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Desktop Navigation Buttons */}
        <div className="hidden md:block">
          <button
            onClick={prevSlide}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:text-white transition-colors" />
          </button>
          <button
            onClick={nextSlide}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-0 md:bottom-6 left-1/2 -translate-x-1/2 z-30">
          <div className="flex items-center gap-3 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide
                    ? "w-8 h-2 bg-white"
                    : "w-2 h-2 bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
