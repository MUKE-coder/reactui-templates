"use client";
// LuxuryFurnitureDetail.tsx
import { useState } from "react";
import Image from "next/image";
import { Plus, Minus, Search, ShoppingCart } from "lucide-react";
// Types
interface ProductImage {
  id: string;
  src: string;
  alt: string;
  thumbnail: string;
}

interface ProductColor {
  id: string;
  name: string;
  value: string;
  available: boolean;
}

interface SocialMediaLink {
  platform: string;
  url: string;
}

interface InstagramPost {
  id: string;
  image: string;
  alt: string;
}

interface RecommendedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  designer: string;
  tag?: "Exclusive" | "Best Seller" | "New";
}

interface ShippingInfo {
  title: string;
  description: string;
  icon: string;
}

interface Product {
  id: string;
  name: string;
  designer: string;
  price: number;
  description: string;
  details: string;
  dimensions: {
    width: string;
    depth: string;
    height: string;
    seatHeight?: string;
    weight?: string;
  };
  colors: ProductColor[];
  images: ProductImage[];
  care: string;
  sustainability: string;
  inStock: boolean;
  sku: string;
}

// Mock data
const product: Product = {
  id: "luxury-chair-001",
  name: "Leon Accent Chair",
  designer: "Carly Cushnie",
  price: 1198,
  description:
    "Fashion designer and creative director Carly Cushnie brings her celebrated sense of style to Flaxman with her first-ever line of furniture exclusively for sale and lounging. The Leon chair looks sleek comfort into an elemental design with its dramatic draping and graceful curves, dressed-up look in a natural texture. The open profile creates the needed room at your bedside, dressing area, or living room for the space to feel light, open, and naturally restful.",
  details:
    "Kiln-dried hardwood frame with sinuous springs and high-density foam cushioning. Fully upholstered with channel stitch detail. Solid oak legs with natural finish. Designed in New York City and handcrafted in Los Angeles, California.",
  dimensions: {
    width: '29"',
    depth: '32"',
    height: '28"',
    seatHeight: '17"',
    weight: "45 lbs",
  },
  colors: [
    {
      id: "cream",
      name: "Cream",
      value: "#e6e2d3",
      available: true,
    },
    {
      id: "black",
      name: "Black",
      value: "#000000",
      available: true,
    },
  ],
  images: [
    {
      id: "img-1",
      src: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      alt: "Leon Accent Chair front view",
      thumbnail:
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: "img-2",
      src: "https://images.unsplash.com/photo-1591782651443-5731aa5d249a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      alt: "Leon Accent Chair side view",
      thumbnail:
        "https://images.unsplash.com/photo-1591782651443-5731aa5d249a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: "img-3",
      src: "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      alt: "Leon Accent Chair fabric detail",
      thumbnail:
        "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: "img-4",
      src: "https://images.unsplash.com/photo-1617103996702-96ff29b1c467?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      alt: "Leon Accent Chair in room setting",
      thumbnail:
        "https://images.unsplash.com/photo-1617103996702-96ff29b1c467?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
    },
  ],
  care: "Professional cleaning recommended. Spot clean with mild water-free solvent or dry cleaning product. Vacuum regularly with upholstery attachment to keep fabric dust-free.",
  sustainability:
    "This product is made with FSC®-certified and other controlled wood. It's crafted in a workshop that follows strict environmental standards to minimize waste and use renewable energy whenever possible.",
  inStock: true,
  sku: "LC-ACC-001",
};

const instagramPosts: InstagramPost[] = [
  {
    id: "insta-1",
    image:
      "https://images.unsplash.com/photo-1616627561950-9f746e330187?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    alt: "Living room with Leon Accent Chair",
  },
  {
    id: "insta-2",
    image:
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    alt: "Minimalist interior with furniture",
  },
  {
    id: "insta-3",
    image:
      "https://images.unsplash.com/photo-1581541234264-28d5fb9473b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    alt: "Cozy reading corner with chair",
  },
];

