"use client";
// ProductDetail.tsx
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle,
  MinusIcon,
  PlusIcon,
  ShareIcon,
  ShoppingBagIcon,
  StarIcon,
} from "lucide-react";

interface ProductImage {
  id: number;
  url: string;
  alt: string;
}

interface ProductReview {
  rating: number;
  count: number;
}

interface ProductDetails {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPercentage: number;
  originalPrice: number;
  expiryDate: string;
  images: ProductImage[];
  mainImage: string;
  sizes: string[];
  colors: string[];
  brand: string;
  category: string;
  condition: string;
  material: string;
  weight: string;
  reviews: ProductReview;
  inStock: number;
}
const product = {
  id: "shirt-123",
  name: "Essentials Men's Regular-Fit Long-Sleeve Oxford Shirt",
  description:
    "Premium quality long sleeve shirt perfect for casual or semi-formal occasions. Made with high-quality polyester material that's comfortable to wear all day. Features a modern color-block design with contrasting pocket. Regular fit with button closure and standard collar.",
  price: 45.0,
  discountPercentage: 25,
  originalPrice: 60.0,
  expiryDate: "Oct 30, 2025",
  mainImage:
    "https://images.unsplash.com/photo-1603252109360-909baaf261c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80",
  images: [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1603252109360-909baaf261c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80",
      alt: "Front view of oxford shirt",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1603252109303-2751441dd157?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80",
      alt: "Side view of oxford shirt",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=825&q=80",
      alt: "Back view of oxford shirt",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1603252109612-24fa03d145c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80",
      alt: "Detail view of oxford shirt pocket",
    },
  ],
  sizes: ["S", "M", "L", "XL"],
  colors: ["Apricot", "Black"],
  brand: "ChicApparel",
  category: "Casual Shirt",
  condition: "New",
  material: "Polyester",
  weight: "200 g",
  reviews: {
    rating: 4.5,
    count: 256,
  },
  inStock: 856,
};

const ProductDetailSeven = () => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("about");
  const [mainImage, setMainImage] = useState<string>(product.mainImage);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < product.inStock) {
      setQuantity(quantity + 1);
    }
  };

  const calculateDiscountedPrice = () => {
    return (product.price * quantity).toFixed(2);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-emerald-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <a href="/mens-fashion" className="hover:text-emerald-600">
          Men's Fashion
        </a>
        <span className="mx-2">/</span>
        <a href="/casual-shirt" className="hover:text-emerald-600">
          Casual Shirt
        </a>
        <span className="mx-2">/</span>
        <span className="text-gray-700">Product Detail</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Images */}
        <div className="lg:w-3/5">
          <div className="mb-4 rounded-lg overflow-hidden relative aspect-[4/3]">
            <Image
              src={mainImage}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image) => (
              <div
                key={image.id}
                className={`aspect-square relative rounded-md overflow-hidden cursor-pointer border-2 ${
                  mainImage === image.url
                    ? "border-emerald-500"
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
        </div>

        {/* Product Info */}
        <div className="lg:w-2/5">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              {product.name}
            </h1>

            {/* Ratings */}
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.reviews.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-2">
                {product.reviews.rating} ({product.reviews.count} reviews)
              </span>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-sm text-gray-500">
                {product.inStock} Sold
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="bg-emerald-50 text-emerald-700 inline-block px-3 py-1 rounded-lg text-sm font-medium mb-2">
                {product.discountPercentage}% OFF
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-gray-900">
                  ${calculateDiscountedPrice()}
                </span>
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ${(product.originalPrice * quantity).toFixed(2)}
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Until {product.expiryDate}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Choose Size:
              </h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 flex items-center justify-center rounded-md border ${
                      selectedSize === size
                        ? "bg-emerald-500 text-white border-emerald-500"
                        : "bg-white text-gray-900 border-gray-300 hover:border-emerald-500"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Size Display */}
            {selectedSize && (
              <div className="flex items-center mb-6 bg-gray-50 p-3 rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1491553895911-0055eca6402d"
                  alt="Product thumbnail"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div className="ml-3">
                  <div className="text-sm font-medium">Selected Size</div>
                  <div className="text-sm text-gray-500">{selectedSize}</div>
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Quantity:
              </h3>
              <div className="flex items-center">
                <button
                  onClick={decreaseQuantity}
                  className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center"
                >
                  <MinusIcon className="h-4 w-4 text-gray-600" />
                </button>
                <input
                  type="number"
                  min="1"
                  max={product.inStock}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-16 h-10 border border-gray-300 mx-1 text-center outline-none focus:border-emerald-500 rounded-md"
                />
                <button
                  onClick={increaseQuantity}
                  className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center"
                >
                  <PlusIcon className="h-4 w-4 text-gray-600" />
                </button>
                <span className="ml-4 text-sm text-gray-500">
                  Stock: {product.inStock}
                </span>
              </div>
            </div>

            {/* Total Price */}
            <div className="mb-6">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Total Price:</span>
                <span className="text-lg font-bold text-gray-900">
                  ${calculateDiscountedPrice()}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 gap-3">
              <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-4 rounded-lg font-medium transition duration-200">
                Buy Now
              </button>
              <button className="w-full bg-white border border-emerald-500 text-emerald-500 py-3 px-4 rounded-lg font-medium hover:bg-emerald-50 transition duration-200 flex items-center justify-center">
                <ShoppingBagIcon className="h-5 w-5 mr-2" />
                Add to Bag
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  <MessageCircle className="h-5 w-5 mr-2 text-gray-500" />
                  Chat Seller
                </button>
                <button className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  <ShareIcon className="h-5 w-5 mr-2 text-gray-500" />
                  Share Product
                </button>
              </div>
            </div>
          </div>

          {/* Product details tabs */}
          <div className="mt-8">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab("about")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "about"
                      ? "border-emerald-500 text-emerald-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } mr-8`}
                >
                  About Item
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "reviews"
                      ? "border-emerald-500 text-emerald-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Reviews
                </button>
              </nav>
            </div>

            <div className="py-4">
              {activeTab === "about" && (
                <div>
                  <div className="grid grid-cols-2 gap-y-4 text-sm">
                    <div className="text-gray-500">Brand:</div>
                    <div className="font-medium">{product.brand}</div>

                    <div className="text-gray-500">Category:</div>
                    <div className="font-medium">{product.category}</div>

                    <div className="text-gray-500">Condition:</div>
                    <div className="font-medium">{product.condition}</div>

                    <div className="text-gray-500">Material:</div>
                    <div className="font-medium">{product.material}</div>

                    <div className="text-gray-500">Weight:</div>
                    <div className="font-medium">{product.weight}</div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-gray-900 font-medium mb-2">
                      Description:
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {product.description}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.reviews.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-900 ml-2">
                      {product.reviews.rating} out of 5
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Based on {product.reviews.count} reviews
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSeven;
