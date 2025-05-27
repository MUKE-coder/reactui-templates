"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart, Eye, Clock, Zap, Flame } from "lucide-react";

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
      className="group relative overflow-hidden bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-lg transition-all duration-300 rounded-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Deal Badges */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-1">
        {deal.isNewArrival && (
          <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
            <Zap className="w-3 h-3" />
            New Arrival
          </span>
        )}
        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
          <Flame className="w-3 h-3" />-{deal.discountPercentage}%
        </span>
      </div>

      {/* Floating Action Buttons */}
      <div
        className={`absolute top-3 right-3 z-20 flex flex-col gap-2 transition-all duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <Button
          size="icon"
          variant="secondary"
          className="h-8 w-8 rounded-full bg-white/90 hover:bg-white shadow-md"
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          <Heart
            className={`h-3 w-3 transition-colors ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="h-8 w-8 rounded-full bg-white/90 hover:bg-white shadow-md"
        >
          <Eye className="h-3 w-3 text-gray-600" />
        </Button>
      </div>

      {/* Product Image */}
      <div className="relative h-48 overflow-hidden bg-gray-50">
        <img
          src={deal.image}
          alt={deal.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />

        {/* Time Left Badge */}
        {deal.timeLeft && (
          <div className="absolute bottom-2 right-2">
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {deal.timeLeft}
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Product Name */}
        <h3 className="text-sm font-semibold text-gray-900 leading-tight line-clamp-2 h-10">
          {deal.name}
        </h3>

        {/* Price Section */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">
              {formatPrice(deal.currentPrice)}
            </span>
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(deal.originalPrice)}
            </span>
          </div>
          <div className="text-sm text-green-600 font-medium">
            You save {formatPrice(deal.savings)}
          </div>
        </div>

        {/* Stock/Sold Info */}
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>{deal.soldCount} sold</span>
          {deal.stockLeft && (
            <span className="text-orange-600 font-medium">
              Only {deal.stockLeft} left!
            </span>
          )}
        </div>

        {/* Progress Bar */}
        {deal.soldCount && (
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-gradient-to-r from-orange-500 to-red-500 h-1.5 rounded-full transition-all duration-500"
              style={{
                width: `${Math.min((deal.soldCount / 150) * 100, 100)}%`,
              }}
            />
          </div>
        )}

        {/* Add to Cart Button */}
        <Button
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded text-sm transition-colors duration-200"
          size="sm"
        >
          <ShoppingBag className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
}

export default function ProductEleven() {
  return (
    <section className="py-8 bg-gradient-to-r from-purple-600 to-pink-600">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-t-lg">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <Flame className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Today's Deals</h2>
                <p className="text-purple-100 text-sm">Limited time offers</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 font-medium px-4 py-2 rounded"
            >
              See All Items
            </Button>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="bg-white p-6 rounded-b-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {todaysDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
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