const recentlyViewed: RecommendedProduct[] = [
  {
    id: "prod-001",
    name: "Natural Wood Coffee Table",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1604061991871-17cdae76a26d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    designer: "Laura Chen",
    tag: "Exclusive",
  },
  {
    id: "prod-002",
    name: "Modern Olive Sofa",
    price: 2199,
    image:
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    designer: "Studio Maxwell",
    tag: "Best Seller",
  },
  {
    id: "prod-003",
    name: "Sculptural Lounge Chair",
    price: 1599,
    image:
      "https://images.unsplash.com/photo-1571898243672-a2b0f38b6031?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    designer: "Northwood Studio",
    tag: "New",
  },
];

const recommended: RecommendedProduct[] = [
  {
    id: "rec-001",
    name: "Abstract Line Art",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    designer: "Pablo Estrada",
    tag: "Exclusive",
  },
  {
    id: "rec-002",
    name: "Camel Modular Sofa",
    price: 3499,
    image:
      "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    designer: "Habitat Collective",
    tag: "Best Seller",
  },
  {
    id: "rec-003",
    name: "Wooden Drum Side Table",
    price: 349,
    image:
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    designer: "Terra Studios",
    tag: "New",
  },
];

const shippingInfo: ShippingInfo[] = [
  {
    title: "Shipping",
    description:
      "In-stock items ship within 2 business days via White Glove or Standard Ground shipping. Orders placed before 2 p.m. central time will ship the same business day.",
    icon: "shipping",
  },
  {
    title: "Delivery",
    description:
      "Delivery includes an appointment and signature. A two-person team will bring the item inside placed it in the room of your choice (with remote placement).",
    icon: "delivery",
  },
  {
    title: "Returns",
    description:
      "Please notify that this item aligns with your specific requirements before ordering the merchandise, as products are made to order. Ask us about your free returns and return pickup.",
    icon: "returns",
  },
];

const socialMedia: SocialMediaLink[] = [
  { platform: "Facebook", url: "#" },
  { platform: "Pinterest", url: "#" },
  { platform: "Instagram", url: "#" },
  { platform: "TikTok", url: "#" },
];

