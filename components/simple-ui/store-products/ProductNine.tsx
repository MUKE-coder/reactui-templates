"use client";

import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  Heart,
  Eye,
  Star,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestseller?: boolean;
}

const premiumProducts: Product[] = [
  {
    id: "1",
    name: "ECO RAINBOW SHOES",
    slug: "eco-rainbow-shoes",
    price: 749,
    originalPrice: 1249,
    discountPercentage: 40,
    image: "/amazon/img-1.avif",
    category: "Sustainable Footwear",
    rating: 4.8,
    reviews: 234,
    isNew: true,
  },
  {
    id: "2",
    name: "ECO BOMBASTIC SHOES",
    slug: "eco-bombastic-shoes",
    price: 899,
    originalPrice: 1199,
    discountPercentage: 25,
    image: "/amazon/img-2.avif",
    category: "Athletic Wear",
    rating: 4.9,
    reviews: 456,
    isBestseller: true,
  },
  {
    id: "3",
    name: "ECO CASUAL SHOES",
    slug: "eco-casual-shoes",
    price: 999,
    originalPrice: 1249,
    discountPercentage: 20,
    image: "/amazon/img-3.avif",
    category: "Casual Wear",
    rating: 4.7,
    reviews: 189,
  },
  {
    id: "4",
    name: "ECO PERFORMANCE RUNNERS",
    slug: "eco-performance-runners",
    price: 649,
    originalPrice: 849,
    discountPercentage: 24,
    image: "/amazon/img-4.avif",
    category: "Running Shoes",
    rating: 4.6,
    reviews: 312,
  },
  {
    id: "5",
    name: "ECO URBAN SNEAKERS",
    slug: "eco-urban-sneakers",
    price: 799,
    originalPrice: 999,
    discountPercentage: 20,
    image: "/amazon/img-5.avif",
    category: "Urban Style",
    rating: 4.8,
    reviews: 278,
    isNew: true,
  },
  {
    id: "6",
    name: "ECO TRAIL MASTERS",
    slug: "eco-trail-masters",
    price: 1099,
    originalPrice: 1399,
    discountPercentage: 21,
    image: "/amazon/img-6.avif",
    category: "Outdoor Gear",
    rating: 4.9,
    reviews: 167,
    isBestseller: true,
  },
];

function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <Card
      className="group relative overflow-hidden bg-white/70 backdrop-blur-sm border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-700 transform hover:-translate-y-3 flex-shrink-0 w-80 rounded-3xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Premium Glass Morphism Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-transparent rounded-3xl" />

      {/* Animated Gradient Border */}
      <div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 transition-opacity duration-700 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Premium Badges */}
      <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
        {/* {product.isNew && (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full blur opacity-75" />
            <span className="relative bg-gradient-to-r from-emerald-500 to-cyan-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg border border-white/20 backdrop-blur-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              NEW
            </span>
          </div>
        )} */}
        {/* {product.isBestseller && (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur opacity-75" />
            <span className="relative bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg border border-white/20 backdrop-blur-sm">
              BESTSELLER
            </span>
          </div>
        )} */}
        {product.discountPercentage && (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full blur opacity-75" />
            <span className="relative bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg border border-white/20 backdrop-blur-sm">
              -{product.discountPercentage}%
            </span>
          </div>
        )}
      </div>

      {/* Floating Action Buttons */}
      <div
        className={`absolute top-6 right-6 z-20 flex flex-col gap-3 transition-all duration-500 ${
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
        }`}
      >
        <Button
          size="icon"
          variant="secondary"
          className="h-12 w-12 rounded-2xl bg-white/80 hover:bg-white shadow-lg backdrop-blur-md border border-white/30 transition-all duration-300 hover:scale-110"
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isWishlisted ? "fill-rose-500 text-rose-500" : "text-slate-600"
            }`}
          />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="h-12 w-12 rounded-2xl bg-white/80 hover:bg-white shadow-lg backdrop-blur-md border border-white/30 transition-all duration-300 hover:scale-110"
        >
          <Eye className="h-5 w-5 text-slate-600" />
        </Button>
      </div>

      {/* Product Image with Enhanced Effects */}
      <div className="relative h-56 overflow-hidden rounded-t-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200" />
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-1000 ${
            isHovered ? "scale-110 rotate-1" : "scale-100"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        {/* Category Badge Overlay */}
        <div className="absolute bottom-4 left-4 z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 rounded-xl blur" />
            <span className="relative bg-white/80 backdrop-blur-md text-slate-800 text-xs font-semibold px-4 py-2 rounded-xl border border-white/30 shadow-lg">
              {product.category}
            </span>
          </div>
        </div>

        {/* Floating Glow Effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 transition-opacity duration-700 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Product Info with Enhanced Typography */}
      <div className="relative px-8 py-4 space-y-5 bg-white/50 backdrop-blur-sm rounded-b-3xl">
        {/* Product Name */}
        <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
          {product.name}
        </h3>

        {/* Rating with Premium Styling */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-amber-50 px-3 py-1 rounded-full">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? "text-amber-400 fill-current"
                      : "text-slate-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-slate-600">
              ({product.reviews})
            </span>
          </div>
        </div>

        {/* Premium Add to Cart Button with Price */}
        <div className="pt-2">
          <Button
            className="w-full bg-gradient-to-r from-slate-800 via-slate-900 to-black hover:from-black hover:via-slate-900 hover:to-slate-800 text-white font-semibold py-4 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.4)] transition-all duration-500 transform hover:scale-[1.02] border border-white/10"
            size="lg"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5" />
                <span>Add </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-white/60 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>
          </Button>
        </div>
      </div>

      {/* Premium Hover Glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl transition-opacity duration-700 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />
    </Card>
  );
}

export default function ProductNine() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -340,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 340,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Premium Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-2 rounded-full mb-6 border border-blue-200/50">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700 uppercase tracking-wider">
              Premium Collection
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent mb-6 leading-tight">
            Trending Products
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
            Our sustainable approach recycles plastic into stylish, eco-friendly
            shoes. Join us in walking towards a
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-semibold">
              {" "}
              greener future
            </span>
            , one step at a time.
          </p>
        </div>

        {/* Enhanced Product Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white/90 hover:bg-white text-slate-600 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.15)] rounded-2xl p-4 z-10 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <div
            ref={carouselRef}
            className="flex gap-8 overflow-x-auto scroll-smooth py-8 px-8 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {premiumProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <Button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white/90 hover:bg-white text-slate-600 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.15)] rounded-2xl p-4 z-10 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
