"use client";

import type React from "react";

import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: string;
  title: string;
  image: string;
  currentPrice: number;
  originalPrice?: number;
  discountPercentage?: number;
  link: string;
  isWishlisted?: boolean;
}

interface ProductListingProps {
  title?: string;
  products?: Product[];
  seeMoreLink?: string;
}

const sampleProducts: Product[] = [
  {
    id: "solar-lantern-a2",
    title: "dlight A2 Solar Lantern, 4+ hours, Portable, with...",
    image: "/images/momo/products/1.jpg",
    currentPrice: 21000,
    originalPrice: 29400,
    discountPercentage: 29,
    link: "/products/solar-lantern-a2",
    isWishlisted: false,
  },
  {
    id: "solar-system-d100",
    title: "dlight D100 Solar System, Up to 12hrs, 3-in-1...",
    image: "/images/momo/products/2.jpg",
    currentPrice: 260000,
    originalPrice: 310000,
    discountPercentage: 16,
    link: "/products/solar-system-d100",
    isWishlisted: true,
  },
  {
    id: "solar-lantern-s200",
    title: "dlight S200 Solar Lantern, up to 20hours, Charges...",
    image: "/images/momo/products/3.jpg",
    currentPrice: 60000,
    originalPrice: 76000,
    discountPercentage: 21,
    link: "/products/solar-lantern-s200",
    isWishlisted: false,
  },
  {
    id: "phone-case-iphone15",
    title: "Phone Case iPhone 15",
    image: "/images/momo/products/4.jpg",
    currentPrice: 35000,
    link: "/products/phone-case-iphone15",
    isWishlisted: false,
  },
  {
    id: "hisense-tv-32inch",
    title: "Hisense 32 Inch HD Digital Free To Air Tv",
    image: "/images/momo/products/5.jpg",
    currentPrice: 450000,
    link: "/products/hisense-tv-32inch",
    isWishlisted: true,
  },
];

function ProductCard({ product }: { product: Product }) {
  const [isWishlisted, setIsWishlisted] = useState(
    product.isWishlisted || false
  );

  const formatPrice = (price: number) => {
    return price.toLocaleString();
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add to cart logic here
    console.log(`Added ${product.title} to cart`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden   ">
      {/* Product Image */}
      <div className="relative aspect-square bg-slate-50 overflow-hidden">
        <Link href={product.link} className="block w-full h-full">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            width={500}
            height={500}
            className="object-cover transition-transform  w-full h-auto "
          />
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isWishlisted
              ? "bg-red-500 text-white"
              : "bg-white/90 backdrop-blur-sm text-slate-600 hover:bg-white hover:text-red-500"
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
        </button>

        {/* Discount Badge */}
        {product.discountPercentage && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
            {product.discountPercentage}% off
          </div>
        )}

        {/* Mobile Add to Cart Icon Button */}
        <button
          onClick={handleAddToCart}
          className="md:hidden absolute bottom-3 right-3 w-10 h-10 bg-slate-800 hover:bg-slate-900 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
        >
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <Link href={product.link} className="block">
          <h3 className="text-xs md:text-sm font-medium text-slate-900 line-clamp-2 hover:text-slate-700 transition-colors leading-relaxed">
            {product.title}
          </h3>
        </Link>

        {/* Price */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm md:text-lg font-semibold text-blue-600">
              UGX {formatPrice(product.currentPrice)}
            </span>
            {product.originalPrice && (
              <span className="text-xs md:text-sm text-slate-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Desktop Add to Cart Button */}
        <div className="hidden md:flex gap-4">
          <button
            onClick={handleAddToCart}
            className="hidden md:flex w-full bg-[#204462] text-white py-2 rounded-xl font-medium text-sm tracking-wide transition-all duration-300 hover:shadow-lg  items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
          <button
            onClick={handleAddToCart}
            className="hidden md:flex w-full bg-white  text-black border border-gray-300 py-2 rounded-xl font-medium text-sm tracking-wide transition-all duration-300 hover:shadow-lg  items-center justify-center gap-2"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MomoProductListing({
  title = "New Arrival",
  products = sampleProducts,
  seeMoreLink = "/products",
}: ProductListingProps) {
  return (
    <section className="w-full bg-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-light text-slate-900 tracking-wide">
            {title}
          </h2>
          <Link
            href={seeMoreLink}
            className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium tracking-wide"
          >
            See more
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