const ProductDetailSix = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Toggle accordion
  const toggleAccordion = (section: string) => {
    if (activeAccordion === section) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(section);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-xl font-bold text-gray-900">
                  lulu<span className="font-normal">andgeorgia</span>
                </span>
              </div>
            </div>

            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900">
                About Us
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900">
                Our Collections
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900">
                Design Inspiration
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900">
                Our Projects
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-900">
                <Search className="h-5 w-5" />
              </button>
              <button className="text-gray-500 hover:text-gray-900">
                <ShoppingCart className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Product Detail Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Product Images Column */}
          <div className="lg:col-span-7">
            <div className="flex flex-row">
              {/* Thumbnails */}
              <div className="flex flex-col mr-4 space-y-4">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setActiveImage(index)}
                    className={`w-16 h-16 border ${
                      activeImage === index
                        ? "border-gray-900"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="relative w-full h-full overflow-hidden">
                      <Image
                        src={image.thumbnail}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 bg-gray-100">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.images[activeImage].src}
                    alt={product.images[activeImage].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Info Column */}
          <div className="lg:col-span-5">
            <h1 className="text-3xl font-medium text-gray-900">
              {product.name}
            </h1>
            <p className="mt-1 text-sm text-gray-600">by {product.designer}</p>

            <p className="mt-4 text-2xl font-medium">
              {formatPrice(product.price)}
            </p>
            <button className="mt-2 text-sm text-gray-600 hover:text-gray-900 underline">
              Request Free Swatch
            </button>

            {/* Color Options */}
            <div className="mt-6 flex space-x-2">
              {product.colors.map((color, index) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(index)}
                  className={`w-8 h-8 border ${
                    selectedColor === index
                      ? "border-gray-900"
                      : "border-gray-300"
                  }`}
                  title={color.name}
                >
                  <span
                    className="block w-full h-full"
                    style={{ backgroundColor: color.value }}
                  ></span>
                </button>
              ))}
            </div>

            {/* Quantity Selector */}
            <div className="mt-6 flex items-center">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 border border-gray-300 text-gray-600"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 border border-gray-300 text-gray-600"
              >
                <Plus className="h-4 w-4" />
              </button>
              <span className="ml-auto text-sm text-gray-600">
                ${(product.price * quantity).toFixed(2)}
              </span>
            </div>

            {/* CTAs */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="py-3 px-4 border border-gray-900 text-gray-900 font-medium">
                BUY NOW
              </button>
              <button className="py-3 px-4 bg-gray-900 text-white font-medium">
                ADD TO CART
              </button>
            </div>

            {/* Product Description */}
            <div className="mt-8">
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Accordion Sections */}
            <div className="mt-8 border-t border-gray-200">
              {/* Details Section */}
              <div className="py-4 border-b border-gray-200">
                <button
                  onClick={() => toggleAccordion("details")}
                  className="flex justify-between items-center w-full text-left"
                >
                  <span className="text-sm font-medium text-gray-900">
                    Details
                  </span>
                  <Plus
                    className={`h-4 w-4 text-gray-500 transition-transform ${
                      activeAccordion === "details" ? "rotate-45" : ""
                    }`}
                  />
                </button>
                {activeAccordion === "details" && (
                  <div className="mt-4 text-sm text-gray-600">
                    <p>{product.details}</p>
                  </div>
                )}
              </div>

              {/* Dimensions Section */}
              <div className="py-4 border-b border-gray-200">
                <button
                  onClick={() => toggleAccordion("dimensions")}
                  className="flex justify-between items-center w-full text-left"
                >
                  <span className="text-sm font-medium text-gray-900">
                    Dimensions
                  </span>
                  <Plus
                    className={`h-4 w-4 text-gray-500 transition-transform ${
                      activeAccordion === "dimensions" ? "rotate-45" : ""
                    }`}
                  />
                </button>
                {activeAccordion === "dimensions" && (
                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <p>Width: {product.dimensions.width}</p>
                    <p>Depth: {product.dimensions.depth}</p>
                    <p>Height: {product.dimensions.height}</p>
                    {product.dimensions.seatHeight && (
                      <p>Seat Height: {product.dimensions.seatHeight}</p>
                    )}
                    {product.dimensions.weight && (
                      <p>Weight: {product.dimensions.weight}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Care Section */}
              <div className="py-4 border-b border-gray-200">
                <button
                  onClick={() => toggleAccordion("care")}
                  className="flex justify-between items-center w-full text-left"
                >
                  <span className="text-sm font-medium text-gray-900">
                    Care
                  </span>
                  <Plus
                    className={`h-4 w-4 text-gray-500 transition-transform ${
                      activeAccordion === "care" ? "rotate-45" : ""
                    }`}
                  />
                </button>
                {activeAccordion === "care" && (
                  <div className="mt-4 text-sm text-gray-600">
                    <p>{product.care}</p>
                  </div>
                )}
              </div>

              {/* Sustainability Section */}
              <div className="py-4 border-b border-gray-200">
                <button
                  onClick={() => toggleAccordion("sustainability")}
                  className="flex justify-between items-center w-full text-left"
                >
                  <span className="text-sm font-medium text-gray-900">
                    Sustainability
                  </span>
                  <Plus
                    className={`h-4 w-4 text-gray-500 transition-transform ${
                      activeAccordion === "sustainability" ? "rotate-45" : ""
                    }`}
                  />
                </button>
                {activeAccordion === "sustainability" && (
                  <div className="mt-4 text-sm text-gray-600">
                    <p>{product.sustainability}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Instagram Section */}
      <InstagramSection hashtag="LANDGATHOME" posts={instagramPosts} />

      {/* Recently Viewed Section */}
      <div className="border-t border-gray-200">
        <RecommendedProducts
          title="Recently Viewed"
          products={recentlyViewed}
        />
      </div>

      {/* Recommended Products Section */}
      <RecommendedProducts
        title="Most Recommended Product For You!"
        products={recommended}
      />

      {/* Footer Get In Touch Section */}
      <FooterGetInTouch shippingInfo={shippingInfo} socialMedia={socialMedia} />
    </div>
  );
};

export default ProductDetailSix;

import { ChevronLeft, ChevronRight } from "lucide-react";

interface RecommendedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  designer: string;
  tag?: "Exclusive" | "Best Seller" | "New";
}

interface RecommendedProductsProps {
  title: string;
  products: RecommendedProduct[];
}

const RecommendedProducts = ({ title, products }: RecommendedProductsProps) => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          {title}
        </h2>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group">
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  {product.tag && (
                    <div className="absolute top-2 left-2 z-10">
                      <span
                        className={`
                        inline-block px-2 py-1 text-xs font-medium
                        ${
                          product.tag === "Exclusive"
                            ? "bg-yellow-100 text-yellow-800"
                            : product.tag === "Best Seller"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }
                      `}
                      >
                        {product.tag}
                      </span>
                    </div>
                  )}
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-base font-medium text-gray-900">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    By {product.designer}
                  </p>
                  <p className="mt-1 font-medium text-gray-900">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
            <button className="p-2 bg-white rounded-full shadow-md">
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
            <button className="p-2 bg-white rounded-full shadow-md">
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-6 space-x-2">
          {[0, 1, 2, 3].map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                activeSlide === index ? "bg-gray-900" : "bg-gray-300"
              }`}
              onClick={() => setActiveSlide(index)}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

