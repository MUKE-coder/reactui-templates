"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronLeft, Heart } from "lucide-react";
import Link from "next/link";

// Product type definition
type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  favorite?: boolean;
};

// Sample product data with Unsplash images
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Premium Leather Wallet",
    price: 89.99,
    description: "Handcrafted genuine leather wallet with RFID protection",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Accessories",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Minimalist Watch",
    price: 199.99,
    description: "Swiss movement with sapphire crystal glass",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Watches",
    rating: 4.9,
  },
  {
    id: "3",
    name: "Wireless Noise-Cancelling Headphones",
    price: 249.99,
    description: "36-hour battery life with premium sound quality",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Electronics",
    rating: 4.7,
  },
  {
    id: "4",
    name: "Organic Cotton T-Shirt",
    price: 39.99,
    description: "Sustainable, soft, and ethically produced",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Clothing",
    rating: 4.5,
  },
  {
    id: "5",
    name: "Smart Home Hub",
    price: 129.99,
    description: "Control all your smart devices from one interface",
    image:
      "https://images.unsplash.com/photo-1558089687-f282ffcbc126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Electronics",
    rating: 4.6,
  },
  {
    id: "6",
    name: "Artisanal Coffee Beans",
    price: 24.99,
    description: "Single-origin coffee beans, ethically sourced",
    image:
      "https://images.unsplash.com/photo-1497935586047-9397d4dc917c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Food & Beverage",
    rating: 4.8,
  },
];

// Star rating component
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating)
              ? "text-amber-400"
              : i < rating
              ? "text-amber-400"
              : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
};

// Product Card Component
const ProductCard: React.FC<{
  product: Product;
  onFavoriteToggle: (id: string) => void;
}> = ({ product, onFavoriteToggle }) => {
  return (
    <div className="group relative flex flex-col h-full rounded-lg overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300">
      {/* Image container with aspect ratio */}
      <div className="relative w-full pb-[100%] bg-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <button
          onClick={() => onFavoriteToggle(product.id)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 transition-all duration-200"
          aria-label="Add to favorites"
        >
          <Heart
            size={20}
            className={
              product.favorite ? "fill-red-500 text-red-500" : "text-gray-600"
            }
          />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-3 left-3 right-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button className="w-full py-2 px-4 bg-black bg-opacity-80 text-white text-sm font-medium rounded-md hover:bg-opacity-100 transition-all duration-200">
            Quick View
          </button>
        </div>
      </div>

      {/* Product details */}
      <div className="flex flex-col p-4 flex-grow">
        <div className="flex justify-between items-start mb-1">
          <Link
            href="#"
            className="text-sm font-medium text-gray-900 line-clamp-1"
          >
            {product.name}
          </Link>
        </div>
        <p className="text-xs text-gray-500 mb-2 line-clamp-2">
          {product.description}
        </p>
        <StarRating rating={product.rating} />
        <div className="mt-auto pt-3 flex justify-between items-center">
          <span className="font-semibold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
            {product.category}
          </span>
        </div>
      </div>
    </div>
  );
};

// Main Carousel Component
const ProductOne = () => {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState(4);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Handle screen resize to adjust number of visible products
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setVisibleProducts(4);
      } else if (window.innerWidth >= 1024) {
        setVisibleProducts(3);
      } else if (window.innerWidth >= 768) {
        setVisibleProducts(2);
      } else {
        setVisibleProducts(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navigation functions
  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev + visibleProducts >= products.length ? 0 : prev + visibleProducts
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prev) =>
      prev - visibleProducts < 0
        ? Math.max(0, products.length - visibleProducts)
        : prev - visibleProducts
    );
  };

  // Toggle product as favorite
  const toggleFavorite = (id: string) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, favorite: !p.favorite } : p))
    );
  };

  // Calculate displayed products based on current index and visible count
  const displayedProducts = products.slice(
    currentIndex,
    currentIndex + visibleProducts
  );

  // If we don't have enough products to fill the view, add from the beginning
  if (displayedProducts.length < visibleProducts) {
    const remainingCount = visibleProducts - displayedProducts.length;
    const additionalProducts = products.slice(0, remainingCount);
    displayedProducts.push(...additionalProducts);
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="relative text-3xl font-bold text-gray-900 tracking-tight">
          <span className="relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-2/3 after:h-1 after:bg-gradient-to-r after:from-indigo-500 after:to-purple-500">
            Featured Collection
          </span>
          <span className="absolute -top-4 -left-3 text-5xl text-indigo-100 font-extrabold opacity-50 select-none">
            Premium
          </span>
        </h2>
        <div className="flex space-x-3">
          <button
            onClick={goToPrev}
            className="p-2 rounded-full bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm hover:shadow border border-gray-200 hover:border-gray-300 transition-all duration-200"
            aria-label="Previous products"
          >
            <ChevronLeft size={20} className="text-gray-700" />
          </button>
          <button
            onClick={goToNext}
            className="p-2 rounded-full bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm hover:shadow border border-gray-200 hover:border-gray-300 transition-all duration-200"
            aria-label="Next products"
          >
            <ChevronRight size={20} className="text-gray-700" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden" ref={carouselRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <div key={product.id} className="transition-all duration-500">
              <ProductCard
                product={product}
                onFavoriteToggle={toggleFavorite}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({
          length: Math.ceil(products.length / visibleProducts),
        }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i * visibleProducts)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === Math.floor(currentIndex / visibleProducts)
                ? "bg-gray-800 w-4"
                : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductOne;
