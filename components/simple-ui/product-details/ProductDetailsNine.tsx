"use client";
import { Calendar, Flag, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import { MapPin, Clock, Eye, Heart, TrendingUp } from "lucide-react";

interface ProductInfoProps {
  title: string;
  price: string;
  location: string;
  timePosted: string;
  views: number;
  priceHistory: string;
}
import { Shield, AlertTriangle, CreditCard, CheckCircle } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Specification {
  label: string;
  value: string;
}

interface ProductSpecsProps {
  brand: string;
  model: string;
  condition: string;
  conditionDetail: string;
  storage: string;
  storageType: string;
  damaged: string;
  damageDetail: string;
  description: string;
}

export function SafetyTips() {
  const tips = [
    {
      icon: <CreditCard className="w-5 h-5 text-orange-500" />,
      text: "Avoid paying in advance, even for delivery",
    },
    {
      icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
      text: "Meet with the seller at a safe public place",
    },
    {
      icon: <Eye className="w-5 h-5 text-blue-500" />,
      text: "Inspect the item and ensure it's exactly what you want",
    },
    {
      icon: <Shield className="w-5 h-5 text-green-500" />,
      text: "Make sure that the packed item is the one you've inspected",
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-purple-500" />,
      text: "Only pay if you're satisfied",
    },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-green-500" />
        <h3 className="font-medium text-gray-900">Safety tips</h3>
      </div>

      <ul className="space-y-3">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start gap-3">
            {tip.icon}
            <span className="text-sm text-gray-700 leading-relaxed">
              {tip.text}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

interface SellerCardProps {
  sellerName: string;
  memberSince: string;
  isOnline: boolean;
  avatar?: string;
}

export function SellerCard({
  sellerName,
  memberSince,
  isOnline,
  avatar,
}: SellerCardProps) {
  return (
    <Card className="p-4 space-y-4">
      {/* Seller Info */}
      <div className="flex items-center gap-3">
        <Avatar className="w-12 h-12">
          <AvatarImage src={avatar} alt={sellerName} />
          <AvatarFallback className="bg-green-500 text-white">
            {sellerName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-medium">{sellerName}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>Last seen {memberSince}</span>
            {isOnline && (
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-700 text-xs"
              >
                1 min
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
          <Phone className="w-4 h-4 mr-2" />
          Show contact
        </Button>
        <Button variant="outline" className="w-full">
          <MessageCircle className="w-4 h-4 mr-2" />
          Start chat
        </Button>
      </div>

      {/* Additional Actions */}
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1">
          Mark unavailable
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-red-500 border-red-200"
        >
          <Flag className="w-4 h-4 mr-1" />
          Report Abuse
        </Button>
      </div>
    </Card>
  );
}

export function ProductSpecs({
  brand,
  model,
  condition,
  conditionDetail,
  storage,
  storageType,
  damaged,
  damageDetail,
  description,
}: ProductSpecsProps) {
  const [showMore, setShowMore] = useState(false);

  const specifications: Specification[] = [
    { label: "BRAND", value: brand },
    { label: "MODEL", value: model },
    { label: "CONDITION", value: condition },
    { label: "SECOND CONDITION", value: conditionDetail },
    { label: "INTERNAL STORAGE", value: storage },
    { label: "STORAGE TYPE", value: storageType },
    { label: "DAMAGED", value: damaged },
    { label: "DAMAGE DETAIL", value: damageDetail },
  ];

  return (
    <Card className="p-6 space-y-6">
      {/* Specifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {specifications.map((spec, index) => (
          <div
            key={index}
            className="flex justify-between py-2 border-b border-gray-100 last:border-b-0"
          >
            <span className="text-sm text-gray-500 uppercase tracking-wide">
              {spec.label}
            </span>
            <span className="text-sm font-medium text-gray-900">
              {spec.value}
            </span>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="space-y-3">
        <h3 className="font-medium text-gray-900">Description</h3>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>

      {/* Show More Button */}
      <Button
        variant="ghost"
        className="w-full text-green-600 hover:text-green-700"
        onClick={() => setShowMore(!showMore)}
      >
        Show more
        <ChevronDown
          className={`w-4 h-4 ml-2 transition-transform ${
            showMore ? "rotate-180" : ""
          }`}
        />
      </Button>

      {/* Additional Details (shown when expanded) */}
      {showMore && (
        <div className="space-y-4 pt-4 border-t border-gray-200">
          <div>
            <h4 className="font-medium mb-2">Additional Information</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Includes original charger and box</li>
              <li>• All functions working perfectly</li>
              <li>• Minor scratches on back cover</li>
              <li>• Screen protector applied</li>
            </ul>
          </div>
        </div>
      )}
    </Card>
  );
}

export function ProductInfo({
  title,
  price,
  location,
  timePosted,
  views,
  priceHistory,
}: ProductInfoProps) {
  return (
    <div className="space-y-4">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>

      {/* Location and Time */}
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{timePosted}</span>
        </div>
        <div className="flex items-center gap-1">
          <Eye className="w-4 h-4" />
          <span>{views} views</span>
        </div>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <div className="text-3xl font-bold text-gray-900">{price}</div>

        {/* Price History */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium">Price History</span>
          </div>
          <div className="text-sm text-gray-600">{priceHistory}</div>
        </div>
      </div>

      {/* Request Call Back Button */}
      <Button
        variant="outline"
        className="w-full text-green-600 border-green-200 hover:bg-green-50"
      >
        Request call back
      </Button>

      {/* Save Button */}
      <Button variant="ghost" className="w-full text-gray-600">
        <Heart className="w-4 h-4 mr-2" />
        Post Ad Like This
      </Button>
    </div>
  );
}

interface ProductGalleryProps {
  images: string[];
  productTitle: string;
}

export function ProductGallery({ images, productTitle }: ProductGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <ImageWithFallback
          src={images[currentImageIndex]}
          alt={`${productTitle} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={prevImage}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={nextImage}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 bg-black/60 text-white px-2 py-1 rounded text-sm">
          {currentImageIndex + 1}/{images.length}
        </div>

        {/* Posted by watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-white/30 text-4xl font-bold transform rotate-12">
            POSTED ON JIJI
          </div>
        </div>
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                currentImageIndex === index
                  ? "border-green-500"
                  : "border-gray-200"
              }`}
            >
              <ImageWithFallback
                src={image}
                alt={`${productTitle} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
          {images.length > 5 && (
            <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-gray-200">
              <span className="text-sm text-gray-500">
                +{images.length - 5}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default function ProductDetailsNine() {
  // Product data
  const productImages = [
    "https://images.unsplash.com/photo-1588295207965-dded25c206c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW1zdW5nJTIwZ2FsYXh5JTIwc21hcnRwaG9uZSUyMHNpbHZlcnxlbnwxfHx8fDE3NTg1MzI1OTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1598327105666-5b89351aff97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9iaWxlJTIwcGhvbmUlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1ODUzMjQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1697636979311-511164585ca9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb2Rlcm4lMjBzbWFydHBob25lJTIwYmxhY2slMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1ODUzMjY2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1562831915-6524120efded?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzaWx2ZXIlMjBtZXRhbGxpYyUyMHNtYXJ0cGhvbmUlMjBkZXZpY2V8ZW58MXx8fHwxNzU4NTMyNjcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Product Gallery */}
          <div className="lg:col-span-2">
            <ProductGallery
              images={productImages}
              productTitle="Samsung Galaxy S21+ 5G 128 GB Silver"
            />
          </div>

          {/* Right Column - Product Info and Seller */}
          <div className="space-y-6">
            <ProductInfo
              title="Samsung Galaxy S21+ 5G 128 GB Silver"
              price="USh 450,000"
              location="Kampala, Central Division"
              timePosted="1 day ago"
              views={163}
              priceHistory="Market price: USh 700 K - 750 K"
            />

            <SellerCard
              sellerName="Taylor Snap"
              memberSince="19 hours ago"
              isOnline={true}
              avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            />

            <SafetyTips />
          </div>
        </div>

        {/* Product Specifications */}
        <div className="mt-8">
          <ProductSpecs
            brand="Samsung"
            model="Galaxy S21+ 5G"
            condition="Used"
            conditionDetail="No cracks"
            storage="128 GB"
            storageType="No"
            damaged="No"
            damageDetail="SECOND CONDITION"
            description="Small dot and 2 lines perfectly working strong battery and camera quality"
          />
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button className="bg-green-500 hover:bg-green-600 text-white flex-1">
            <Phone className="w-4 h-4 mr-2" />
            Show contact
          </Button>

          <Button variant="outline" className="flex-1">
            Make an offer
          </Button>
        </div>

        {/* Social Share */}
        <div className="mt-6 flex items-center gap-4">
          <span className="text-sm text-gray-500">Share this listing:</span>
          <div className="flex gap-2">
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Facebook
            </Button>
            <Button
              size="sm"
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Gmail
            </Button>
            <Button
              size="sm"
              className="bg-blue-400 hover:bg-blue-500 text-white"
            >
              Twitter
            </Button>
            <Button
              size="sm"
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              WhatsApp
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

export function ImageWithFallback(
  props: React.ImgHTMLAttributes<HTMLImageElement>
) {
  const [didError, setDidError] = useState(false);

  const handleError = () => {
    setDidError(true);
  };

  const { src, alt, style, className, ...rest } = props;

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${
        className ?? ""
      }`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img
          src={ERROR_IMG_SRC}
          alt="Error loading image"
          {...rest}
          data-original-url={src}
        />
      </div>
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      {...rest}
      onError={handleError}
    />
  );
}
