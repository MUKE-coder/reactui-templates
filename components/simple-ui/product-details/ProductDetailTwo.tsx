"use client";
// ProductDetailVariant2.tsx
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Star,
  ShoppingBag,
  Heart,
  Share,
  ArrowRight,
  ChevronDown,
  Info,
  Check,
  PlusCircle,
  MinusCircle,
  ShoppingCart,
} from "lucide-react";

// Types
interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  description: string;
  shortDescription: string;
  details: {
    title: string;
    content: string;
  }[];
  specifications: {
    [key: string]: string;
  };
  images: {
    main: string;
    thumbnails: string[];
    lifestyle: string[];
  };
  colors: {
    name: string;
    value: string;
    image: string;
  }[];
  sizes: {
    name: string;
    inStock: boolean;
  }[];
  deliveryEstimate: string;
  freeShipping: boolean;
  inStock: boolean;
  sku: string;
}

interface RecommendedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
}

interface ComplementaryProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

// Mock data
const product: Product = {
  id: "p-luxdesk01",
  name: "AERO Adjustable Standing Desk Pro",
  price: 899.99,
  originalPrice: 1199.99,
  discount: 25,
  rating: 4.9,
  reviewCount: 342,
  shortDescription:
    "Premium height-adjustable desk with smart features, built-in wireless charging, and customizable memory settings",
  description:
    "Transform your workspace with the AERO Standing Desk Pro, the ultimate combination of exceptional craftsmanship and cutting-edge technology. This premium height-adjustable desk seamlessly transitions between sitting and standing positions with whisper-quiet motors and four customizable memory settings. The desk features a premium sustainably-sourced hardwood surface treated with eco-friendly finishes, built-in wireless charging pad, integrated cable management, and hidden storage compartments. The minimalist design and premium materials ensure this desk will elevate any home office or workspace.",
  details: [
    {
      title: "Craftsmanship",
      content:
        "Premium sustainably-sourced hardwood surface treated with eco-friendly finishes that enhance the natural grain while providing durability and resistance to daily wear.",
    },
    {
      title: "Smart Technology",
      content:
        "Whisper-quiet dual motors with anti-collision system, four customizable memory settings, and touch-sensitive control panel with LED display.",
    },
    {
      title: "Versatility",
      content:
        'Height range from 24.5" to 50" accommodates users of all heights, whether sitting or standing. The spacious surface provides ample room for dual-monitor setups.',
    },
    {
      title: "Convenience",
      content:
        "Built-in wireless charging pad, integrated cable management system with hidden channels, and storage compartments for office essentials.",
    },
  ],
  specifications: {
    Dimensions: '60"W x 30"D x 24.5-50"H',
    Weight: "85 lbs",
    "Weight Capacity": "330 lbs",
    Material: "Solid Hardwood, Steel Frame",
    "Adjustment Speed": "1.5 inches per second",
    "Noise Level": "< 45 dB",
    Warranty: "5 Years",
    Power: "110V, 60Hz",
    Certifications: "BIFMA, UL, GREENGUARD",
  },
  images: {
    main: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544931170-3ca1337cce88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    ],
    lifestyle: [
      "https://images.unsplash.com/photo-1593476550610-87baa860004a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1537726235470-8504e3beef77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    ],
  },
  colors: [
    {
      name: "Natural Oak",
      value: "#deb887",
      image:
        "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    },
    {
      name: "Walnut",
      value: "#5c4033",
      image:
        "https://images.unsplash.com/photo-1622643944014-7f462ed6e706?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    },
    {
      name: "Matte Black",
      value: "#2d2d2d",
      image:
        "https://images.unsplash.com/photo-1600494448650-3b4730d29246?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    },
    {
      name: "White Ash",
      value: "#f5f5f5",
      image:
        "https://images.unsplash.com/photo-1598282780190-7a632eb4201b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    },
  ],
  sizes: [
    { name: 'Small (48"W x 24"D)', inStock: true },
    { name: 'Medium (60"W x 30"D)', inStock: true },
    { name: 'Large (72"W x 30"D)', inStock: false },
    { name: 'XL (80"W x 36"D)', inStock: true },
  ],
  deliveryEstimate: "2-3 weeks",
  freeShipping: true,
  inStock: true,
  sku: "AERO-DSK-PRO-01",
};

const recommendedProducts: RecommendedProduct[] = [
  {
    id: "p-ergochair01",
    name: "ErgoFlex Pro Office Chair",
    price: 499.99,
    image:
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    category: "Chairs",
  },
  {
    id: "p-deskmat01",
    name: "Premium Leather Desk Mat",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1603531763692-c330f7b29995?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    category: "Accessories",
  },
  {
    id: "p-desklight01",
    name: "Architect LED Desk Lamp",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    rating: 4.9,
    category: "Lighting",
  },
  {
    id: "p-shelf01",
    name: "Floating Desk Shelf",
    price: 149.99,
    image:
      "https://images.unsplash.com/photo-1516981879613-9f5da904015f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    rating: 4.6,
    category: "Storage",
  },
];

const complementaryProducts: ComplementaryProduct[] = [
  {
    id: "p-monarm01",
    name: "AERO Monitor Arm",
    price: 179.99,
    image:
      "https://images.unsplash.com/photo-1590042830488-00bc38055d79?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    description:
      'Premium aluminum construction, supports monitors up to 32", includes built-in cable management',
  },
  {
    id: "p-drawer01",
    name: "AERO Under-Desk Drawer",
    price: 119.99,
    image:
      "https://images.unsplash.com/photo-1609540969455-ad5ea19be121?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    description:
      "Sleek storage solution that attaches seamlessly to your AERO desk, soft-close mechanism",
  },
  {
    id: "p-powerhub01",
    name: "AERO Power Hub",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1639153547598-65d747135d94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    description:
      "4 AC outlets, 2 USB-A ports, 2 USB-C ports, elegantly attaches to the desk edge",
  },
];

const ProductDetailTwo = () => {
  const [mainImage, setMainImage] = useState(product.images.thumbnails[0]);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [showMorePhotos, setShowMorePhotos] = useState(false);
  const [selectedComplementaryProducts, setSelectedComplementaryProducts] =
    useState<string[]>([]);

  const galleryRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  // Handle sticky header
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (detailsRef.current) {
        const { top } = detailsRef.current.getBoundingClientRect();
        setIsSticky(top <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  // Toggle complementary product selection
  const toggleComplementaryProduct = (id: string) => {
    setSelectedComplementaryProducts((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculate total price with complementary products
  const calculateTotalPrice = () => {
    let total = product.price * quantity;

    selectedComplementaryProducts.forEach((id) => {
      const product = complementaryProducts.find((p) => p.id === id);
      if (product) {
        total += product.price;
      }
    });

    return formatPrice(total);
  };

  return (
    <div className="bg-white">
      {/* Sticky product bar (appears when scrolling) */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 transform transition-transform duration-300 ${
          isSticky ? "translate-y-0 shadow-md" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded overflow-hidden">
              <Image
                src={product.images.thumbnails[0]}
                alt={product.name}
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-900">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500">
                {formatPrice(product.price)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-300 rounded">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-3 py-1 text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors flex items-center text-sm font-medium">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Gallery and Product Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Image Gallery */}
          <div ref={galleryRef} className="space-y-6">
            {/* Main Image */}
            <div className="aspect-square w-full overflow-hidden bg-gray-100 rounded-lg">
              <Image
                src={mainImage}
                alt={product.name}
                width={1000}
                height={1000}
                className="h-full w-full object-cover"
                priority
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.thumbnails.map((image, index) => (
                <button
                  key={`thumb-${index}`}
                  onClick={() => setMainImage(image)}
                  className={`aspect-square overflow-hidden rounded-md ${
                    mainImage === image
                      ? "ring-2 ring-black"
                      : "ring-1 ring-gray-200"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover hover:opacity-80 transition-opacity"
                  />
                </button>
              ))}
            </div>

            {/* Lifestyle Images */}
            <div>
              <button
                onClick={() => setShowMorePhotos(!showMorePhotos)}
                className="flex items-center text-gray-700 text-sm font-medium hover:text-black transition-colors"
              >
                {showMorePhotos ? "Hide" : "View"} lifestyle photos
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform ${
                    showMorePhotos ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showMorePhotos && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {product.images.lifestyle.map((image, index) => (
                    <div
                      key={`lifestyle-${index}`}
                      className="aspect-[4/3] overflow-hidden rounded-lg"
                    >
                      <Image
                        src={image}
                        alt={`${product.name} lifestyle ${index + 1}`}
                        width={600}
                        height={450}
                        className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div ref={detailsRef} className="flex flex-col space-y-8">
            {/* Product Header */}
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {product.name}
                  </h1>
                  <p className="mt-1 text-xl text-gray-500 max-w-lg">
                    {product.shortDescription}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Heart className="h-5 w-5 text-gray-500" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Share className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center">
                {product.discount && (
                  <div className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded">
                    SAVE {product.discount}%
                  </div>
                )}
                <div className="ml-4 flex items-baseline">
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="ml-2 text-lg text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : i < product.rating
                          ? "text-yellow-400 fill-yellow-400 opacity-50"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="ml-2 text-sm text-gray-700">
                  {product.rating} ({product.reviewCount} reviews)
                </p>
                <button className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Read all reviews
                </button>
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900">Color</h3>
              <div className="mt-3 flex space-x-2">
                {product.colors.map((color, index) => (
                  <button
                    key={`color-${index}`}
                    onClick={() => {
                      setSelectedColor(index);
                      setMainImage(color.image);
                    }}
                    className={`relative group h-16 w-16 overflow-hidden rounded-lg ${
                      selectedColor === index
                        ? "ring-2 ring-black"
                        : "ring-1 ring-gray-200"
                    }`}
                  >
                    <span
                      className="absolute inset-0 rounded-lg overflow-hidden"
                      style={{ backgroundColor: color.value }}
                    >
                      <Image
                        src={color.image}
                        alt={color.name}
                        fill
                        className="h-full w-full object-cover opacity-50 group-hover:opacity-80 transition-opacity"
                      />
                    </span>
                    {selectedColor === index && (
                      <span className="absolute bottom-1 right-1 h-4 w-4 bg-black rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </span>
                    )}
                    <span className="sr-only">{color.name}</span>
                  </button>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-500">
                {product.colors[selectedColor].name}
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center">
                  <Info className="h-4 w-4 mr-1" />
                  Size guide
                </button>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {product.sizes.map((size, index) => (
                  <button
                    key={`size-${index}`}
                    onClick={() => size.inStock && setSelectedSize(index)}
                    disabled={!size.inStock}
                    className={`
                      relative px-4 py-3 flex items-center justify-between rounded-lg border 
                      ${
                        selectedSize === index
                          ? "border-black bg-black bg-opacity-5"
                          : "border-gray-300"
                      }
                      ${
                        !size.inStock
                          ? "cursor-not-allowed opacity-50"
                          : "hover:border-gray-400"
                      }
                    `}
                  >
                    <span className="text-sm font-medium">{size.name}</span>
                    {!size.inStock && (
                      <span className="text-xs text-red-600">Out of stock</span>
                    )}
                    {selectedSize === index && size.inStock && (
                      <Check className="h-4 w-4 text-black" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="border-t border-b py-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="mr-4 text-sm font-medium text-gray-900">
                    Quantity
                  </span>
                  <div className="flex items-center border border-gray-300 rounded">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-gray-600 hover:bg-gray-100"
                    >
                      <MinusCircle className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 text-sm font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 text-gray-600 hover:bg-gray-100"
                    >
                      <PlusCircle className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Stock and SKU */}
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <span
                      className={`h-3 w-3 rounded-full ${
                        product.inStock ? "bg-green-500" : "bg-red-500"
                      } mr-2`}
                    ></span>
                    <span className="text-gray-700">
                      {product.inStock ? "In stock" : "Out of stock"}
                    </span>
                  </div>
                  <span className="text-gray-500">SKU: {product.sku}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button className="flex-1 bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors flex items-center justify-center font-medium">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>
                <button className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition-colors flex items-center justify-center font-medium">
                  Buy Now
                </button>
              </div>

              {/* Delivery Info */}
              <div className="flex items-start space-x-6 bg-gray-50 rounded-lg p-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Estimated Delivery
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.deliveryEstimate}
                  </p>
                </div>
                {product.freeShipping && (
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Free Shipping
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      On all orders over $999
                    </p>
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Easy Returns
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    30-day money back guarantee
                  </p>
                </div>
              </div>
            </div>

            {/* Product Tabs */}
            <div className="mt-8">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                  {["description", "details", "specifications"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`
                        pb-4 px-1 border-b-2 font-medium text-sm
                        ${
                          activeTab === tab
                            ? "border-black text-black"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }
                      `}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="py-6">
                {activeTab === "description" && (
                  <div className="prose max-w-none">
                    <p className="text-gray-800 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                )}

                {activeTab === "details" && (
                  <div className="space-y-6">
                    {product.details.map((detail, index) => (
                      <div key={`detail-${index}`}>
                        <h4 className="text-sm font-medium text-gray-900">
                          {detail.title}
                        </h4>
                        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                          {detail.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "specifications" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(product.specifications).map(
                      ([key, value], index) => (
                        <div
                          key={`spec-${index}`}
                          className="flex justify-between border-b pb-3"
                        >
                          <span className="text-sm font-medium text-gray-900">
                            {key}
                          </span>
                          <span className="text-sm text-gray-600">{value}</span>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Complementary Products Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900">
            Complete Your Setup
          </h2>
          <p className="mt-1 text-gray-500">
            Add these compatible products to enhance your workspace
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {complementaryProducts.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex">
                  <div className="w-1/3 aspect-square bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="w-2/3 p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-sm font-medium text-gray-900">
                        {formatPrice(product.price)}
                      </p>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedComplementaryProducts.includes(
                            product.id
                          )}
                          onChange={() =>
                            toggleComplementaryProduct(product.id)
                          }
                          className="rounded border-gray-300 text-black focus:ring-black"
                        />
                        <span className="ml-2 text-xs font-medium text-gray-700">
                          Add
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedComplementaryProducts.length > 0 && (
            <div className="mt-6 bg-gray-50 rounded-lg p-6 flex flex-col sm:flex-row justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Bundle Price
                </h3>
                <p className="mt-1 text-gray-500">
                  {product.name} + {selectedComplementaryProducts.length}{" "}
                  {selectedComplementaryProducts.length === 1
                    ? "item"
                    : "items"}
                </p>
                <p className="mt-2 text-2xl font-bold">
                  {calculateTotalPrice()}
                </p>
              </div>
              <button className="mt-4 sm:mt-0 bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center font-medium">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add Bundle to Cart
              </button>
            </div>
          )}
        </div>

        {/* Recommended Products */}
        <div className="mt-20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Recommended For You
              </h2>
              <p className="mt-1 text-gray-500">
                Products curated based on your interests
              </p>
            </div>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center">
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {recommendedProducts.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-100 group-hover:opacity-90 transition-opacity">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover object-center"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-full bg-white text-black rounded-md py-2 text-sm font-medium hover:bg-gray-100 transition-colors">
                      Quick View
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between">
                    <h3 className="text-sm font-medium text-gray-900">
                      {product.name}
                    </h3>
                    <p className="text-sm font-medium text-gray-900">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-xs text-gray-500">{product.category}</p>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-xs text-gray-500">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailTwo;
