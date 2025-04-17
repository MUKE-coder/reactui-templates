"use client";

import { useState, useEffect } from "react";
import {
  ChevronRight,
  ChevronLeft,
  ShoppingBag,
  Star,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

// TypeScript interfaces
interface Category {
  icon: string;
  label: string;
  slug: string;
  featured?: boolean;
}

interface BannerSlide {
  id: number;
  bgColor: string;
  bgImage?: string;
  title: string;
  subtitle?: string;
  date: string;
  product: string;
  specs: string;
  price: string;
  originalPrice: string;
  currency: string;
  imageSrc: string;
  discount?: number;
  badgeText?: string;
}

// Enhanced Category Item component
// Custom icons for categories
const getCategoryIcon = (icon: string, featured: boolean = false) => {
  const iconMap: { [key: string]: JSX.Element } = {
    "📱": (
      <div className="flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        >
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
          <line x1="12" y1="18" x2="12" y2="18"></line>
        </svg>
      </div>
    ),
    "💻": (
      <div className="flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="2" y1="20" x2="22" y2="20"></line>
        </svg>
      </div>
    ),
    "⌚": (
      <div className="flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        >
          <circle cx="12" cy="12" r="7"></circle>
          <polyline points="12 9 12 12 13.5 13.5"></polyline>
          <path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"></path>
        </svg>
      </div>
    ),
    "📺": (
      <div className="flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        >
          <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
          <polyline points="17 2 12 7 7 2"></polyline>
        </svg>
      </div>
    ),
    "🧊": (
      <div className="flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        </svg>
      </div>
    ),
    "🎮": (
      <div className="flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        >
          <line x1="6" y1="12" x2="10" y2="12"></line>
          <line x1="8" y1="10" x2="8" y2="14"></line>
          <circle cx="15" cy="13" r="1"></circle>
          <circle cx="18" cy="11" r="1"></circle>
          <rect x="2" y="6" width="20" height="12" rx="2"></rect>
        </svg>
      </div>
    ),
    "💎": (
      <div className="flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        >
          <polygon points="16 2 20 6 8 18 4 14 16 2"></polygon>
          <line x1="8" y1="18" x2="2" y2="24"></line>
          <line x1="16" y1="10" x2="22" y2="4"></line>
        </svg>
      </div>
    ),
    "🏠": (
      <div className="flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      </div>
    ),
    "👔": (
      <div className="flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        >
          <path d="M16 4H8l-1 10h3l2-5 2 5h3L16 4z"></path>
          <path d="M21 20l-5-9 5-7H3l5 7-5 9"></path>
        </svg>
      </div>
    ),
    "🥂": (
      <div className="flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        >
          <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
          <line x1="6" y1="1" x2="6" y2="4"></line>
          <line x1="10" y1="1" x2="10" y2="4"></line>
          <line x1="14" y1="1" x2="14" y2="4"></line>
        </svg>
      </div>
    ),
    "🏪": (
      <div className="flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        >
          <path d="M3 3h18v18H3zM12 8v8m-4-4h8"></path>
        </svg>
      </div>
    ),
    "🌟": (
      <div className="flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      </div>
    ),
  };

  // Return custom icon if it exists, or fallback to text icon
  return iconMap[icon] || <span className="text-lg">{icon}</span>;
};

const CategoryItem: React.FC<Category> = ({ icon, label, slug, featured }) => (
  <a
    href={`/category/${slug}`}
    className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
      featured
        ? "bg-gradient-to-r from-amber-50 to-transparent border-l-2 border-amber-500"
        : "hover:bg-white/70 hover:shadow-sm"
    }`}
  >
    <div
      className={`flex justify-center items-center w-10 h-10 rounded-full ${
        featured
          ? "bg-gradient-to-br from-amber-500 to-amber-400 text-white shadow-md"
          : "bg-white/80 text-gray-700 group-hover:bg-gradient-to-br group-hover:from-gray-50 group-hover:to-white group-hover:shadow-sm"
      } transition-all duration-300`}
    >
      {getCategoryIcon(icon, featured)}
    </div>
    <span
      className={`font-medium transition-colors duration-300 ${
        featured ? "text-gray-800" : "text-gray-600 group-hover:text-gray-800"
      }`}
    >
      {label}
    </span>
    {featured && (
      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ChevronRight className="h-4 w-4 text-amber-500" />
      </div>
    )}
  </a>
);

export default function BannerTwo(): JSX.Element {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [autoplay, setAutoplay] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Enhanced Categories with featured flag
  const categories: Category[] = [
    {
      icon: "📱",
      label: "Premium Phones",
      slug: "premium-phones",
      featured: true,
    },
    {
      icon: "💻",
      label: "Luxury Computing",
      slug: "luxury-computing",
      featured: true,
    },
    {
      icon: "⌚",
      label: "Designer Watches",
      slug: "designer-watches",
      featured: true,
    },
    { icon: "📺", label: "High-End Electronics", slug: "high-end-electronics" },
    { icon: "🧊", label: "Smart Appliances", slug: "smart-appliances" },
    { icon: "🎮", label: "Gaming & Entertainment", slug: "gaming" },
    { icon: "💎", label: "Jewelry & Accessories", slug: "jewelry" },
    { icon: "🏠", label: "Smart Home", slug: "smart-home" },
    { icon: "👔", label: "Designer Fashion", slug: "designer-fashion" },
    { icon: "🥂", label: "Luxury Lifestyle", slug: "luxury-lifestyle" },
    { icon: "🏪", label: "Exclusive Brands", slug: "exclusive-brands" },
    { icon: "🌟", label: "Limited Editions", slug: "limited-editions" },
  ];

  // Enhanced Banner slides with more premium data
  const bannerSlides: BannerSlide[] = [
    {
      id: 1,
      bgColor: "from-indigo-900 via-purple-800 to-violet-900",
      bgImage: "url('/images/luxury-pattern.png')",
      title: "EXCLUSIVE EDITION",
      subtitle: "Limited availability",
      date: "APRIL COLLECTION",
      product: "iPhone 15 Pro Max",
      specs: "1TB | Titanium | ProMotion",
      price: "1,599",
      originalPrice: "1,799",
      currency: "USD",
      imageSrc:
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      discount: 11,
      badgeText: "LIMITED",
    },
    {
      id: 2,
      bgColor: "from-slate-900 via-blue-900 to-slate-800",
      bgImage: "url('/images/tech-pattern.png')",
      title: "SIGNATURE SERIES",
      subtitle: "Member exclusive",
      date: "NEW ARRIVAL",
      product: "Samsung Galaxy Z Fold",
      specs: "12GB | 1TB | Flex Display",
      price: "1,899",
      originalPrice: "2,099",
      currency: "USD",
      imageSrc:
        "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      discount: 10,
      badgeText: "PREMIUM",
    },
    {
      id: 3,
      bgColor: "from-emerald-900 via-teal-800 to-emerald-800",
      bgImage: "url('/images/elite-pattern.png')",
      title: "ELITE COLLECTION",
      subtitle: "Redefining luxury",
      date: "FEATURED PRODUCT",
      product: "MacBook Pro M3 Max",
      specs: "32GB | 2TB | Liquid Retina XDR",
      price: "3,499",
      originalPrice: "3,799",
      currency: "USD",
      imageSrc:
        "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      discount: 8,
      badgeText: "ELITE",
    },
  ];

  const currentSlide = bannerSlides[activeSlide];

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, bannerSlides.length]);

  // Pause autoplay when user interacts
  const handleSlideChange = (index: number): void => {
    setActiveSlide(index);
    setAutoplay(false);
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setAutoplay(true), 10000);
  };

  const goToNextSlide = (): void => {
    setActiveSlide((prev) => (prev + 1) % bannerSlides.length);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 10000);
  };

  const goToPrevSlide = (): void => {
    setActiveSlide(
      (prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length
    );
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 10000);
  };

  // Animation classes
  const fadeInClass = isVisible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-10";

  return (
    <div
      className={`mx-auto max-w-7xl overflow-hidden rounded-2xl shadow-xl border border-gray-100 transition-all duration-1000 ${fadeInClass}`}
    >
      <div className="flex flex-col md:flex-row">
        {/* Category listing - with premium styling */}
        <div className="hidden md:block w-full md:w-1/4 bg-gradient-to-b from-gray-50 to-white backdrop-blur-sm rounded-l-2xl shadow-lg z-10">
          {/* Category header */}
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <span className="bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                Premium Categories
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>
            </h3>
          </div>

          {/* Categories with premium styling */}
          <div className="flex flex-col w-full p-3 max-h-[480px] overflow-y-auto custom-scrollbar">
            {categories.map((category, index) => (
              <CategoryItem
                key={index}
                icon={category.icon}
                label={category.label}
                slug={category.slug}
                featured={category.featured}
              />
            ))}
          </div>

          {/* See all categories link - enhanced design */}
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
            <a
              href="/categories"
              className="flex items-center justify-between text-sm font-medium text-gray-600 hover:text-amber-600 transition-all duration-300 group"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                  <svg
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  >
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                    <polyline points="16 6 12 2 8 6"></polyline>
                    <line x1="12" y1="2" x2="12" y2="15"></line>
                  </svg>
                </div>
                <span className="group-hover:translate-x-0.5 transition-transform duration-300">
                  View all categories
                </span>
              </div>
              <div className="bg-amber-50 rounded-full p-1 transform group-hover:translate-x-1 transition-transform duration-300">
                <ChevronRight className="h-3 w-3 text-amber-500" />
              </div>
            </a>
          </div>
        </div>

        {/* Banner area - with premium styling */}
        <div className="w-full md:w-3/4 relative">
          <div
            className={`bg-gradient-to-br ${currentSlide.bgColor} relative p-6 md:p-10 lg:p-12 h-full min-h-[400px] md:min-h-[550px] flex flex-col md:flex-row items-center overflow-hidden`}
            // style={{
            //   backgroundImage: currentSlide.bgImage,
            //   backgroundSize: "cover",
            // }}
          >
            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-white rounded-full blur-3xl"></div>
            </div>

            {/* Premium badge */}
            {currentSlide.badgeText && (
              <div className="absolute top-6 right-6 z-20">
                <div className="bg-amber-500 px-4 py-1 rounded-full flex items-center gap-1 shadow-lg">
                  <Star className="h-3 w-3 text-white fill-white" />
                  <span className="text-xs font-bold tracking-widest text-white">
                    {currentSlide.badgeText}
                  </span>
                </div>
              </div>
            )}

            {/* Banner content */}
            <div className="w-full md:w-1/2 mb-8 md:mb-0 z-10">
              <div className="flex flex-col">
                <div className="inline-block mb-2">
                  <div className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium shadow-sm">
                    {currentSlide.date}
                  </div>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-wide leading-tight mb-2 drop-shadow-md">
                  {currentSlide.title}
                </h1>

                {currentSlide.subtitle && (
                  <p className="text-lg text-white font-light mb-6 drop-shadow-sm">
                    {currentSlide.subtitle}
                  </p>
                )}

                <div className="mt-6 md:mt-8 space-y-3">
                  <h3 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">
                    {currentSlide.product}
                  </h3>
                  <p className="text-xl md:text-2xl font-medium text-white drop-shadow-sm">
                    {currentSlide.specs}
                  </p>

                  <div className="mt-6 inline-block">
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/20 shadow-lg">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-white font-semibold uppercase">
                            {currentSlide.currency}
                          </span>
                          <span className="text-2xl md:text-3xl font-bold text-white">
                            {currentSlide.price}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm line-through text-white/80">
                            {currentSlide.originalPrice}
                          </span>
                          {currentSlide.discount && (
                            <span className="text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full font-bold">
                              SAVE {currentSlide.discount}%
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-x-4 flex items-center">
                  <button
                    className="bg-white hover:bg-gray-50 text-gray-900 font-bold py-3 px-8 rounded-lg flex items-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    type="button"
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    SHOP NOW
                  </button>
                  {/* <button
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-medium py-3 px-6 rounded-lg flex items-center transition-all duration-300 shadow-md"
                    type="button"
                  >
                    LEARN MORE
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </button> */}
                </div>

                {/* Terms text */}
                <p className="text-xs text-white/80 mt-6 drop-shadow-sm">
                  * Premium delivery included. Terms & conditions apply.
                </p>
              </div>
            </div>

            {/* Banner image with premium effects */}
            <div className="w-full md:w-1/2 flex justify-center items-center">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 -m-8 bg-amber-500/20 rounded-full blur-3xl opacity-80"></div>

                {/* Product stage - adds a platform beneath the product */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-16 bg-black/10 rounded-full blur-md"></div>

                {/* Product image */}
                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-3xl shadow-2xl relative z-10 transform hover:scale-105 transition-transform duration-500">
                  <img
                    src={currentSlide.imageSrc}
                    alt={currentSlide.product}
                    className="max-h-64 sm:max-h-80 md:max-h-96 object-contain rounded-2xl shadow-inner z-10 relative"
                  />
                </div>

                {/* NEW badge - improved visibility */}
                <div className="absolute -top-4 -right-4 bg-amber-500 text-white p-2 px-3 rounded-full shadow-lg z-20 font-bold text-xs flex items-center justify-center">
                  NEW
                </div>

                {/* Extra decorative element */}
                <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full border-4 border-white/20 z-0"></div>
              </div>
            </div>

            {/* Enhanced navigation arrows */}
            <button
              onClick={goToPrevSlide}
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white p-3 rounded-full shadow-lg transition-all duration-300 border border-white/10 group"
              aria-label="Previous slide"
              type="button"
            >
              <ChevronLeft className="h-5 w-5 group-hover:scale-110 transition-transform" />
            </button>

            <button
              onClick={goToNextSlide}
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white p-3 rounded-full shadow-lg transition-all duration-300 border border-white/10 group"
              aria-label="Next slide"
              type="button"
            >
              <ChevronRight className="h-5 w-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Enhanced dots navigation */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
            {bannerSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`transition-all duration-300 rounded-full ${
                  activeSlide === index
                    ? "w-8 h-2 bg-white shadow-md"
                    : "w-2 h-2 bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                type="button"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
