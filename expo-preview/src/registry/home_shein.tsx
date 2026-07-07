import React, { useState } from "react";
import { View, Text } from "react-native";
import { Stage, type DemoRegistry } from "./_stage";

import CouponCard from "@/components/home/CouponCard";
import HeroBanner from "@/components/home/HeroBanner";
import CategoryCircles from "@/components/home/CategoryCircles";
import GenderToggle from "@/components/home/GenderToggle";
import ServiceBadgesRow from "@/components/home/ServiceBadgesRow";
import ProfileHeader from "@/components/home/ProfileHeader";
import FlashSaleTeaser from "@/components/home/FlashSaleTeaser";

function GenderToggleDemo() {
  const [selected, setSelected] = useState<"men" | "women">("women");
  return (
    <Stage center>
      <GenderToggle selected={selected} onToggle={setSelected} />
    </Stage>
  );
}

export const homeSheinRegistry: DemoRegistry = {
  "home/CouponCard": () => (
    <Stage center>
      <CouponCard
        discount="15% OFF"
        code="SAVE15"
        minSpend="Min. spend $999"
        note="On your first order"
        onCopy={() => {}}
      />
    </Stage>
  ),
  "home/HeroBanner": () => (
    <Stage>
      <HeroBanner
        banners={[
          {
            id: "b1",
            title: "Summer Sale",
            subtitle: "Up to 70% off",
            image: "https://picsum.photos/seed/hero1/600/300",
            cta: "Shop now",
            bgColor: "#111111",
          },
          {
            id: "b2",
            title: "New Arrivals",
            subtitle: "Fresh styles daily",
            image: "https://picsum.photos/seed/hero2/600/300",
            cta: "Explore",
            bgColor: "#1F2937",
          },
        ]}
        onBannerPress={() => {}}
      />
    </Stage>
  ),
  "home/CategoryCircles": () => (
    <Stage>
      <CategoryCircles
        categories={[
          { id: "c1", name: "Women", image: "https://picsum.photos/seed/cat1/120/120" },
          { id: "c2", name: "Men", image: "https://picsum.photos/seed/cat2/120/120" },
          { id: "c3", name: "Kids", image: "https://picsum.photos/seed/cat3/120/120" },
          { id: "c4", name: "Beauty", image: "https://picsum.photos/seed/cat4/120/120" },
          { id: "c5", name: "Home", image: "https://picsum.photos/seed/cat5/120/120" },
        ]}
        onCategoryPress={() => {}}
      />
    </Stage>
  ),
  "home/GenderToggle": () => <GenderToggleDemo />,
  "home/ServiceBadgesRow": () => (
    <Stage>
      <ServiceBadgesRow />
    </Stage>
  ),
  "home/ProfileHeader": () => (
    <Stage>
      <ProfileHeader
        name="Kwame Asante"
        avatar="https://i.pravatar.cc/150?img=12"
        onWishlistPress={() => {}}
        onNotificationPress={() => {}}
      />
    </Stage>
  ),
  "home/FlashSaleTeaser": () => (
    <Stage>
      <FlashSaleTeaser
        endTime={new Date(Date.now() + 2 * 60 * 60 * 1000)}
        products={[
          {
            id: "p1",
            name: "Floral Dress",
            image: "https://picsum.photos/seed/flash1/240/320",
            flashSalePrice: 799,
            mrpPrice: 1999,
            flashDiscountPercent: 60,
          },
          {
            id: "p2",
            name: "Denim Jacket",
            image: "https://picsum.photos/seed/flash2/240/320",
            flashSalePrice: 1299,
            mrpPrice: 2999,
            flashDiscountPercent: 57,
          },
          {
            id: "p3",
            name: "Sneakers",
            image: "https://picsum.photos/seed/flash3/240/320",
            flashSalePrice: 1499,
            mrpPrice: 3499,
            flashDiscountPercent: 57,
          },
        ]}
        onViewAll={() => {}}
        onProductPress={() => {}}
      />
    </Stage>
  ),
};
