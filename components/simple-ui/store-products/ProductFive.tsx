"use client";
// StandardProductListing.tsx
import React from "react";
import Image from "next/image";
import { Star, ShoppingBag } from "lucide-react";

// Types
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  currency?: string;
  image: string;
  brand?: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
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
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="group rounded-lg overflow-hidden border border-gray-100 bg-white transition-shadow hover:shadow-md">
      <a
        href="#"
        className="relative aspect-square overflow-hidden bg-gray-50 block"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </a>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
            <a href="#" className="font-medium text-base text-gray-900 mb-1">
              {product.name}
            </a>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-gray-400 line-through text-sm">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <StarRating
              rating={product.rating || 0}
              reviews={product.reviews}
            />
          </div>
          <button className="bg-gray-900 flex gap-2 items-center text-white py-1 px-3 rounded-full hover:bg-gray-800 transition-colors">
            <ShoppingBag size={16} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

const shoesProducts = [
  {
    id: "1",
    name: "Premium Leather Casual Sneaker",
    price: 129.99,
    originalPrice: 179.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    brand: "Luxe Step",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: "2",
    name: "Urban Hiking Boot",
    price: 149.95,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
    brand: "TrailMaster",
    rating: 4.5,
    reviews: 89,
  },
  {
    id: "3",
    name: "Performance Running Shoe",
    price: 119.99,
    originalPrice: 159.99,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa",
    brand: "SpeedRunner",
    rating: 4.7,
    reviews: 213,
  },
  {
    id: "4",
    name: "Classic Oxford Dress Shoe",
    price: 219.99,
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4",
    brand: "Elegance",
    rating: 4.9,
    reviews: 56,
  },
];

// Main Component
const ProductFive = () => {
  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Featured Products
        </h2>
        <a
          href={"#"}
          className="text-gray-600 text-sm flex items-center hover:text-gray-900"
        >
          Check all items <span className="ml-1">→</span>
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {shoesProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductFive;
