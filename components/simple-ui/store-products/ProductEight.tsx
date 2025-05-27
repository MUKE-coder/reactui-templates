"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart } from "lucide-react";

interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
}

interface Category {
  id: string;
  title: string;
  products: Product[];
  ctaText: string;
  ctaLink: string;
}

const featuredCategories: Category[] = [
  {
    id: "pc-tech",
    title: "Level up your PC here",
    ctaText: "Discover more",
    ctaLink: "/pc-tech",
    products: [
      {
        id: "1",
        title: "Gaming Laptop RTX 4060",
        slug: "gaming-laptop-rtx-4060",
        price: 1299.99,
        originalPrice: 1499.99,
        image: "/amazon/img-1.avif?height=200&width=200",
        rating: 4.5,
        reviews: 1247,
      },
      {
        id: "2",
        title: "RGB Gaming Desktop",
        slug: "rgb-gaming-desktop",
        price: 899.99,
        image: "/amazon/img-2.avif?height=200&width=200",
        rating: 4.7,
        reviews: 892,
      },
      {
        id: "3",
        title: "Portable SSD 1TB",
        slug: "portable-ssd-1tb",
        price: 89.99,
        originalPrice: 119.99,
        image: "/amazon/img-3.avif?height=200&width=200",
        rating: 4.8,
        reviews: 2156,
      },
      {
        id: "4",
        title: '4K Gaming Monitor 27"',
        slug: "4k-gaming-monitor-27",
        price: 349.99,
        image: "/amazon/img-4.avif?height=200&width=200",
        rating: 4.6,
        reviews: 743,
      },
    ],
  },
  {
    id: "home-kitchen",
    title: "Home & Kitchen essentials",
    ctaText: "Shop now",
    ctaLink: "/home-kitchen",
    products: [
      {
        id: "5",
        title: "Smart Coffee Maker",
        slug: "smart-coffee-maker",
        price: 159.99,
        originalPrice: 199.99,
        image: "/amazon/img-5.avif?height=200&width=200",
        rating: 4.4,
        reviews: 1834,
      },
      {
        id: "6",
        title: "Multi-Cooker 6Qt",
        slug: "multi-cooker-6qt",
        price: 79.99,
        image: "/amazon/img-6.avif?height=200&width=200",
        rating: 4.6,
        reviews: 3421,
      },
      {
        id: "7",
        title: "Robot Vacuum Cleaner",
        slug: "robot-vacuum-cleaner",
        price: 249.99,
        originalPrice: 299.99,
        image: "/amazon/img-7.avif?height=200&width=200",
        rating: 4.3,
        reviews: 987,
      },
      {
        id: "8",
        title: "Steam Iron Pro",
        slug: "steam-iron-pro",
        price: 45.99,
        image: "/amazon/img-1.avif?height=200&width=200",
        rating: 4.5,
        reviews: 654,
      },
    ],
  },
  {
    id: "gaming",
    title: "Level up your gaming",
    ctaText: "Shop the latest in gaming",
    ctaLink: "/gaming",
    products: [
      {
        id: "9",
        title: "Gaming Laptop RTX 4070",
        slug: "gaming-laptop-rtx-4070",
        price: 1799.99,
        image: "/amazon/img-2.avif?height=200&width=200",
        rating: 4.8,
        reviews: 567,
      },
      {
        id: "10",
        title: "Xbox Wireless Controller",
        slug: "xbox-wireless-controller",
        price: 59.99,
        originalPrice: 69.99,
        image: "/amazon/img-3.avif?height=200&width=200",
        rating: 4.7,
        reviews: 2341,
      },
      {
        id: "11",
        title: "PlayStation 5 Console",
        slug: "playstation-5-console",
        price: 499.99,
        image: "/amazon/img-4.avif?height=200&width=200",
        rating: 4.9,
        reviews: 4567,
      },
      {
        id: "12",
        title: "Nintendo Switch OLED",
        slug: "nintendo-switch-oled",
        price: 349.99,
        image: "/amazon/img-5.avif?height=200&width=200",
        rating: 4.6,
        reviews: 1876,
      },
    ],
  },
  {
    id: "home-finds",
    title: "Finds for Home",
    ctaText: "See more",
    ctaLink: "/home-finds",
    products: [
      {
        id: "13",
        title: "Smart Kitchen Scale",
        slug: "smart-kitchen-scale",
        price: 29.99,
        originalPrice: 39.99,
        image: "/amazon/img-6.avif?height=200&width=200",
        rating: 4.4,
        reviews: 1234,
      },
      {
        id: "14",
        title: "Wooden Wall Art Set",
        slug: "wooden-wall-art-set",
        price: 89.99,
        image: "/amazon/img-7.avif?height=200&width=200",
        rating: 4.5,
        reviews: 432,
      },
      {
        id: "15",
        title: "Dining Chair Set of 4",
        slug: "dining-chair-set-4",
        price: 199.99,
        originalPrice: 249.99,
        image: "/amazon/img-1.avif?height=200&width=200",
        rating: 4.3,
        reviews: 876,
      },
      {
        id: "16",
        title: "Smart Home Hub",
        slug: "smart-home-hub",
        price: 129.99,
        image: "/amazon/img-2.avif?height=200&width=200",
        rating: 4.6,
        reviews: 1543,
      },
    ],
  },
];

function ProductCard({ product }: { product: Product }) {
  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg overflow-hidden">
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
            -{discountPercentage}%
          </div>
        )}

        {/* Wishlist Button */}
        <button className="absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
        </button>

        {/* Product Image */}
        <div className="relative h-24 bg-gray-50 overflow-hidden">
          <Image
            src={product.image || "/amazon/img-1.avif"}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-lg"
          />
        </div>

        {/* Product Info */}
        <div className="p-3 space-y-2">
          <h4 className="text-xs font-medium text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors ">
            {product.title}
          </h4>

          {/* Rating */}
          {/* <div className="flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div> */}

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ProductEight() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="flex justify-between items-center mb-6 px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          <span className="relative inline-block">
            Featured Categories
            <span className="absolute -bottom-1 left-0 right-0 h-1 bg-blue-500 rounded-full"></span>
          </span>
        </h2>
        <a
          href={"#"}
          className="text-gray-600 text-sm flex items-center hover:text-gray-900"
        >
          Check all items <span className="ml-1">→</span>
        </a>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCategories.map((category) => (
            <Card
              key={category.id}
              className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
                  {category.title}
                </h2>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  {category.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                <Link
                  href={category.ctaLink}
                  className="inline-block text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium"
                >
                  {category.ctaText}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
