"use client";
// ClarityUIKitDetail.tsx
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Types
interface UIKitProduct {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  lastUpdated: string;
  description: string;
  features: string[];
  highlights: string[];
  pricing: {
    id: string;
    name: string;
    price: number;
    period: string;
    description: string;
    isPopular?: boolean;
  }[];
  images: {
    main: string[];
    thumbnails?: string[];
  };
}

// Mock data
const clarityUIKit: UIKitProduct = {
  id: "clarity-ui-kit-01",
  name: "Clarity Landing UI Kit",
  rating: 5,
  reviewCount: 39,
  lastUpdated: "April 18, 2021",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum aliquet accumsan porta lectus ridiculus in mattis. Netus sodales in volutpat ullamcorper amet adipiscing fermentum. Ornare in sit nulla ante semper ultrices lorem. Augue amet rhoncus molestie id adipiscing nullam a consectetur.",
  features: [
    "90+ Coded Blocks",
    "Made with TailwindCSS",
    "Fully Responsive on Every Device",
  ],
  highlights: [
    "Personal & Commercial License",
    "Regular Updates",
    "Created by Rareblocks Team",
  ],
  pricing: [
    {
      id: "monthly",
      name: "$19",
      price: 19,
      period: "1 month access to Clarity UI",
      description: "Basic access",
    },
    {
      id: "biannual",
      name: "$29",
      price: 29,
      period: "6 month access to Clarity UI",
      description: "Standard access",
      isPopular: true,
    },
    {
      id: "annual",
      name: "$49",
      price: 49,
      period: "12 month access to Clarity UI",
      description: "Extended access",
    },
  ],
  images: {
    main: [
      "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    ],
  },
};

const additionalText = {
  landingPageText:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut amet a a blandit id non viverra massa semper. Varius bibendum suscipit sed mattis turpis enim in ornare. In orci condimentum id in. Sit sodales tempor, sed feugiat sit at fames a tellus.",
  additionalParagraphs: [
    "Nullam iaculis dui donec ullamcorper congue in venenatis. Nunc suspendisse nec phasellus sit mauris. Varius magna phasellus lacus diam. Convallis facilisis turpis nulla pellentesque viverra porttitor. Sit et, magna interdum vitae purus elementum gravida leo.",
    "Neque, dignissim vulputate molestie tristique ipsum scelerisque arcu eu eget. Lectus in interdum viverra faucibus lorem adipiscing fames. Nisl, vitae euismod mi nibh et lectus viverra cursus eget. Lobortis ipsum, nulla sodales dignissim. Venenatis, convallis aliquam rhoncus integer auctor.",
  ],
};

const ProductDetailFour = () => {
  const [selectedPlan, setSelectedPlan] = useState("biannual");

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-900">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-gray-900">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">ClarityUI</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content - Left Column */}
        <div className="lg:col-span-8">
          {/* Product Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {clarityUIKit.images.main.map((image, index) => (
              <div
                key={index}
                className={`rounded-lg overflow-hidden border border-gray-200 ${
                  index === 0 ? "bg-blue-500" : "bg-black"
                }`}
              >
                <div className="aspect-[16/9] relative">
                  <Image
                    src={image}
                    alt={`${clarityUIKit.name} screenshot ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              {clarityUIKit.reviewCount} Reviews
            </span>
          </div>

          {/* Product Title and Update Date */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {clarityUIKit.name}
          </h1>
          <p className="text-gray-500 mb-6">
            Updated on {clarityUIKit.lastUpdated}
          </p>

          {/* Description */}
          <p className="text-gray-700 mb-8">{clarityUIKit.description}</p>

          {/* Features */}
          <h2 className="text-xl font-bold text-gray-900 mb-4">Features</h2>
          <ul className="list-disc pl-5 space-y-2 mb-8">
            {clarityUIKit.features.map((feature, index) => (
              <li key={index} className="text-gray-700">
                {feature}
              </li>
            ))}
          </ul>

          {/* Landing Page Section */}
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Make landing page fast
          </h2>
          <p className="text-gray-700 mb-8">{additionalText.landingPageText}</p>

          {/* Additional Paragraphs */}
          {additionalText.additionalParagraphs.map((paragraph, index) => (
            <p key={index} className="text-gray-700 mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Sidebar - Right Column */}
        <div className="lg:col-span-4">
          <div className="sticky top-8 space-y-8">
            {/* Highlights */}
            <div className="bg-white p-6 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Highlights:
              </h3>
              <ul className="space-y-3">
                {clarityUIKit.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 bg-gray-500 rounded-full mt-2 mr-2"></span>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing Plans */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Select a package:
                </h3>
              </div>

              <div className="divide-y divide-gray-200">
                {clarityUIKit.pricing.map((plan) => (
                  <label
                    key={plan.id}
                    className={`block p-6 cursor-pointer hover:bg-gray-50 ${
                      selectedPlan === plan.id ? "bg-gray-50" : ""
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="pricing-plan"
                        id={plan.id}
                        value={plan.id}
                        checked={selectedPlan === plan.id}
                        onChange={() => setSelectedPlan(plan.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="ml-4 flex items-center justify-between w-full">
                        <div>
                          <p className="text-lg font-bold text-gray-900">
                            {plan.name}
                          </p>
                          <p className="text-sm text-gray-600">{plan.period}</p>
                        </div>
                        {plan.isPopular && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Popular
                          </span>
                        )}
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {/* Call to Action Buttons */}
              <div className="p-6 space-y-4">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-150">
                  Purchase now - $
                  {clarityUIKit.pricing.find((plan) => plan.id === selectedPlan)
                    ?.price || 29}
                </button>
                <button className="w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 px-4 rounded-md border border-gray-300 transition duration-150">
                  Live preview
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailFour;
