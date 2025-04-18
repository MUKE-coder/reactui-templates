"use client"
// NikeSneakerDetail.tsx
import { useState } from 'react';
import Image from 'next/image';
import { Heart, ChevronDown, Star, ShoppingBag, TruckIcon, RefreshCw, CheckCircle } from 'lucide-react';

// Types
interface SneakerProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  highlights: string[];
  colors: {
    name: string;
    value: string;
    inStock: boolean;
  }[];
  sizes: {
    value: string;
    inStock: boolean;
  }[];
  images: string[];
  features: string[];
  shipping: {
    free: boolean;
    estimatedDelivery: string;
  };
  returns: string;
}

// Mock data
const sneaker: SneakerProduct = {
  id: "nike-running-01",
  name: "Nike Sneakers Shoes for Running Men",
  category: "Running",
  price: 49.00,
  discountPrice: 59.99,
  rating: 4.8,
  reviewCount: 246,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut amet a a blandit id non viverra massa semper. Varius bibendum suscipit sed mattis turpis enim in ornare. In orci condimentum id in. Sit sodales tempor, sed feugiat sit at fames a tellus.",
  highlights: [
    "Made with full cotton",
    "Slim fit for any body",
    "Quality control by JC",
    "Cushioned insole for all-day comfort",
    "Lightweight design for optimal performance"
  ],
  colors: [
    { name: "White", value: "#FFFFFF", inStock: true },
    { name: "Black", value: "#000000", inStock: true },
    { name: "Orange", value: "#FFA500", inStock: true },
    { name: "Blue", value: "#0000FF", inStock: false }
  ],
  sizes: [
    { value: "38", inStock: true },
    { value: "39", inStock: true },
    { value: "40", inStock: true },
    { value: "41", inStock: true },
    { value: "42", inStock: true },
    { value: "43", inStock: false },
    { value: "44", inStock: false },
    { value: "45", inStock: true }
  ],
  images: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  ],
  features: [
    "Rubber outsole provides excellent traction",
    "Mesh upper for breathability",
    "Foam midsole for responsive cushioning",
    "Reinforced heel for added support"
  ],
  shipping: {
    free: true,
    estimatedDelivery: "2-4 business days"
  },
  returns: "Free returns within 30 days"
};

// Related products would go here in a real application

const ProductDetailThree = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(2); // Default to size 40
  const [showMore, setShowMore] = useState(false);
  
  // Format currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };
  
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-white rounded-lg shadow-md">
      <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left column - Images */}
        <div className="md:w-1/2">
          <div className="relative aspect-square bg-orange-100 rounded-xl overflow-hidden mb-4">
            <Image 
              src={sneaker.images[activeImage]} 
              alt={sneaker.name}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {sneaker.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden ${
                  activeImage === index ? 'ring-2 ring-black' : 'ring-1 ring-gray-200'
                }`}
              >
                <Image 
                  src={image} 
                  alt={`${sneaker.name} view ${index + 1}`}
                  fill
                  className="object-cover" 
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Right column - Product Info */}
        <div className="md:w-1/2">
          {/* Breadcrumbs */}
          <div className="flex text-sm text-gray-500 mb-4">
            <a href="#" className="hover:text-gray-700">Home</a>
            <span className="mx-2">/</span>
            <a href="#" className="hover:text-gray-700">Products</a>
            <span className="mx-2">/</span>
            <a href="#" className="hover:text-gray-700">Nike Sneakers</a>
          </div>
          
          {/* Product title and rating */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{sneaker.name}</h1>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${
                    i < Math.floor(sneaker.rating) 
                      ? 'text-yellow-400 fill-yellow-400' 
                      : i < sneaker.rating 
                        ? 'text-yellow-400 fill-yellow-400 opacity-60' 
                        : 'text-gray-300'
                  }`} 
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">{sneaker.rating}</span>
            </div>
            
            <span className="text-sm text-gray-500">({sneaker.reviewCount} reviews)</span>
          </div>
          
          {/* Description */}
          <p className="text-gray-600 mb-6">{sneaker.description}</p>
          
          {/* Highlights */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-2">Highlights:</h3>
            <ul className="space-y-1">
              {sneaker.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Color Selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900">COLOR</h3>
              <span className="text-sm text-gray-500">{sneaker.colors[selectedColor].name}</span>
            </div>
            <div className="flex gap-2">
              {sneaker.colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => color.inStock && setSelectedColor(index)}
                  disabled={!color.inStock}
                  className={`
                    relative h-10 w-10 rounded-full
                    ${selectedColor === index ? 'ring-2 ring-offset-2 ring-black' : ''}
                    ${!color.inStock ? 'opacity-40 cursor-not-allowed' : ''}
                  `}
                  title={color.name}
                >
                  <span 
                    className="absolute inset-0 rounded-full border border-gray-200"
                    style={{ backgroundColor: color.value }}
                  ></span>
                  {!color.inStock && (
                    <span className="absolute inset-0 flex items-center justify-center text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Size Selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900">SIZE</h3>
              <button className="text-sm text-blue-600 hover:text-blue-800">Size Guide</button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {sneaker.sizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => size.inStock && setSelectedSize(index)}
                  disabled={!size.inStock}
                  className={`
                    py-2 border rounded-md text-center
                    ${selectedSize === index 
                      ? 'border-black bg-black text-white' 
                      : 'border-gray-300 text-gray-900 hover:border-gray-400'
                    }
                    ${!size.inStock ? 'bg-gray-100 text-gray-400 cursor-not-allowed hover:border-gray-300' : ''}
                  `}
                >
                  {size.value}
                </button>
              ))}
            </div>
          </div>
          
          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-3xl font-bold text-gray-900">{formatPrice(sneaker.price)}</span>
              {sneaker.discountPrice && (
                <span className="ml-2 text-sm text-gray-500 line-through">{formatPrice(sneaker.discountPrice)}</span>
              )}
            </div>
            
            {sneaker.discountPrice && (
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                SAVE {Math.round(((sneaker.discountPrice - sneaker.price) / sneaker.discountPrice) * 100)}%
              </span>
            )}
          </div>
          
          <div className="flex gap-3 mb-6">
            <button className="flex-1 bg-gray-900 hover:bg-black text-white py-3 px-6 rounded-md font-medium flex items-center justify-center transition duration-150">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Add to cart
            </button>
            <button className="border border-gray-300 hover:border-gray-400 p-3 rounded-md">
              <Heart className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          
          {/* Shipping and Returns */}
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex">
              <TruckIcon className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {sneaker.shipping.free ? 'Free Shipping' : 'Standard Shipping'}
                </p>
                <p className="text-sm text-gray-500">
                  Estimated delivery: {sneaker.shipping.estimatedDelivery}
                </p>
              </div>
            </div>
            
            <div className="flex">
              <RefreshCw className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Easy Returns</p>
                <p className="text-sm text-gray-500">{sneaker.returns}</p>
              </div>
            </div>
          </div>
          
          {/* Product Features */}
          <div className="mt-8">
            <button 
              onClick={() => setShowMore(!showMore)}
              className="flex items-center justify-between w-full py-3 border-t border-gray-200 text-left font-medium"
            >
              <span>Product Details</span>
              <ChevronDown className={`h-5 w-5 transition-transform ${showMore ? 'rotate-180' : ''}`} />
            </button>
            
            {showMore && (
              <div className="py-4">
                <ul className="space-y-2">
                  {sneaker.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-sm mr-2">•</span>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailThree;