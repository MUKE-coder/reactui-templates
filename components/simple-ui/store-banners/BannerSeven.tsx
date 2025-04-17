"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Heart,
  ShoppingCart,
  ArrowRight,
  Play,
  Star,
  Share2,
  Bookmark,
} from "lucide-react";
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

interface SlideData {
  id: number;
  bgGradient: string;
  title: string;
  subtitle: string;
  product: string;
  price: string;
  originalPrice: string;
  currency: string;
  imageSrc: string;
  thumbnailSrc?: string;
  decorations: string[];
  discount?: number;
  badge?: string;
  likes?: number;
  comments?: number;
  tag?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  icon,
  ...props
}) => {
  const baseClasses =
    "font-medium transition-all duration-300 rounded-md flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-1";

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
      "bg-gradient-to-r from-amber-500 to-yellow-400 text-white hover:from-amber-600 hover:to-yellow-500 focus:ring-amber-500 shadow-lg",
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

export default function BannerSeven() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [progress, setProgress] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  // Enhanced slide data with thumbnails
  const slides: SlideData[] = [
    {
      id: 1,
      bgGradient: "from-blue-900 via-blue-800 to-blue-700",
      title: "The Great Easter Sale",
      subtitle:
        "Shop till you drop with big discounts on Market by MoMo, Powered by Mastercard.",
      product: "Bluetooth Air PRO Wireless Earphone with Free Case",
      price: "24,000",
      originalPrice: "32,000",
      currency: "UGX",
      imageSrc:
        "https://14j7oh8kso.ufs.sh/f/HLxTbDBCDLwfh3SULbeu4JxgI1Ei3wHj6FV5GmcsPADLybTr",
      thumbnailSrc:
        "https://14j7oh8kso.ufs.sh/f/HLxTbDBCDLwfh3SULbeu4JxgI1Ei3wHj6FV5GmcsPADLybTr",
      decorations: ["🥚", "🌼", "☁️"],
      discount: 25,
      badge: "SALE",
      likes: 342,
      comments: 48,
      tag: "AUDIO",
    },
    {
      id: 2,
      bgGradient: "from-purple-900 via-purple-800 to-purple-700",
      title: "Weekly Tech Deals",
      subtitle: "Save big on the latest gadgets with exclusive MoMo discounts.",
      product: "Smart Watch Series 5 with Heart Rate Monitor",
      price: "185,000",
      originalPrice: "230,000",
      currency: "UGX",
      imageSrc:
        "https://14j7oh8kso.ufs.sh/f/HLxTbDBCDLwfBMzTto3NShrfTzZUm7VRw2b4ys6pjq1v03en",
      thumbnailSrc:
        "https://14j7oh8kso.ufs.sh/f/HLxTbDBCDLwfBMzTto3NShrfTzZUm7VRw2b4ys6pjq1v03en",
      decorations: ["⌚", "⚡", "✨"],
      discount: 20,
      badge: "HOT",
      likes: 274,
      comments: 32,
      tag: "WATCHES",
    },
    {
      id: 3,
      bgGradient: "from-emerald-900 via-emerald-800 to-emerald-700",
      title: "Mobile Madness",
      subtitle: "Upgrade your smartphone experience with our special offers.",
      product: "Galaxy X30 Ultra with 108MP Camera",
      price: "899,000",
      originalPrice: "1,200,000",
      currency: "UGX",
      imageSrc:
        "https://14j7oh8kso.ufs.sh/f/HLxTbDBCDLwf0hXuoktvnF3cx4uPCTU9aqg2f0oY8klybGQI",
      thumbnailSrc:
        "https://14j7oh8kso.ufs.sh/f/HLxTbDBCDLwf0hXuoktvnF3cx4uPCTU9aqg2f0oY8klybGQI",
      decorations: ["📱", "🔥", "💫"],
      discount: 25,
      badge: "POPULAR",
      likes: 512,
      comments: 78,
      tag: "PHONES",
    },
    {
      id: 4,
      bgGradient: "from-amber-800 via-amber-700 to-orange-700",
      title: "Premium Audio",
      subtitle:
        "Experience crystal clear sound with our premium audio collection.",
      product: "Studio Pro Over-Ear Noise Cancelling Headphones",
      price: "450,000",
      originalPrice: "599,000",
      currency: "UGX",
      imageSrc:
        "https://cdn.pixabay.com/photo/2018/09/17/14/27/headphones-3683983_1280.jpg",
      thumbnailSrc:
        "https://cdn.pixabay.com/photo/2018/09/17/14/27/headphones-3683983_1280.jpg",
      decorations: ["🎵", "🎧", "✨"],
      discount: 25,
      badge: "PREMIUM",
      likes: 642,
      comments: 93,
      tag: "AUDIO",
    },
  ];

  const currentSlideData = slides[currentSlide];

  // Handle autoplay
  useEffect(() => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
    }

    if (autoplay) {
      autoplayRef.current = setTimeout(() => {
        goToNextSlide();
      }, 5000);
    }

    return () => {
      if (autoplayRef.current) {
        clearTimeout(autoplayRef.current);
      }
    };
  }, [currentSlide, autoplay]);

  // Handle progress bar
  useEffect(() => {
    if (progressRef.current) {
      clearInterval(progressRef.current);
    }

    setProgress(0);

    if (autoplay) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0;
          }
          return prev + 100 / 50; // 5000ms / 50 = 100 steps
        });
      }, 50);

      progressRef.current = interval;
    }

    return () => {
      if (progressRef.current) {
        clearInterval(progressRef.current);
      }
    };
  }, [currentSlide, autoplay]);

  const goToNextSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const goToPrevSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handleThumbnailClick = (index: number) => {
    if (currentSlide === index || isAnimating) return;

    setIsAnimating(true);
    setCurrentSlide(index);

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div
      className="max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-2xl relative"
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >
      {/* Instagram-like header */}
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-amber-500 to-pink-500 p-[2px]">
            <div className="h-full w-full rounded-full flex items-center justify-center bg-white">
              <div className="bg-yellow-400 text-blue-900 p-1 rounded-md shadow">
                <ShoppingCart className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>
          <div>
            <div className="font-bold text-sm flex items-center">
              Market by MoMo
              <div className="ml-1 h-3.5 w-3.5 bg-blue-500 rounded-full flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  width="10"
                  height="10"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  className="text-white"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>
            <div className="text-xs text-gray-500">Sponsored</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-gray-700 transition-colors">
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            >
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </button>
          <button className="text-gray-500 hover:text-gray-700 transition-colors">
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            >
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div
        className={`bg-gradient-to-br ${currentSlideData.bgGradient} p-6 sm:p-8 md:p-10 relative min-h-[550px] transition-all duration-500 ease-in-out`}
      >
        {/* Progress bars - Instagram story style */}
        <div className="absolute top-4 left-0 right-0 flex px-4 space-x-1 z-30">
          {slides.map((_, index) => (
            <div
              key={`progress-${index}`}
              className="h-1 bg-white/30 rounded-full flex-1 overflow-hidden"
            >
              <div
                className={`h-full bg-white transition-all duration-100 ease-linear ${
                  index < currentSlide
                    ? "w-full"
                    : index > currentSlide
                    ? "w-0"
                    : ""
                }`}
                style={index === currentSlide ? { width: `${progress}%` } : {}}
              ></div>
            </div>
          ))}
        </div>

        {/* Category/Tag badge */}
        {currentSlideData.tag && (
          <div className="absolute top-8 left-6 z-20">
            <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-bold tracking-wide shadow-md">
              {currentSlideData.tag}
            </div>
          </div>
        )}

        {/* Sale badge */}
        {currentSlideData.badge && (
          <div className="absolute top-8 right-6 z-20">
            <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-amber-500 px-3 py-1 rounded-full shadow-md">
              <Star className="h-3 w-3 text-white fill-white" />
              <span className="text-xs font-bold tracking-wider text-white">
                {currentSlideData.badge}
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="mt-10 mb-4 text-white max-w-md">
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-3 leading-tight">
            {currentSlideData.title}
          </h1>
          <p className="text-sm text-white/90 leading-relaxed">
            {currentSlideData.subtitle}
          </p>
        </div>

        {/* Product image */}
        <div className="relative flex justify-center items-center mt-6 mb-12">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 text-3xl animate-pulse-slow">
            {currentSlideData.decorations[0]}
          </div>
          <div className="absolute bottom-0 right-0 text-3xl animate-float-slow">
            {currentSlideData.decorations[1]}
          </div>
          <div className="absolute top-1/2 left-0 text-3xl animate-bounce-slow">
            {currentSlideData.decorations[2]}
          </div>

          {/* Product image with effects */}
          <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-white/20 rounded-full blur-xl"></div>

              {/* Product stage - shadow beneath */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-8 bg-black/20 rounded-full blur-md"></div>

              {/* Product image */}
              <div className="relative z-10 bg-black/5 backdrop-blur-sm p-4 rounded-2xl shadow-2xl">
                <img
                  src={currentSlideData.imageSrc}
                  alt={currentSlideData.product}
                  className="h-56 w-56 object-contain rounded-xl z-20"
                />
              </div>

              {/* Discount tag if available */}
              {currentSlideData.discount && (
                <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold p-2 rounded-full shadow-lg z-20 flex items-center justify-center w-12 h-12 transform rotate-12">
                  <div className="text-center leading-none">
                    <span className="block text-lg font-black">
                      {currentSlideData.discount}%
                    </span>
                    <span className="text-[10px]">OFF</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Price tag - enhanced */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl max-w-xs mx-auto mb-8 border border-white/50">
          <div className="flex items-center justify-between mb-1">
            <div className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium">
              {currentSlideData.currency}
            </div>
            <div className="text-xs line-through text-red-500 font-medium">
              {currentSlideData.originalPrice}
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2 flex items-end">
            {currentSlideData.price}
            <span className="text-green-600 text-sm ml-2 font-medium">
              Save {currentSlideData.discount}%
            </span>
          </div>
          <div className="text-sm text-gray-700 font-medium">
            {currentSlideData.product}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center space-x-3">
          <Button
            variant="luxury"
            className="px-6 py-3 rounded-full text-sm font-bold tracking-wide shadow-xl transform hover:translate-y-[-2px] transition-all duration-300"
          >
            SHOP NOW <ChevronRight className="ml-1 h-4 w-4" />
          </Button>

          <Button
            variant="secondary"
            className="px-4 py-3 rounded-full text-sm font-bold tracking-wide shadow-lg transform hover:translate-y-[-2px] transition-all duration-300"
          >
            LEARN MORE
          </Button>
        </div>

        {/* Instagram-like action bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm py-3 px-4 flex justify-between items-center border-t border-white/10">
          <div className="flex space-x-4">
            <button
              className="text-white hover:text-red-400 transition-colors duration-300 flex items-center"
              onClick={toggleLike}
            >
              <Heart
                className={`h-5 w-5 ${
                  isLiked ? "fill-red-500 text-red-500" : ""
                }`}
              />
              <span className="ml-1 text-xs font-medium">
                {isLiked ? currentSlideData.likes! + 1 : currentSlideData.likes}
              </span>
            </button>

            <button className="text-white hover:text-white/80 transition-colors duration-300 flex items-center">
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              <span className="ml-1 text-xs font-medium">
                {currentSlideData.comments}
              </span>
            </button>

            <button className="text-white hover:text-white/80 transition-colors duration-300">
              <Share2 className="h-5 w-5" />
            </button>
          </div>

          <button
            className="text-white hover:text-yellow-400 transition-colors duration-300"
            onClick={toggleBookmark}
          >
            <Bookmark
              className={`h-5 w-5 ${
                isBookmarked ? "fill-yellow-400 text-yellow-400" : ""
              }`}
            />
          </button>
        </div>

        {/* Navigation arrows - enhanced for Instagram style */}
        <button
          className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-all duration-300 border border-white/20 backdrop-blur-sm z-20"
          onClick={goToPrevSlide}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-all duration-300 border border-white/20 backdrop-blur-sm z-20"
          onClick={goToNextSlide}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Instagram-style thumbnails */}
      <div className="bg-gray-100 px-4 py-4 flex items-center justify-center space-x-2 overflow-x-auto scrollbar-thin">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`relative flex-shrink-0 focus:outline-none transform transition-all duration-300 ${
              currentSlide === index
                ? "scale-100 opacity-100 ring-2 ring-blue-500"
                : "scale-95 opacity-70 hover:opacity-100 hover:scale-100"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className="w-16 h-16 rounded-lg overflow-hidden">
              <img
                src={slide.thumbnailSrc || slide.imageSrc}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            {currentSlide === index && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
