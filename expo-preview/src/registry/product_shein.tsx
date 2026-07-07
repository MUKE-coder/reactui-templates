import React, { useState } from "react";
import { View, Text } from "react-native";
import { Stage, type DemoRegistry } from "./_stage";

import AddToCartButton from "@/components/product/AddToCartButton";
import ColorVariantSelector from "@/components/product/ColorVariantSelector";
import ProductCardHorizontal from "@/components/product/ProductCardHorizontal";
import SizeSelector from "@/components/product/SizeSelector";

function ColorVariantSelectorDemo() {
  const [selectedColor, setSelectedColor] = useState("Black");
  const images: { [color: string]: string[] } = {
    Black: ["https://picsum.photos/seed/ph1/400/400"],
    Beige: ["https://picsum.photos/seed/ph2/400/400"],
    Olive: ["https://picsum.photos/seed/ph3/400/400"],
    Navy: ["https://picsum.photos/seed/ph4/400/400"],
  };
  return (
    <Stage>
      <ColorVariantSelector
        images={images}
        availableColors={["Black", "Beige", "Olive", "Navy"]}
        selectedColor={selectedColor}
        onSelectColor={setSelectedColor}
      />
    </Stage>
  );
}

function SizeSelectorDemo() {
  const [selectedSize, setSelectedSize] = useState("M");
  return (
    <Stage>
      <SizeSelector
        sizes={["XS", "S", "M", "L", "XL", "XXL"]}
        selectedSize={selectedSize}
        onSelectSize={setSelectedSize}
        disabled={["XS", "XXL"]}
      />
    </Stage>
  );
}

export const productSheinRegistry: DemoRegistry = {
  "product/AddToCartButton": () => (
    <Stage>
      <AddToCartButton variant="full" onPress={() => {}} />
      <View className="flex-row items-center gap-4">
        <AddToCartButton variant="icon" onPress={() => {}} />
        <Text className="text-[13px] text-[#888888]">Icon variant</Text>
      </View>
      <AddToCartButton variant="full" loading onPress={() => {}} />
    </Stage>
  ),
  "product/ColorVariantSelector": () => <ColorVariantSelectorDemo />,
  "product/ProductCardHorizontal": () => (
    <Stage>
      <ProductCardHorizontal
        image="https://picsum.photos/seed/ph1/400/400"
        name="Oversized Cotton Blend Hoodie"
        size="M"
        color="Black"
        price={1499}
        qty={1}
        onPress={() => {}}
      />
      <ProductCardHorizontal
        image="https://picsum.photos/seed/ph2/400/400"
        name="High-Waist Wide Leg Trousers"
        size="L"
        color="Beige"
        price={2299}
        qty={2}
      />
    </Stage>
  ),
  "product/SizeSelector": () => <SizeSelectorDemo />,
};
