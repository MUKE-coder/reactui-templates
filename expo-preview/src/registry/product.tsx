import React, { useState } from "react";
import { View, Text } from "react-native";
import { Stage, type DemoRegistry } from "./_stage";

import ProductCard from "@/components/product/ProductCard";
import ProductCardList from "@/components/product/ProductCardList";
import ProductGallery from "@/components/product/ProductGallery";

export const productRegistry: DemoRegistry = {
  "product/ProductCard": () => (
    <Stage>
      <View className="flex-row flex-wrap gap-3">
        <ProductCard
          id="prod-1"
          name="Wireless Noise-Cancelling Headphones"
          price={129.99}
          rating={4.5}
          reviewCount={218}
          image="https://picsum.photos/seed/prod1/400/400"
          discount={20}
        />
        <ProductCard
          id="prod-2"
          name="Minimalist Leather Backpack"
          price={89.0}
          rating={4.2}
          reviewCount={96}
          image="https://picsum.photos/seed/prod2/400/400"
        />
      </View>
    </Stage>
  ),
  "product/ProductCardList": () => (
    <Stage>
      <ProductCardList
        id="prod-3"
        name="Smart Fitness Watch Series 6"
        category="Wearables"
        price={199.99}
        image="https://picsum.photos/seed/prod3/400/400"
      />
      <ProductCardList
        id="prod-4"
        name="Ceramic Pour-Over Coffee Set"
        category="Kitchen"
        price={45.5}
        image="https://picsum.photos/seed/prod4/400/400"
        rightElement={
          <Text className="text-[12px] font-semibold text-primary">In stock</Text>
        }
      />
    </Stage>
  ),
  "product/ProductGallery": () => (
    <Stage>
      <ProductGallery
        images={[
          "https://picsum.photos/seed/prod5/400/400",
          "https://picsum.photos/seed/prod6/400/400",
          "https://picsum.photos/seed/prod7/400/400",
          "https://picsum.photos/seed/prod8/400/400",
        ]}
      />
    </Stage>
  ),
};
