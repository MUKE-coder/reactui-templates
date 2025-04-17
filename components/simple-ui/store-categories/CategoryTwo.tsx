"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, TrendingUp, Star } from "lucide-react";

interface CategoryItem {
  id: number;
  name: string;
  slug: string;
  image: string;
  featured?: boolean;
  isNew?: boolean;
  discount?: string;
  overlayColor?: string;
}

export default function CategoryTwo() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Premium categories data without featured items
  const categories: CategoryItem[] = [
    {
      id: 1,
      name: "Shop Now",
      slug: "promotions",
      image:
        "https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      discount: "50% OFF",
      overlayColor: "from-orange-500 to-amber-600",
    },
    {
      id: 2,
      name: "Home & Kitchen",
      slug: "home-kitchen",
      image:
        "https://images.unsplash.com/photo-1584477710383-c790ca8f19e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      overlayColor: "from-emerald-500/80 to-teal-600/80",
    },
    {
      id: 3,
      name: "Computing",
      slug: "computing",
      image:
        "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      overlayColor: "from-blue-600/80 to-blue-800/80",
    },
    {
      id: 4,
      name: "Phones",
      slug: "phones",
      image:
        "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      overlayColor: "from-purple-600/80 to-purple-800/80",
    },
    {
      id: 5,
      name: "China Mall",
      slug: "china-mall",
      image:
        "https://images.unsplash.com/photo-1547949003-9792a18a2601?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      overlayColor: "from-gray-700/80 to-gray-900/80",
    },
    {
      id: 6,
      name: "New Arrivals",
      slug: "new-arrivals",
      image:
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      isNew: true,
      overlayColor: "from-sky-500/80 to-sky-700/80",
    },
    {
      id: 7,
      name: "Televisions",
      slug: "televisions",
      image:
        "https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      overlayColor: "from-blue-800/80 to-gray-900/80",
    },
    {
      id: 8,
      name: "Appliances",
      slug: "appliances",
      image:
        "https://images.unsplash.com/photo-1556911220-bda9f7f8677e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      overlayColor: "from-gray-500/80 to-gray-700/80",
    },
    {
      id: 9,
      name: "Super Saver Sale",
      slug: "super-saver-sale",
      image:
        "https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      discount: "SALE",
      overlayColor: "from-red-500/80 to-red-700/80",
    },
    {
      id: 10,
      name: "Shipped from Abroad",
      slug: "shipped-from-abroad",
      image:
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      overlayColor: "from-indigo-600/80 to-indigo-800/80",
    },
    {
      id: 11,
      name: "Make Extra Cash",
      slug: "make-extra-cash",
      image:
        "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      overlayColor: "from-amber-500/80 to-orange-600/80",
    },
    {
      id: 12,
      name: "Premium Picks",
      slug: "premium-picks",
      image:
        "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      overlayColor: "from-amber-700/80 to-yellow-800/80",
    },
  ];

  return (
    <div className="w-full py-10 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          className={`mb-8 transition-opacity duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-1 h-8 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Explore Popular Categories
              </h2>
            </div>
            <a
              href="/categories"
              className="hidden md:flex items-center text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
            >
              View All Categories
              <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>
          <p className="text-gray-500 mt-2 ml-4">
            Discover our selection of premium products
          </p>
        </div>

        {/* Premium Grid Component */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-5">
          {categories.map((category, idx) => (
            <a
              key={category.id}
              href={`/category/${category.slug}`}
              className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              style={{
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                opacity: isVisible ? 1 : 0,
                transition: "all 0.7s ease",
                transitionDelay: `${idx * 0.05}s`,
              }}
            >
              {/* Card with consistent aspect ratio */}
              <div className="aspect-square relative overflow-hidden">
                {/* Background Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Premium overlay with gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${
                    category.overlayColor ||
                    "from-gray-900/90 via-gray-900/60 to-transparent"
                  } transition-opacity duration-300 ${
                    hoveredCategory === category.id
                      ? "opacity-95"
                      : "opacity-85"
                  }`}
                ></div>

                {/* Badge for deals or new items */}
                {category.discount && (
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-red-600 text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                    {category.discount}
                  </div>
                )}

                {category.isNew && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md flex items-center">
                    <Star className="w-3 h-3 mr-0.5 fill-white" /> NEW
                  </div>
                )}

                {/* Beautifully overlaid category title */}
                <div className="absolute inset-x-0 bottom-0 p-4 flex items-end">
                  <div className="transform group-hover:translate-y-[-4px] transition-transform duration-300 w-full">
                    <h3 className="text-white text-sm md:text-base font-medium leading-tight">
                      {category.name}
                    </h3>

                    {/* Subtle line animation */}
                    <div className="h-0.5 w-0 bg-white mt-2 group-hover:w-1/2 transition-all duration-500 ease-out"></div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Mobile "View All" button */}
        <div className="mt-8 flex justify-center md:hidden">
          <a
            href="/categories"
            className="flex items-center justify-center px-6 py-2.5 bg-white border border-amber-200 rounded-lg text-sm font-medium text-amber-700 shadow-sm hover:bg-amber-50 transition-colors"
          >
            View All Categories
            <ChevronRight className="h-4 w-4 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
}
