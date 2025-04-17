"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Monitor,
  Home,
  Smartphone,
  Gift,
  TrendingUp,
  Star,
  Package,
  Tv,
  Zap,
  ShoppingBag,
  Globe,
  DollarSign,
  Award,
  Search,
  ArrowRight,
} from "lucide-react";

interface CategoryItem {
  id: number;
  name: string;
  slug: string;
  icon: React.ReactNode;
  description: string;
  featured?: boolean;
  isNew?: boolean;
  discount?: string;
  itemCount?: number;
}

export default function CategoryThree() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Premium categories data with descriptions and item counts
  const categories: CategoryItem[] = [
    {
      id: 1,
      name: "3D Illustrations",
      slug: "3d-illustrations",
      icon: <Gift className="w-10 h-10 text-blue-500" />,
      description: "High-quality 3D graphic assets and illustrations",
      itemCount: 1248,
      isNew: true,
    },
    {
      id: 2,
      name: "Illustration Constructors",
      slug: "illustration-constructors",
      icon: <Package className="w-10 h-10 text-gray-600" />,
      description: "Customizable illustration building tools and elements",
      itemCount: 865,
    },
    {
      id: 3,
      name: "Vector Illustrations",
      slug: "vector-illustrations",
      icon: <Star className="w-10 h-10 text-yellow-500" />,
      description: "Scalable vector graphics and design elements",
      itemCount: 1573,
    },
    {
      id: 4,
      name: "Mockups",
      slug: "mockups",
      icon: <Monitor className="w-10 h-10 text-purple-500" />,
      description: "Product templates and presentation mockups",
      itemCount: 932,
      discount: "SALE",
    },
    {
      id: 5,
      name: "Coded Templates",
      slug: "coded-templates",
      icon: <Zap className="w-10 h-10 text-green-500" />,
      description: "Ready-to-use code templates and frameworks",
      itemCount: 421,
    },
    {
      id: 6,
      name: "Web UI Kits",
      slug: "web-ui-kits",
      icon: <Globe className="w-10 h-10 text-blue-600" />,
      description: "Complete user interface component libraries",
      itemCount: 783,
    },
    {
      id: 7,
      name: "Icons",
      slug: "icons",
      icon: <ShoppingBag className="w-10 h-10 text-red-500" />,
      description: "Icon sets and symbol libraries for digital projects",
      itemCount: 2451,
      featured: true,
    },
    {
      id: 8,
      name: "Fonts",
      slug: "fonts",
      icon: <Award className="w-10 h-10 text-amber-500" />,
      description: "Premium typefaces and typography collections",
      itemCount: 967,
    },
  ];

  return (
    <>
      {/* Hero Section with Clean Design */}
      <div className="w-full bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-24 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Design <span className="text-green-600">resources</span> that
              <br />
              will boost your <span className="text-green-600">
                creative
              </span>{" "}
              workflow
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mb-10">
              Find and download the best high-quality 3D and vector
              illustrations, fonts, designs and mockups
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <a
                href="/pro-access"
                className="bg-black hover:bg-gray-900 text-white font-medium py-3 px-8 rounded-full transition-all shadow-md hover:shadow-lg"
              >
                Get Pro Access
              </a>
              <a
                href="/catalog"
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-8 rounded-full transition-all"
              >
                Explore Catalog
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section with Premium Design */}
      <div className="w-full py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div
            className={`mb-12 transition-opacity duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Top categories
                </h2>
                <p className="text-gray-500 mt-2">
                  Browse our premium collection of design resources
                </p>
              </div>
              <a
                href="/categories"
                className="hidden md:flex items-center text-sm font-medium text-gray-700 hover:text-black transition-colors group"
              >
                See all
                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Premium Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, idx) => (
              <a
                key={category.id}
                href={`/category/${category.slug}`}
                className="group flex items-center p-6 rounded-xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                style={{
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  opacity: isVisible ? 1 : 0,
                  transition: "all 0.7s ease",
                  transitionDelay: `${idx * 0.05}s`,
                }}
              >
                {/* Icon in circle with subtle gradient background */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-gray-50 group-hover:bg-gray-100 transition-colors">
                    {category.icon}
                  </div>
                </div>

                {/* Content with flex-grow */}
                <div className="ml-5 flex-grow">
                  <div className="flex items-center">
                    <h3 className="text-base font-semibold text-gray-900">
                      {category.name}
                    </h3>
                    {/* {category.isNew && (
                      <span className="ml-2 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                        NEW
                      </span>
                    )} */}
                    {/* {category.discount && (
                      <span className="ml-2 text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                        {category.discount}
                      </span>
                    )} */}
                  </div>

                  {/* <p className="text-sm text-gray-500 mt-1">
                    {category.description}
                  </p> */}

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {category.itemCount} items
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900 transform group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Mobile "View All" button */}
          <div className="mt-10 flex justify-center md:hidden">
            <a
              href="/categories"
              className="flex items-center justify-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-800 transition-colors"
            >
              See all categories
              <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
