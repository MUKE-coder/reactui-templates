"use client";
// BeautyProductListing.tsx
import React from "react";
import Image from "next/image";
import { Star, Heart } from "lucide-react";

// Types
export interface BeautyProduct {
  id: string;
  name: string;
  price: number;
  currency?: string;
  image: string;
  brand: string;
  rating?: number;
  reviews?: number;
  description?: string;
  isFavorite?: boolean;
}

// Helper function for formatting prices
const formatPrice = (price: number, currency: string = "$") => {
  return `${currency}${price.toFixed(2)}`;
};

// Star Rating Component
const StarRating: React.FC<{ rating: number; reviews?: number }> = ({
  rating,
  reviews,
}) => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={16}
            className={`${
              index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
            } fill-current`}
          />
        ))}
      </div>
      {reviews !== undefined && (
        <span className="text-gray-500 text-sm">({reviews})</span>
      )}
    </div>
  );
};

// Product Card Component
const BeautyProductCard: React.FC<{ product: BeautyProduct }> = ({
  product,
}) => {
  return (
    <div className="rounded-lg bg-white border border-gray-100 p-4 relative transition-all hover:shadow-md">
      <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500 z-10 transition-colors">
        <Heart
          size={20}
          className={product.isFavorite ? "fill-red-500 text-red-500" : ""}
        />
      </button>

      <a
        href="#"
        className="relative h-48 mb-4 bg-gray-50 rounded flex items-center justify-center"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4"
        />
      </a>

      <a href="#" className="block">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
          {product.brand}
        </p>
        <h3 className="font-medium text-sm text-gray-900 mb-1 line-clamp-2">
          {product.name || product.description}
        </h3>

        <StarRating rating={product.rating || 0} reviews={product.reviews} />

        <div className="mt-2">
          <p className="font-semibold text-base">
            {formatPrice(product.price)}
          </p>
        </div>
      </a>
    </div>
  );
};
const beautyProducts = [
  {
    id: "1",
    name: "Hydrating Serum",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b",
    brand: "PureGlow",
    rating: 4.8,
    reviews: 312,
    description: "Advanced Hydrating Serum with Hyaluronic Acid",
    isFavorite: true,
  },
  {
    id: "2",
    name: "Clay Face Mask",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4a8ee43",
    brand: "EarthTone",
    rating: 4.6,
    reviews: 189,
    description: "Purifying Clay Mask for All Skin Types",
  },
  {
    id: "3",
    name: "Moisturizing Cream",
    price: 49.95,
    image: "https://images.unsplash.com/photo-1612532275214-e4ca76d0e4d1",
    brand: "Harmony",
    rating: 4.7,
    reviews: 247,
    description: "Ultra-Rich Moisturizing Cream with Natural Oils",
  },
  {
    id: "4",
    name: "Exfoliating Scrub",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1608248597279-f99d160beba3",
    brand: "Revive",
    rating: 4.5,
    reviews: 178,
    description: "Gentle Exfoliating Facial Scrub with Vitamin E",
  },
  {
    id: "5",
    name: "Facial Cleanser",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03",
    brand: "PureGlow",
    rating: 4.9,
    reviews: 423,
    description: "Gentle Foaming Facial Cleanser for Daily Use",
  },
];
// Main Component
const ProductSix = () => {
  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Beauty & Personal Care
        </h2>
        <a
          href={"#"}
          className="text-gray-600 text-sm flex items-center hover:text-gray-900"
        >
          Check all items <span className="ml-1">→</span>
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {beautyProducts.map((product) => (
          <BeautyProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductSix;
