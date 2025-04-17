"use client";
import { useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

const BannerFive = () => {
  return (
    <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 md:p-8 lg:p-10 rounded-3xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Hero Section - Left Side */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
            Discover your
            <br />
            99% effective
            <br />
            remote
          </h1>

          <div className="mt-4 mb-8">
            <Link
              href="/get-started"
              className="bg-black text-white px-8 py-3 rounded-full flex items-center space-x-2 hover:bg-gray-800 transition w-fit"
            >
              <span>Get Started</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Product Cards - Bottom Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {/* Pink Card */}
            <Link
              href="/best-selling"
              className="bg-pink-400 p-6 rounded-3xl text-white relative overflow-hidden group hover:shadow-lg transition duration-300"
            >
              <div className="flex flex-col h-full">
                <h3 className="text-2xl font-bold mb-2">
                  Best Selling Products
                </h3>
                <p className="mb-12">View Products</p>
                <div className="absolute bottom-4 right-4 bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition">
                  <ArrowRight size={24} className="text-white" />
                </div>
              </div>
            </Link>

            {/* Gray Card */}
            <div className="bg-gray-200 p-6 rounded-3xl relative overflow-hidden">
              <div className="flex justify-center mb-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-white">
                    <img
                      src="https://14j7oh8kso.ufs.sh/f/HLxTbDBCDLwfMZkY9zCoWwDY3IJO8Aj2QRgSZFGhCkqMKaft"
                      alt="Beauty product"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-white">
                    <img
                      src="https://14j7oh8kso.ufs.sh/f/HLxTbDBCDLwftye5sU2iVG7KkMc0Z9LTeyBRuPQlIEYzv36N"
                      alt="Woman with product"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 w-full left-0 px-6">
                <Link
                  href="/learn-more"
                  className="w-full bg-white text-black py-3 px-4 rounded-full flex items-center justify-center space-x-2 hover:bg-gray-50 transition"
                >
                  <span>Learn More</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Section - Right Side */}
        <div className="space-y-6">
          {/* Main Product Image */}
          <Link
            href="/skin-care"
            className="block bg-gray-100 p-4 rounded-3xl relative overflow-hidden group hover:shadow-lg transition duration-300"
          >
            <img
              src="https://14j7oh8kso.ufs.sh/f/HLxTbDBCDLwfMZkY9zCoWwDY3IJO8Aj2QRgSZFGhCkqMKaft"
              alt="Beauty Products Collection"
              className="w-full h-64 md:h-80 object-cover rounded-2xl"
            />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-bold">Take Care Your Skin</h3>
              <p className="text-sm hidden sm:block">See Our Latest Products</p>
            </div>
            <div className="absolute top-1/2 left-8 transform -translate-y-1/2 bg-white/30 p-3 rounded-full backdrop-blur-sm group-hover:bg-white/40 transition">
              <ArrowRight size={20} className="text-white" />
            </div>
          </Link>

          {/* Reviews and Tutorials Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Reviews Section */}
            <div className="flex flex-col space-y-4">
              {/* User Avatars */}
              <div className="flex -space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
                  <img
                    src="https://14j7oh8kso.ufs.sh/f/HLxTbDBCDLwfqv8kOjgnxaXK5QskFPrNjMOTW0coEGZB2h7d"
                    alt="User 1"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
                  <img
                    src="https://14j7oh8kso.ufs.sh/f/HLxTbDBCDLwftye5sU2iVG7KkMc0Z9LTeyBRuPQlIEYzv36N"
                    alt="User 2"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
                  <img
                    src="https://14j7oh8kso.ufs.sh/f/HLxTbDBCDLwfqv8kOjgnxaXK5QskFPrNjMOTW0coEGZB2h7d"
                    alt="User 3"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Rating */}
              <div>
                <h2 className="text-6xl font-bold">5.2K</h2>
                <p className="text-sm text-gray-700">
                  5 star reviews from
                  <br className="hidden sm:block" />
                  our clients
                </p>
              </div>

              <div className="mt-2">
                <p className="text-xl font-medium hidden sm:block">
                  innovative technology
                  <br />
                  before your eyes
                </p>
                <p className="text-xl font-medium sm:hidden">
                  innovative technology
                </p>
              </div>
            </div>

            {/* Tutorials Section */}
            <Link
              href="/tutorials"
              className="bg-purple-300 rounded-3xl p-6 flex items-center justify-between group hover:bg-purple-400 transition duration-300"
            >
              <button className="bg-white text-black py-2 px-4 rounded-full flex items-center space-x-2">
                <Play size={16} className="fill-current" />
                <span>See Tutorials</span>
              </button>
              <div className="bg-black w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                <ArrowRight size={20} className="text-white" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerFive;
