"use client";
import { useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";

const BannerSix = () => {
  const [selectedColor, setSelectedColor] = useState("#a8d4d4");

  const colors = [
    { id: 1, value: "#a8d4d4", name: "Teal" },
    { id: 2, value: "#9190c7", name: "Purple" },
    { id: 3, value: "#dba8a8", name: "Rose" },
  ];

  // Function to simulate image change based on color selection
  const getImagePath = () => {
    // In a real implementation, you would have different images for each color
    return "https://14j7oh8kso.ufs.sh/f/HLxTbDBCDLwf31LUnOIIoG6DYfZiHgUkB8udwC12QVF4TNer";
  };

  return (
    <div
      className="w-full transition-colors duration-300"
      style={{ backgroundColor: `${selectedColor}30` }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 md:px-10 py-12">
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Lento Lounge Nest Chair
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Its plush, ergonomic curves provide excellent support, making it a
              stylish and cozy addition to any modern space. Relax as if you're
              floating on a cloud.
            </p>

            <div className="flex space-x-4 mb-8">
              <button className="bg-black text-white px-6 py-3 flex items-center space-x-2 hover:bg-gray-800 transition">
                <ShoppingCart size={20} />
                <span>Add to Cart</span>
              </button>
              <button className="border border-gray-300 px-6 py-3 hover:bg-gray-100 transition">
                Learn More
              </button>
              <button className="border border-gray-300 p-3 flex items-center justify-center hover:bg-gray-100 transition">
                <Heart size={20} />
              </button>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              {colors.map((color) => (
                <button
                  key={color.id}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    selectedColor === color.value
                      ? "ring-2 ring-offset-2 ring-gray-400"
                      : ""
                  }`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => setSelectedColor(color.value)}
                  aria-label={`Select ${color.name} color`}
                >
                  {selectedColor === color.value && (
                    <span className="text-white text-xs">✓</span>
                  )}
                </button>
              ))}
              <span className="text-sm text-gray-600">
                {colors.find((c) => c.value === selectedColor)?.name} fabric
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-96 md:h-full w-full transition-all duration-300">
              <img
                src={getImagePath()}
                alt="Lento Lounge Chair"
                className="object-contain w-full h-full"
              />

              <div className="absolute top-1/3 right-4 flex items-center">
                <div className="w-4 h-4 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
                </div>
                <div className="ml-2 bg-white border border-gray-200 px-3 py-1 text-sm shadow-md rounded-md">
                  {colors.find((c) => c.value === selectedColor)?.name} velvet
                  fabric
                </div>
              </div>

              <div className="absolute bottom-1/4 right-8 flex items-center">
                <div className="w-4 h-4 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
                </div>
                <div className="ml-2 bg-white border border-gray-200 px-3 py-1 text-sm shadow-md rounded-md">
                  Solid oak wood
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-gray-200">
          <div className="py-8 px-6 text-center border-r border-gray-200">
            <div className="text-2xl md:text-3xl font-bold">2.5k+</div>
            <div className="text-gray-600">Sold Chairs</div>
          </div>
          <div className="py-8 px-6 text-center border-r border-gray-200">
            <div className="text-2xl md:text-3xl font-bold">98%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
          <div className="py-8 px-6 text-center border-r border-gray-200">
            <div className="text-2xl md:text-3xl font-bold">1.2k</div>
            <div className="text-gray-600">5-Star Reviews</div>
          </div>
          <div className="py-8 px-6 text-center">
            <div className="text-2xl md:text-3xl font-bold">10</div>
            <div className="text-gray-600">Year Warranty</div>
          </div>
        </div>

        <div
          className="py-8 px-6 md:px-10 flex flex-col md:flex-row justify-between items-center transition-colors duration-300"
          style={{ backgroundColor: `${selectedColor}60` }}
        >
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">Buy Now</h2>
            <div className="text-lg">USD $798</div>
          </div>
          <button className="bg-white px-8 py-3 font-medium hover:bg-gray-100 transition">
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerSix;
