"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const carouselSlides = [
  {
    id: 1,
    title: "Father's Day gifts he'll love",
    image: "/amazon/2.jpg",
    link: "/fathers-day",
  },
  {
    id: 2,
    title: "Fashion finds Under 50",
    image: "/amazon/3.jpg",
    link: "/fashion",
  },
  {
    id: 3,
    title: "Kitchen Essentials",
    image: "/amazon/4.jpg",
    link: "/back-to-school",
  },
  {
    id: 4,
    title: "Toys for little ones",
    image: "/amazon/1.jpg",
    link: "/back-to-school",
  },
];

const departmentCategories = [
  {
    title: "Get your game on",
    image: "/amazon/img-5.avif?height=200&width=300",
    link: "/gaming",
    linkText: "Shop gaming",
  },
  {
    title: "Shop for your home essentials",
    subcategories: [
      {
        name: "Cleaning Tools",
        image: "/amazon/img-1.avif",
      },
      { name: "Home Storage", image: "/amazon/img-2.avif" },
      { name: "Home Decor", image: "/amazon/img-3.avif" },
      { name: "Bedding", image: "/amazon/img-4.avif" },
    ],
    link: "/home",
    linkText: "Discover more in Home",
  },
  {
    title: "Top categories in Kitchen appliances",
    mainImage: "/amazon/img-7.avif?height=150&width=200",
    mainLabel: "Cooker",
    subcategories: [
      { name: "Coffee", image: "/amazon/img-5.avif" },
      { name: "Pots and...", image: "/amazon/img-6.avif" },
      { name: "Kettles", image: "/amazon/img-7.avif" },
    ],
    link: "/kitchen",
    linkText: "Explore all products in Kitchen",
  },
  {
    title: "Shop Fashion for less",
    subcategories: [
      {
        name: "Jeans under $50",
        image: "/amazon/img-1.avif",
      },
      {
        name: "Tops under $25",
        image: "/amazon/img-2.avif",
      },
      {
        name: "Dresses under $30",
        image: "/amazon/img-3.avif",
      },
      {
        name: "Shoes under $50",
        image: "/amazon/img-4.avif",
      },
    ],
    link: "/fashion",
    linkText: "See all deals",
  },
];

export default function BannerEight() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full">
      {/* Carousel Section */}
      <div className="relative w-full h-[400px] overflow-hidden">
        {carouselSlides.map((slide, index) => (
          <Link
            key={slide.id}
            href={slide.link}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentSlide
                ? "translate-x-0"
                : index < currentSlide
                ? "-translate-x-full"
                : "translate-x-full"
            }`}
          >
            <div className="relative w-full h-full">
              <Image
                src={slide.image || "/amazon/img-1.avif"}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          </Link>
        ))}

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 text-gray-800 h-12 w-12 rounded-sm shadow-md z-10"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 text-gray-800 h-12 w-12 rounded-sm shadow-md z-10"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Overlapping Department Categories */}
      <div className="relative -mt-20 z-20 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {departmentCategories.map((category, index) => (
              <Card
                key={index}
                className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
                    {category.title}
                  </h3>

                  {/* Gaming Category - Single Large Image */}
                  {index === 0 && (
                    <div className="space-y-3">
                      <div className="relative h-48 rounded-lg overflow-hidden">
                        <Image
                          src={category.image || "/amazon/img-1.avif"}
                          alt={category.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <Link
                        href={category.link}
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium"
                      >
                        {category.linkText}
                      </Link>
                    </div>
                  )}

                  {/* Home Essentials - 2x2 Grid */}
                  {index === 1 && category.subcategories && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        {category.subcategories.map((sub, subIndex) => (
                          <div key={subIndex} className="text-center">
                            <div className="relative h-20 rounded-md overflow-hidden mb-1">
                              <Image
                                src={sub.image || "/amazon/img-1.avif"}
                                alt={sub.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <p className="text-xs text-gray-700 font-medium">
                              {sub.name}
                            </p>
                          </div>
                        ))}
                      </div>
                      <Link
                        href={category.link}
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium"
                      >
                        {category.linkText}
                      </Link>
                    </div>
                  )}

                  {/* Kitchen Appliances - Main + 3 Small */}
                  {index === 2 && (
                    <div className="space-y-3">
                      <div className="relative h-32 rounded-lg overflow-hidden mb-2">
                        <Image
                          src={category.mainImage! || "/amazon/img-1.avif"}
                          alt="Kitchen appliance"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-sm font-medium text-gray-800 mb-2">
                        {category.mainLabel}
                      </p>

                      <div className="grid grid-cols-3 gap-1">
                        {category.subcategories?.map((sub, subIndex) => (
                          <div key={subIndex} className="text-center">
                            <div className="relative h-16 rounded-md overflow-hidden mb-1">
                              <Image
                                src={sub.image || "/amazon/img-1.avif"}
                                alt={sub.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <p className="text-xs text-gray-700">{sub.name}</p>
                          </div>
                        ))}
                      </div>

                      <Link
                        href={category.link}
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium"
                      >
                        {category.linkText}
                      </Link>
                    </div>
                  )}

                  {/* Fashion - 2x2 Grid */}
                  {index === 3 && category.subcategories && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        {category.subcategories.map((sub, subIndex) => (
                          <div key={subIndex} className="text-center">
                            <div className="relative h-20 rounded-md overflow-hidden mb-1">
                              <Image
                                src={sub.image || "/amazon/img-1.avif"}
                                alt={sub.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <p className="text-xs text-gray-700 font-medium">
                              {sub.name}
                            </p>
                          </div>
                        ))}
                      </div>
                      <Link
                        href={category.link}
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium"
                      >
                        {category.linkText}
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
