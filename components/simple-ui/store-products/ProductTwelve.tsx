"use client";
import React, { useState } from "react";

interface Product {
  id: number;
  price: string;
  title: string;
  description: string;
  location: string;
  condition: string;
  category: "retail" | "warehouse";
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    price: "USh 450,000",
    title: "Samsung Galaxy S21+ 5G 128 GB Silver",
    description:
      "Small dot and 2 lines perfectly working strong battery and camera quality",
    location: "Kampala, Central Division",
    condition: "Used",
    category: "retail",
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 2,
    price: "USh 600,000",
    title: "Samsung Galaxy S22 Ultra 256 GB Black",
    description: "Samsung s22 ultra with a failed camera @ a wholesale price",
    location: "Kampala, Central Division",
    condition: "Used",
    category: "warehouse",
    image:
      "https://images.unsplash.com/photo-1659789500111-64da4da304c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 3,
    price: "USh 450,000",
    title: "Huawei nova 10 256 GB Black",
    description: "Still as good as new and ready for use",
    location: "Kampala, Central Division",
    condition: "Used",
    category: "retail",
    image:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
  },
  {
    id: 4,
    price: "USh 180,000",
    title: "Apple iPhone 11 64 GB Yellow",
    description: "Am selling it as spare parts",
    location: "Kampala, Makindye",
    condition: "Used",
    category: "warehouse",
    image:
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1129&q=80",
  },
  {
    id: 5,
    price: "USh 2,500,000",
    title: "Samsung Galaxy Z Fold7 256 GB Black",
    description:
      "The phone is in good condition with a legit receipt and warranty, at pocket friendly price",
    location: "Kampala, Central Division",
    condition: "Used",
    category: "retail",
    image:
      "https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 6,
    price: "USh 680,000",
    title: "Apple iPhone 11 Pro Max 256 GB Gold",
    description: "iPhone 11 promax noface id good battery and screen",
    location: "Kampala, Central Division",
    condition: "Used",
    category: "warehouse",
    image:
      "https://images.unsplash.com/photo-1574755393849-623942496936?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
  },
  {
    id: 7,
    price: "USh 150,000",
    title: "BlackBerry Bold Touch 9900 8 GB Black",
    description:
      "For all your blackberry phones uk used i got u covered from 150k to 500k",
    location: "Kampala, Central Division",
    condition: "Refurbished",
    category: "retail",
    image:
      "https://images.unsplash.com/photo-1616348436168-de43ad0db179?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=481&q=80",
  },
  {
    id: 8,
    price: "USh 750,000",
    title: "Apple iPhone 12 128 GB White",
    description: "Face id Clean as new",
    location: "Kampala, Central Division",
    condition: "Used",
    category: "warehouse",
    image:
      "https://images.unsplash.com/photo-1632661674596-618e45e56c53?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
  },
];

const ProductTwelve = () => {
  const [activeTab, setActiveTab] = useState<"retail" | "warehouse">("retail");

  const filteredProducts = products.filter(
    (product) => product.category === activeTab
  );

  const handleCardClick = (productId: number) => {
    console.log(`Product ${productId} clicked`);
    // In a real app, you would navigate to the product detail page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Mobile Phone Marketplace
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our selection of quality smartphones at competitive prices
          </p>
        </header>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="flex border-b border-gray-200">
            <button
              className={`px-6 py-3 text-lg font-medium ${
                activeTab === "retail"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("retail")}
            >
              Retail
            </button>
            <button
              className={`px-6 py-3 text-lg font-medium ${
                activeTab === "warehouse"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("warehouse")}
            >
              Warehouse
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleCardClick(product.id)}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-2xl font-bold text-gray-800">
                    {product.price}
                  </span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      product.condition === "Used"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {product.condition}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center text-gray-500">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  <span>{product.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 mx-auto text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-700">
              No products found
            </h3>
            <p className="mt-2 text-gray-500">
              There are no products in this category at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTwelve;
