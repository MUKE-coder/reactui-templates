"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Star,
  Tag,
  ArrowRight,
  ShoppingBag,
  Heart,
  Eye,
} from "lucide-react";

// Define types
interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  slug: string;
  isNew?: boolean;
  discount?: string;
  category: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  icon: React.ReactNode;
  color: string;
}

export default function CategorySix() {
  const [activeCategory, setActiveCategory] = useState<string>("electronics");
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Categories data
  const categories: Category[] = [
    {
      id: 1,
      name: "Electronics",
      slug: "electronics",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        >
          <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
          <line x1="2" y1="10" x2="22" y2="10"></line>
        </svg>
      ),
      color: "text-blue-600",
    },
    {
      id: 2,
      name: "Fashion",
      slug: "fashion",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        >
          <path d="M6.5 19H19V9.88889L16.6667 7H8.5L6.5 9.88889V19Z"></path>
          <path d="M6 19H3V14"></path>
          <path d="M21 19H19"></path>
          <path d="M2 19H1"></path>
          <path d="M12.5 12C12.5 11.4477 12.0523 11 11.5 11C10.9477 11 10.5 11.4477 10.5 12C10.5 12.5523 10.9477 13 11.5 13C12.0523 13 12.5 12.5523 12.5 12Z"></path>
        </svg>
      ),
      color: "text-green-700",
    },
    {
      id: 3,
      name: "Home & Kitchen",
      slug: "home-kitchen",
      icon: (
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
      ),
      color: "text-emerald-600",
    },
    {
      id: 4,
      name: "Beauty & Health",
      slug: "beauty-health",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      ),
      color: "text-purple-600",
    },
    {
      id: 5,
      name: "Sports & Outdoors",
      slug: "sports",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M16 12H8"></path>
          <path d="M12 16V8"></path>
        </svg>
      ),
      color: "text-orange-600",
    },
    {
      id: 6,
      name: "Toys & Games",
      slug: "toys-games",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        >
          <circle cx="5" cy="12" r="3"></circle>
          <circle cx="19" cy="12" r="3"></circle>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
      ),
      color: "text-red-600",
    },
  ];

  // Products data
  const products: Product[] = [
    // Electronics products
    {
      id: 1,
      name: "Premium Wireless Headphones",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: 249.99,
      originalPrice: 299.99,
      rating: 4.8,
      slug: "premium-wireless-headphones",
      isNew: true,
      category: "electronics",
    },
    {
      id: 2,
      name: "4K Ultra HD Smart TV",
      image:
        "https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: 799.99,
      originalPrice: 999.99,
      rating: 4.6,
      slug: "4k-ultra-hd-smart-tv",
      discount: "20% OFF",
      category: "electronics",
    },
    {
      id: 3,
      name: "Smartphone Pro Max",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: 1099.99,
      rating: 4.9,
      slug: "smartphone-pro-max",
      category: "electronics",
    },
    {
      id: 4,
      name: "Wireless Gaming Mouse",
      image:
        "https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.5,
      slug: "wireless-gaming-mouse",
      category: "electronics",
    },
    {
      id: 5,
      name: "Ultra Slim Laptop Pro",
      image:
        "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: 1299.99,
      originalPrice: 1499.99,
      rating: 4.7,
      slug: "ultra-slim-laptop-pro",
      category: "electronics",
    },
    {
      id: 6,
      name: "Digital Camera with 4K",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: 649.99,
      rating: 4.4,
      slug: "digital-camera-with-4k",
      category: "electronics",
    },

    // Fashion products
    {
      id: 7,
      name: "Designer Dress",
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: 129.99,
      originalPrice: 169.99,
      rating: 4.3,
      slug: "designer-dress",
      category: "fashion",
    },
    {
      id: 8,
      name: "Premium Leather Jacket",
      image:
        "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: 249.99,
      rating: 4.6,
      slug: "premium-leather-jacket",
      category: "fashion",
    },
    {
      id: 9,
      name: "Athletic Running Shoes",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: 119.99,
      originalPrice: 149.99,
      rating: 4.7,
      slug: "athletic-running-shoes",
      category: "fashion",
      discount: "20% OFF",
    },
    {
      id: 10,
      name: "Designer Sunglasses",
      image:
        "https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: 179.99,
      rating: 4.2,
      slug: "designer-sunglasses",
      category: "fashion",
    },
    {
      id: 11,
      name: "Luxury Wristwatch",
      image:
        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: 399.99,
      originalPrice: 499.99,
      rating: 4.8,
      slug: "luxury-wristwatch",
      category: "fashion",
      isNew: true,
    },
    {
      id: 12,
      name: "Designer Handbag",
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: 299.99,
      rating: 4.5,
      slug: "designer-handbag",
      category: "fashion",
    },

    // Home & Kitchen products
    {
      id: 13,
      name: "Smart Home Assistant",
      image:
        "https://images.unsplash.com/photo-1558002038-1055e2dae8d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: 129.99,
      originalPrice: 149.99,
      rating: 4.7,
      slug: "smart-home-assistant",
      category: "home-kitchen",
      isNew: true,
    },
    {
      id: 14,
      name: "Professional Stand Mixer",
      image:
        "https://images.unsplash.com/photo-1594483167202-ef58cba12114?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: 349.99,
      rating: 4.9,
      slug: "professional-stand-mixer",
      category: "home-kitchen",
    },
    {
      id: 15,
      name: "Espresso Coffee Machine",
      image:
        "https://images.unsplash.com/photo-1520349247808-2b251431318a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.6,
      slug: "espresso-coffee-machine",
      category: "home-kitchen",
      discount: "25% OFF",
    },
    {
      id: 16,
      name: "Luxury Bedding Set",
      image:
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: 199.99,
      rating: 4.5,
      slug: "luxury-bedding-set",
      category: "home-kitchen",
    },
    {
      id: 17,
      name: "Modern Desk Lamp",
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: 89.99,
      originalPrice: 119.99,
      rating: 4.4,
      slug: "modern-desk-lamp",
      category: "home-kitchen",
    },
    {
      id: 18,
      name: "Premium Cookware Set",
      image:
        "https://images.unsplash.com/photo-1585237672614-8f85178b4f14?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: 249.99,
      rating: 4.8,
      slug: "premium-cookware-set",
      category: "home-kitchen",
    },
  ];

  // Filter products by active category
  const filteredProducts = products.filter(
    (product) => product.category === activeCategory
  );

  // Function to render stars based on rating
  const renderRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < fullStars
                ? "text-yellow-400 fill-yellow-400"
                : i === fullStars && hasHalfStar
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-1 text-xs text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="w-full py-12 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
          <p className="text-gray-600 mt-2">
            Browse our premium selection by category
          </p>
        </div>

        {/* Tab navigation */}
        <div className="mb-10 overflow-x-auto pb-2">
          <div className="flex space-x-2 md:space-x-4 min-w-max md:justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.slug)}
                className={`flex items-center px-4 py-2.5 rounded-full border ${
                  activeCategory === category.slug
                    ? `bg-blue-700 text-white border-transparent`
                    : "bg-white border-gray-200 hover:bg-gray-50"
                } transition-colors shadow-sm`}
              >
                <span
                  className={`${
                    activeCategory !== category.slug ? category.color : ""
                  } mr-2`}
                >
                  {category.icon}
                </span>
                <span className="font-medium whitespace-nowrap">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product, idx) => (
            <a
              key={product.id}
              href={`/product/${product.slug}`}
              className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.5s ease",
                transitionDelay: `${idx * 0.05}s`,
              }}
            >
              {/* Product image */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay with actions - only show on hover */}
                <div
                  className={`absolute inset-0 bg-black/30 flex items-center justify-center gap-2 transition-opacity duration-300 ${
                    hoveredProduct === product.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <button className="p-2 bg-white rounded-full text-gray-800 hover:bg-gray-100 transition-colors">
                    <Eye className="h-5 w-5" />
                  </button>
                  <button className="p-2 bg-white rounded-full text-gray-800 hover:bg-gray-100 transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="p-2 bg-white rounded-full text-gray-800 hover:bg-gray-100 transition-colors">
                    <ShoppingBag className="h-5 w-5" />
                  </button>
                </div>

                {/* Product badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.isNew && (
                    <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                      NEW
                    </span>
                  )}
                  {product.discount && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                      {product.discount}
                    </span>
                  )}
                </div>
              </div>

              {/* Product info */}
              <div className="p-4">
                <h3 className="text-gray-800 font-medium text-sm mb-1 line-clamp-2 h-10">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="mb-2">{renderRatingStars(product.rating)}</div>

                {/* Price */}
                <div className="flex items-center">
                  <span className="text-gray-900 font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="ml-2 text-gray-500 text-sm line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* View all button */}
        <div className="flex justify-center mt-10">
          <a
            href={`/category/${activeCategory}`}
            className="flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-sm"
          >
            View All {categories.find((c) => c.slug === activeCategory)?.name}{" "}
            Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
