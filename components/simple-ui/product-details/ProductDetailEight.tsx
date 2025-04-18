"use client";
// ProductDetail.tsx
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  StarIcon,
  MinusIcon,
  PlusIcon,
  XMarkIcon,
  MapPinIcon,
  ShieldCheckIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";

interface ProductImage {
  id: number;
  url: string;
  alt: string;
}

interface ProductColor {
  name: string;
  value: string;
}

interface ProductSize {
  name: string;
  available: boolean;
}

interface ProductReview {
  rating: number;
  count: number;
  totalReviews: number;
}

interface ProductDetails {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  discountAmount: number;
  images: ProductImage[];
  colors: ProductColor[];
  sizes: ProductSize[];
  brand: string;
  category: string;
  stock: number;
  reviews: ProductReview;
  soldCount: number;
  shippingFee: number;
  store: {
    name: string;
    location: string;
    rating: number;
    totalReviews: number;
  };
}
const product = {
  id: "sweatshirt-vol-iii",
  name: "New Relaxed Fit Sweatshirt Vol. III",
  description:
    "Top in sweatshirt fabric made from a cotton blend with a soft brushed inside. Relaxed fit with dropped shoulders, long sleeves and ribbing around the neckline, cuffs and hem. Small metal text appliqué on one sleeve. The cotton in this product has been grown in a way that reduces the environmental impact of cotton production.",
  price: 899.0,
  originalPrice: 999.0,
  discountPercentage: 10,
  discountAmount: 100.0,
  images: [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "Red sweatshirt back view",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "Red sweatshirt front view",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "Red sweatshirt close-up",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1552902875-9ac1f9fe0c07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "Red sweatshirt tag detail",
    },
  ],
  colors: [
    { name: "Black", value: "#000000" },
    { name: "Cream", value: "#F5F5DC" },
    { name: "Green", value: "#0F5132" },
    { name: "Blue", value: "#0066CC" },
    { name: "Red", value: "#B91C1C" },
  ],
  sizes: [
    { name: "XS", available: true },
    { name: "S", available: true },
    { name: "M", available: true },
    { name: "L", available: true },
    { name: "XL", available: true },
    { name: "XXL", available: true },
    { name: "XXXL", available: true },
  ],
  brand: "BORONG",
  category: "Casual Shirt",
  stock: 5,
  reviews: {
    rating: 4.5,
    count: 623,
    totalReviews: 623,
  },
  soldCount: 1919,
  shippingFee: 3.99,
  store: {
    name: "Stylish",
    location: "New York, USA",
    rating: 4.8,
    totalReviews: 17500,
  },
};
const ProductDetailEight = () => {
  const [mainImage, setMainImage] = useState<string>(product.images[0].url);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0].name
  );
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [couponCode, setCouponCode] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const calculateSubTotal = () => {
    return (product.price * quantity).toFixed(2);
  };

  const renderRatingStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => {
      const starValue = index + 1;
      const isHalfStar = starValue - 0.5 === rating;
      const isFilled = starValue <= rating;

      return (
        <span key={index}>
          {isFilled ? (
            <StarSolidIcon className="h-4 w-4 text-yellow-400" />
          ) : (
            <StarIcon className="h-4 w-4 text-gray-300" />
          )}
        </span>
      );
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white">
      {/* Notification Banner */}
      <div className="relative mb-4 bg-blue-600 text-white py-3 px-4 text-center">
        <p className="text-sm">
          We always send discount coupons to your email everyday. Please always
          check your email.
          <Link href="#" className="font-medium ml-1 underline">
            Check now!
          </Link>
        </p>
        <button className="absolute right-2 top-3">
          <XMarkIcon className="h-5 w-5 text-white" />
        </button>
      </div>

      {/* Breadcrumb */}
      <nav className="flex items-center text-sm mb-6">
        <Link href="/new-arrival" className="text-gray-500 hover:text-blue-600">
          New Arrival
        </Link>
        <span className="mx-2 text-gray-400">&gt;</span>
        <Link href="/man" className="text-gray-500 hover:text-blue-600">
          Man
        </Link>
        <span className="mx-2 text-gray-400">&gt;</span>
        <span className="text-blue-600">
          New Relaxed Fit Sweatshirt Vol. III
        </span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Images */}
        <div className="lg:w-3/5">
          <div className="relative">
            <div className="mb-4 rounded-md overflow-hidden relative aspect-square">
              <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md z-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <Image
                src={mainImage}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md z-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image) => (
              <div
                key={image.id}
                className={`aspect-square relative rounded-md overflow-hidden cursor-pointer border-2 ${
                  mainImage === image.url
                    ? "border-blue-500"
                    : "border-gray-200"
                }`}
                onClick={() => setMainImage(image.url)}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
          </div>

          <div className="mt-6 border border-gray-200 rounded-md p-4">
            <div className="flex items-center mb-2">
              <div className="bg-blue-100 p-1 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="ml-2 font-medium text-sm">Stylish</span>
              <span className="ml-1 bg-blue-100 text-blue-600 p-0.5 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <div className="ml-auto flex items-center">
                <div className="flex">{renderRatingStars(4.8)}</div>
                <span className="ml-1 text-sm text-gray-600">(4.8)</span>
                <span className="ml-1 text-sm text-gray-600">
                  17.5k reviews
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <MapPinIcon className="h-5 w-5 text-red-500" />
              <span className="ml-2 text-sm text-gray-700">New york, USA</span>
              <button className="ml-auto px-4 py-1.5 border border-blue-600 text-blue-600 rounded-md text-sm hover:bg-blue-50">
                VISIT STORE
              </button>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-2/5">
          <div className="bg-green-100 text-green-800 text-xs font-medium py-1 px-2 rounded inline-block mb-2">
            NEW ARRIVAL
          </div>
          <h1 className="text-3xl font-medium text-gray-900 mb-2">
            {product.name}
          </h1>

          {/* Ratings */}
          <div className="flex items-center mb-4">
            <div className="flex">{renderRatingStars(4.5)}</div>
            <span className="ml-1 text-gray-700">(4.5)</span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-sm text-blue-600 hover:underline cursor-pointer">
              623 reviews
            </span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-sm text-gray-700">1,919 Sold</span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <span className="text-2xl font-semibold">S$ 899.00</span>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-700 uppercase text-sm mb-2">
              SELECT COLOR
            </h3>
            <div className="flex gap-2">
              <button
                className={`px-4 py-2 rounded-md border ${
                  selectedColor === "Black"
                    ? "border-gray-900"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedColor("Black")}
              >
                Black
              </button>
              <button
                className={`px-4 py-2 rounded-md border ${
                  selectedColor === "Cream"
                    ? "border-gray-900"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedColor("Cream")}
              >
                Cream
              </button>
              <button
                className={`px-4 py-2 rounded-md border ${
                  selectedColor === "Green"
                    ? "border-gray-900"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedColor("Green")}
              >
                Green
              </button>
              <button
                className={`px-4 py-2 rounded-md border ${
                  selectedColor === "Blue"
                    ? "border-gray-900"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedColor("Blue")}
              >
                Blue
              </button>
              <button
                className={`px-4 py-2 rounded-md border ${
                  selectedColor === "Red"
                    ? "bg-white border-blue-500 text-gray-900"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedColor("Red")}
              >
                Red
              </button>
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-700 uppercase text-sm">
                SELECT SIZE
              </h3>
              <span className="text-red-500 text-xs font-medium">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500 mr-1"></span>
                Only 5 Stocks Left!
              </span>
            </div>
            <div className="flex gap-2">
              <button
                className={`w-10 h-10 flex items-center justify-center rounded-md border ${
                  selectedSize === "XS"
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-900 border-gray-300"
                }`}
                onClick={() => setSelectedSize("XS")}
              >
                XS
              </button>
              <button
                className={`w-10 h-10 flex items-center justify-center rounded-md border border-blue-500 bg-white text-gray-900`}
                onClick={() => setSelectedSize("S")}
              >
                S
              </button>
              <button
                className={`w-10 h-10 flex items-center justify-center rounded-md border ${
                  selectedSize === "M"
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-900 border-gray-300"
                }`}
                onClick={() => setSelectedSize("M")}
              >
                M
              </button>
              <button
                className={`w-10 h-10 flex items-center justify-center rounded-md border ${
                  selectedSize === "L"
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-900 border-gray-300"
                }`}
                onClick={() => setSelectedSize("L")}
              >
                L
              </button>
              <button
                className={`w-10 h-10 flex items-center justify-center rounded-md border ${
                  selectedSize === "XL"
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-900 border-gray-300"
                }`}
                onClick={() => setSelectedSize("XL")}
              >
                XL
              </button>
              <button
                className={`w-10 h-10 flex items-center justify-center rounded-md border ${
                  selectedSize === "XXL"
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-900 border-gray-300"
                }`}
                onClick={() => setSelectedSize("XXL")}
              >
                XXL
              </button>
              <button
                className={`w-10 h-10 flex items-center justify-center rounded-md border ${
                  selectedSize === "XXXL"
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-900 border-gray-300"
                }`}
                onClick={() => setSelectedSize("XXXL")}
              >
                XXXL
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-700 uppercase text-sm mb-2">
              DESCRIPTION
            </h3>
            <p className="text-sm text-gray-600">
              Top in sweatshirt fabric made from a cotton blend with a soft
              brushed inside. Relaxed fit with dropped shoulders, long sleeves
              and ribbing around the neckline, cuffs and hem. Small metal text
              appliqué...
              <button className="text-blue-600 ml-1">Read more</button>
            </p>
          </div>

          {/* Details */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-700 uppercase text-sm mb-2">
              DETAILS
            </h3>
            <div className="flex items-start mb-2">
              <MapPinIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
              <span className="text-sm">
                Sent from <span className="font-medium">New York, USA</span>
              </span>
            </div>
            <div className="flex items-start mb-2">
              <TruckIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
              <span className="text-sm">
                Estimated Shipping $3.99
                <button className="text-blue-600 ml-1 font-medium">
                  Shipping details
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 inline-block ml-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </span>
            </div>
            <div className="flex items-start">
              <ShieldCheckIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
              <span className="text-sm">
                <span className="font-medium">100%</span> Original Product
              </span>
            </div>
          </div>
        </div>

        {/* Order Details Sidebar */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 lg:w-1/4">
          <h2 className="text-xl font-semibold mb-6">Order Details</h2>

          {/* Quantity */}
          <div className="mb-4">
            <h3 className="text-gray-700 mb-2">Quantity</h3>
            <div className="flex items-center">
              <button
                onClick={decreaseQuantity}
                className="w-8 h-8 border border-gray-300 flex items-center justify-center rounded-l"
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-12 h-8 border-t border-b border-gray-300 text-center outline-none"
              />
              <button
                onClick={increaseQuantity}
                className="w-8 h-8 border border-gray-300 flex items-center justify-center rounded-r"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Color */}
          <div className="mb-4">
            <h3 className="text-gray-700 mb-2">Color</h3>
            <div className="flex justify-between">
              <span>Red</span>
            </div>
          </div>

          {/* Size */}
          <div className="mb-4">
            <h3 className="text-gray-700 mb-2">Size</h3>
            <div className="flex justify-between">
              <span>S</span>
            </div>
          </div>

          {/* Price */}
          <div className="mb-4">
            <h3 className="text-gray-700 mb-2">Price</h3>
            <div className="flex justify-between">
              <span>$1,798.00</span>
            </div>
          </div>

          {/* Discount */}
          <div className="mb-4">
            <h3 className="text-gray-700 mb-2">Discount size</h3>
            <div className="flex justify-between">
              <span>10% ($179.8)</span>
            </div>
          </div>

          {/* Delivery */}
          <div className="mb-4">
            <h3 className="text-gray-700 mb-2">Delivery</h3>
            <div className="flex justify-between items-center">
              <span className="bg-gray-500 text-white text-xs px-2 py-0.5 rounded">
                REGULAR
              </span>
              <span>$3.99</span>
            </div>
          </div>

          {/* Notes */}
          <div className="mb-6">
            <h3 className="text-gray-700 mb-2">Notes</h3>
            <textarea
              className="w-full border border-gray-300 rounded p-2 text-sm"
              placeholder="Write a notes..."
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>

          {/* Coupon */}
          <div className="flex mb-6">
            <input
              type="text"
              placeholder="APPLY COUPON"
              className="flex-grow border border-r-0 border-gray-300 rounded-l p-2 text-sm"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button className="bg-white border border-l-0 border-gray-300 rounded-r p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>

          {/* Subtotal */}
          <div className="flex justify-between items-center mb-6">
            <span className="font-semibold">Sub Total</span>
            <span className="font-semibold text-xl">$1,622.19</span>
          </div>

          {/* Buttons */}
          <button className="w-full bg-blue-600 text-white py-3 rounded mb-3 font-medium hover:bg-blue-700 transition duration-200">
            Buy Now
          </button>
          <button className="w-full border border-blue-600 text-blue-600 py-3 rounded font-medium flex items-center justify-center hover:bg-blue-50 transition duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailEight;