interface InstagramPost {
  id: string;
  image: string;
  alt: string;
}

interface InstagramSectionProps {
  hashtag: string;
  posts: InstagramPost[];
}

const InstagramSection = ({ hashtag, posts }: InstagramSectionProps) => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section className="border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">#{hashtag}</h2>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="aspect-square relative overflow-hidden"
              >
                <Image
                  src={post.image}
                  alt={post.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <p className="text-sm text-gray-600">Share Your Home With Us</p>
          </div>

          <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
            <button className="p-2 bg-white rounded-full shadow-md">
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
            <button className="p-2 bg-white rounded-full shadow-md">
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-6 space-x-2">
          {[0, 1, 2, 3].map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                activeSlide === index ? "bg-gray-900" : "bg-gray-300"
              }`}
              onClick={() => setActiveSlide(index)}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

interface SocialMediaLink {
  platform: string;
  url: string;
}

interface ShippingInfo {
  title: string;
  description: string;
  icon: string;
}

interface FooterGetInTouchProps {
  shippingInfo: ShippingInfo[];
  socialMedia: SocialMediaLink[];
}

const FooterGetInTouch = ({
  shippingInfo,
  socialMedia,
}: FooterGetInTouchProps) => {
  return (
    <section className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-bold mb-16 text-center">GET IN TOUCH</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {shippingInfo.map((info, index) => (
            <div
              key={index}
              className="p-6 border-r border-gray-700 last:border-r-0"
            >
              <h3 className="text-lg font-medium mb-3">{info.title}</h3>
              <p className="text-sm text-gray-300">{info.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Social Media</h3>
            <ul className="space-y-2">
              {socialMedia.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-sm text-gray-300 hover:text-white"
                  >
                    {link.platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Customer Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-300 hover:text-white">
                  Top Questions
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-300 hover:text-white">
                  Start a Return
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-300 hover:text-white">
                  Rug Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-300 hover:text-white">
                  Gift Card
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">The Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-300 hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-300 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-300 hover:text-white">
                  Customer Reviews
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-300 hover:text-white">
                  Accessibility
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Subscribe To Us!</h3>
            <p className="text-sm text-gray-300 mb-4">
              Sign Up For Our Email List And Receive 5% Off Your First Order.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your Email Address"
                className="w-full px-4 py-2 bg-transparent border-b border-gray-600 focus:border-white focus:outline-none text-white"
              />
              <button className="absolute right-0 top-1/2 transform -translate-y-1/2">
                <ChevronRight className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-gray-700">
        <p className="text-sm text-gray-400 text-center">
          © 2024. luluandgeorgia All rights reserved.
        </p>
      </div>
    </section>
  );
};
