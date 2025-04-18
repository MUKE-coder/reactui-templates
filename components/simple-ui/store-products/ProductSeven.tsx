"use client";
// DigitalProductListing.tsx
import React from "react";
import Image from "next/image";

// Types
export interface DigitalProduct {
  id: string;
  name: string;
  price: number;
  currency?: string;
  image: string;
  category?: string;
  badges?: string[];
}

// Helper function for formatting prices
const formatPrice = (price: number, currency: string = "$") => {
  return `${currency}${price.toFixed(2)}`;
};

// Product Card Component
const DigitalProductCard: React.FC<{ product: DigitalProduct }> = ({
  product,
}) => {
  return (
    <a href="#" className="group cursor-pointer block">
      <div className="rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 relative aspect-[4/3]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
        {product.badges && product.badges.length > 0 && (
          <div className="absolute bottom-3 left-3 flex gap-1">
            {product.badges.map((badge, index) => (
              <span
                key={index}
                className="bg-white/90 backdrop-blur-sm text-xs px-2 py-1 rounded-full"
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-3">
        <h3 className="font-medium text-base text-gray-900">{product.name}</h3>
        <div className="flex justify-between items-center mt-1">
          <p className="font-semibold">{formatPrice(product.price)}</p>
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            {product.category}
          </p>
        </div>
      </div>
    </a>
  );
};
const digitalProducts = [
  {
    id: "1",
    name: "Premium UI Kit",
    price: 79.0,
    image: "https://images.unsplash.com/photo-1530435460869-d13625c69bbf",
    category: "UI Kit, Figma",
    badges: ["New", "Trending"],
  },
  {
    id: "2",
    name: "Landing Page Templates",
    price: 59.0,
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d",
    category: "Templates, HTML",
  },
  {
    id: "3",
    name: "Illustration Pack",
    price: 39.0,
    image: "https://images.unsplash.com/photo-1545670723-196ed0954986",
    category: "Graphics, SVG",
    badges: ["Featured"],
  },
  {
    id: "4",
    name: "Icon Collection",
    price: 29.0,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
    category: "Icons, SVG",
    badges: ["50% Off"],
  },
];
// Main Component
const ProductSeven = () => {
  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Best Selling Digital Items
        </h2>
        <a
          href={"#"}
          className="text-gray-600 text-sm flex items-center hover:text-gray-900"
        >
          Check all items <span className="ml-1">→</span>
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {digitalProducts.map((product) => (
          <DigitalProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductSeven;
