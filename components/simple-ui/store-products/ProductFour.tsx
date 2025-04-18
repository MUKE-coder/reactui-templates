"use client";
import React, { useState } from "react";
import { Heart, Star, ChevronLeft, ChevronRight } from "lucide-react";

// Property type definition
type Property = {
  id: string;
  title: string;
  location: string;
  images: string[];
  price: number;
  rating: number;
  reviewCount: number;
  dates: string;
  isSuperhost?: boolean;
  isNew?: boolean;
  isFavorite?: boolean;
  badges?: string[];
};

// Sample property data
const sampleProperties: Property[] = [
  {
    id: "1",
    title: "Luxury Beachfront Villa with Infinity Pool",
    location: "Malibu, California",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
    price: 899,
    rating: 4.98,
    reviewCount: 156,
    dates: "Jun 1-6",
    isSuperhost: true,
    badges: ["Beachfront", "Luxury Stay"],
  },
  {
    id: "2",
    title: "Modern Farmhouse with Mountain Views",
    location: "Asheville, North Carolina",
    images: [
      "https://images.unsplash.com/photo-1623298317883-6b70254edf31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505692952047-1a78307da8f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
    price: 345,
    rating: 4.92,
    reviewCount: 86,
    dates: "Jul 10-15",
    isSuperhost: true,
    badges: ["Countryside", "Top Rated"],
  },
  {
    id: "3",
    title: "Minimalist Penthouse with City Skyline Views",
    location: "Chicago, Illinois",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
    price: 429,
    rating: 4.88,
    reviewCount: 104,
    dates: "Aug 20-25",
    isNew: true,
    badges: ["Design", "New Listing"],
  },
  {
    id: "4",
    title: "Rustic Cabin in the Redwoods",
    location: "Big Sur, California",
    images: [
      "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464288550599-43d5a73451b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
    price: 275,
    rating: 4.96,
    reviewCount: 132,
    dates: "Sep 5-10",
    isSuperhost: true,
    badges: ["Nature", "Unique Stay"],
  },
  {
    id: "5",
    title: "Oceanfront Cottage with Private Beach",
    location: "Monterey, California",
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
    price: 499,
    rating: 4.95,
    reviewCount: 108,
    dates: "Oct 15-20",
    isSuperhost: true,
    badges: ["Beachfront", "Rare Find"],
  },
  {
    id: "6",
    title: "Desert Retreat with Joshua Tree Views",
    location: "Joshua Tree, California",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1531873968871-0f13665983c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
    price: 325,
    rating: 4.92,
    reviewCount: 96,
    dates: "Nov 1-6",
    badges: ["Desert", "Unique Stay"],
  },
];

// Property Card Component
const PropertyCard = ({
  property,
  onFavoriteToggle,
}: {
  property: Property;
  onFavoriteToggle: (id: string) => void;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);

  const nextImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="flex flex-col">
      {/* Image carousel */}
      <div
        className="relative aspect-square rounded-xl overflow-hidden mb-3"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {property.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${property.title} - image ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Carousel navigation */}
        {showControls && property.images.length > 1 && (
          <>
            <button
              className="absolute left-3 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full bg-white/90 text-gray-800 shadow-md z-10 hover:bg-white transition-all duration-200"
              onClick={prevImage}
              aria-label="Previous image"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full bg-white/90 text-gray-800 shadow-md z-10 hover:bg-white transition-all duration-200"
              onClick={nextImage}
              aria-label="Next image"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}

        {/* Dots indicator */}
        {property.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-10">
            {property.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  index === currentImageIndex
                    ? "bg-white w-6"
                    : "bg-white/60 hover:bg-white/80 w-1.5"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle(property.id);
          }}
          className="absolute top-3 right-3 p-1.5 rounded-full z-10 transition-colors duration-200"
          aria-label="Add to favorites"
        >
          <Heart
            size={22}
            className={
              property.isFavorite
                ? "fill-red-500 text-white stroke-1"
                : "text-white stroke-1 hover:fill-white/30"
            }
          />
        </button>

        {/* Badges */}
        {property.badges && property.badges.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[70%] z-10">
            {property.badges.map((badge, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-white/90 text-gray-900 text-xs font-medium rounded-md backdrop-blur-sm"
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Property details */}
      <div className="flex justify-between items-start">
        <div className="w-full">
          <div className="flex items-center gap-1 mb-1">
            <div className="flex items-center">
              <Star className="w-3.5 h-3.5 text-gray-900 fill-gray-900" />
              <span className="ml-1 text-sm font-medium text-gray-900">
                {property.rating}
              </span>
            </div>
            <span className="text-gray-500">·</span>
            <span className="text-sm text-gray-500">
              {property.reviewCount} reviews
            </span>
            {property.isSuperhost && (
              <>
                <span className="text-gray-500">·</span>
                <span className="text-sm font-medium text-gray-900">
                  Superhost
                </span>
              </>
            )}
          </div>
          <h3 className="text-base font-medium text-gray-900 line-clamp-1">
            {property.title}
          </h3>
          <p className="text-sm text-gray-500">{property.location}</p>
          <p className="text-sm text-gray-500">{property.dates}</p>

          {/* Price */}
          <div className="mt-2">
            <span className="font-bold text-gray-900">${property.price} </span>
            <span className="text-gray-900">night</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
const ProductFour = () => {
  const [properties, setProperties] = useState(sampleProperties);

  // Toggle property as favorite
  const toggleFavorite = (id: string) => {
    setProperties(
      properties.map((p) =>
        p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
      )
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          <span className="relative inline-block">
            Featured Properties
            <span className="absolute -bottom-1 left-0 right-0 h-1 bg-blue-500 rounded-full"></span>
          </span>
        </h2>
        <p className="text-gray-600">
          Discover unique homes for your next getaway
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onFavoriteToggle={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductFour;
