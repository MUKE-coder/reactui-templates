"use client";

import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  Heart,
  Eye,
  ChevronLeft,
  ChevronRight,
  Clock,
  Zap,
  Flame,
} from "lucide-react";

interface Deal {
  id: string;
  name: string;
  image: string;
  currentPrice: number;
  originalPrice: number;
  discountPercentage: number;
  savings: number;
  category: string;
  isNewArrival?: boolean;
  timeLeft?: string;
  soldCount?: number;
  stockLeft?: number;
}

const todaysDeals: Deal[] = [
  {
    id: "1",
    name: "Starlink Standard Kit (Gen 3)",
    image: "/amazon/img-1.avif",
    currentPrice: 590000,
    originalPrice: 700000,
    discountPercentage: 16,
    savings: 110000,
    category: "Internet & Networking",
    timeLeft: "6h 24m",
    soldCount: 45,
  },
  {
    id: "2",
    name: "Starlink Standard Actuated Kit",
    image: "/amazon/img-2.avif",
    currentPrice: 590000,
    originalPrice: 990000,
    discountPercentage: 40,
    savings: 400000,
    category: "Satellite Equipment",
    timeLeft: "4h 12m",
    soldCount: 23,
    stockLeft: 7,
  },
  {
    id: "3",
    name: "Starlink Mini Portable Kit",
    image: "/amazon/img-3.avif",
    currentPrice: 318000,
    originalPrice: 330000,
    discountPercentage: 4,
    savings: 12000,
    category: "Portable Tech",
    timeLeft: "8h 45m",
    soldCount: 67,
  },
  {
    id: "4",
    name: 'Xiaomi Redmi 14c - 6.88" - 4gb RAM',
    image: "/amazon/img-4.avif",
    currentPrice: 125400,
    originalPrice: 129600,
    discountPercentage: 3,
    savings: 4200,
    category: "Smartphones",
    isNewArrival: true,
    timeLeft: "12h 30m",
    soldCount: 134,
  },
  {
    id: "5",
    name: 'Xiaomi Redmi A5 - 6.88" - 64gb ROM',
    image: "/amazon/img-5.avif",
    currentPrice: 96700,
    originalPrice: 107500,
    discountPercentage: 10,
    savings: 10800,
    category: "Mobile Phones",
    timeLeft: "2h 15m",
    soldCount: 89,
    stockLeft: 12,
  },
  {
    id: "6",
    name: 'Xiaomi Redmi 14c - 6.88" - 6gb RAM',
    image: "/amazon/img-6.avif",
    currentPrice: 141600,
    originalPrice: 146600,
    discountPercentage: 3,
    savings: 5000,
    category: "Android Phones",
    timeLeft: "5h 45m",
    soldCount: 76,
  },
];

function formatPrice(price: number): string {
  return `₦${price.toLocaleString()}`;
}

function DealCard({ deal }: { deal: Deal }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <Card
      className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all duration-700 transform hover:-translate-y-2 flex-shrink-0 w-80 rounded-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Deal Badges */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        {deal.isNewArrival && (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full blur opacity-75" />
            <span className="relative bg-gradient-to-r from-emerald-500 to-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-white/20 backdrop-blur-sm flex items-center gap-1">
              <Zap className="w-3 h-3" />
              NEW
            </span>
          </div>
        )}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-500 rounded-full blur opacity-75" />
          <span className="relative bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-white/20 backdrop-blur-sm flex items-center gap-1">
            <Flame className="w-3 h-3" />-{deal.discountPercentage}%
          </span>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div
        className={`absolute top-4 right-4 z-20 flex flex-col gap-2 transition-all duration-500 ${
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
        }`}
      >
        <Button
          size="icon"
          variant="secondary"
          className="h-10 w-10 rounded-xl bg-white/90 hover:bg-white shadow-lg backdrop-blur-md border border-white/30 transition-all duration-300 hover:scale-110"
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isWishlisted ? "fill-rose-500 text-rose-500" : "text-slate-600"
            }`}
          />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="h-10 w-10 rounded-xl bg-white/90 hover:bg-white shadow-lg backdrop-blur-md border border-white/30 transition-all duration-300 hover:scale-110"
        >
          <Eye className="h-4 w-4 text-slate-600" />
        </Button>
      </div>

      {/* Product Image */}
      <div className="relative h-64 overflow-hidden rounded-t-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200" />
        <img
          src={deal.image}
          alt={deal.name}
          className={`w-full h-full object-cover transition-all duration-1000 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        {/* Category Badge */}
        <div className="absolute bottom-4 left-4 z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 rounded-lg blur" />
            <span className="relative bg-white/90 backdrop-blur-md text-slate-800 text-xs font-semibold px-3 py-1 rounded-lg border border-white/30 shadow-lg">
              {deal.category}
            </span>
          </div>
        </div>

        {/* Time Left Badge */}
        {deal.timeLeft && (
          <div className="absolute bottom-4 right-4 z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-400/20 rounded-lg blur" />
              <span className="relative bg-orange-500/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-lg border border-orange-300/30 shadow-lg flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {deal.timeLeft}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="relative p-6 space-y-4 bg-white/70 backdrop-blur-sm rounded-b-2xl">
        {/* Product Name */}
        <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500 line-clamp-2">
          {deal.name}
        </h3>

        {/* Price Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-slate-900">
              {formatPrice(deal.currentPrice)}
            </span>
            <span className="text-lg text-slate-400 line-through">
              {formatPrice(deal.originalPrice)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-green-600 font-semibold">
              You save {formatPrice(deal.savings)}
            </span>
            {deal.stockLeft && (
              <span className="text-orange-600 font-medium">
                Only {deal.stockLeft} left!
              </span>
            )}
          </div>
        </div>

        {/* Progress Indicator */}
        {deal.soldCount && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-600">
              <span>{deal.soldCount} sold</span>
              <span>🔥 Hot Deal</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min((deal.soldCount / 150) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <Button
          className="w-full bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white font-semibold py-3 rounded-xl shadow-[0_8px_32px_rgba(220,38,38,0.3)] hover:shadow-[0_12px_48px_rgba(220,38,38,0.4)] transition-all duration-500 transform hover:scale-[1.02] border border-red-500/20"
          size="lg"
        >
          <ShoppingBag className="h-4 w-4 mr-2" />
          Grab Deal Now
        </Button>
      </div>

      {/* Hover Glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-red-500/5 via-orange-500/5 to-pink-500/5 rounded-2xl transition-opacity duration-700 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />
    </Card>
  );
}

export default function ProductTen() {
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
    <section className="py-16 bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl blur opacity-20" />
              <div className="relative bg-gradient-to-r from-red-500 to-orange-500 p-3 rounded-2xl">
                <Flame className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Today's Deals
              </h2>
              <p className="text-lg text-slate-600 font-medium">
                Limited time offers • Grab them before they're gone!
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            className="bg-white/80 backdrop-blur-sm border-red-200 text-red-600 hover:bg-red-50 font-semibold px-6 py-2 rounded-xl shadow-lg"
          >
            See All Deals
          </Button>
        </div>

        {/* Deals Carousel */}
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
            className="flex gap-6 overflow-x-auto scroll-smooth py-4 px-4 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {todaysDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
