import React, { useState } from "react";
import { View, Text } from "react-native";
import { Stage, type DemoRegistry } from "./_stage";

import FilterSortBar from "@/components/navigation/FilterSortBar";
import ProductHeader from "@/components/navigation/ProductHeader";
import FilterSheet from "@/components/navigation/FilterSheet";

function FilterSortBarDemo() {
  return (
    <Stage>
      <FilterSortBar
        onSortPress={() => {}}
        onCategoryPress={() => {}}
        onFilterPress={() => {}}
        resultCount={1284}
      />
    </Stage>
  );
}

function ProductHeaderDemo() {
  const [isWishlisted, setIsWishlisted] = useState(true);
  return (
    <Stage>
      <View className="flex-1">
        <ProductHeader
          onBack={() => {}}
          onSearch={() => {}}
          onWishlist={() => setIsWishlisted((v) => !v)}
          onCart={() => {}}
          onShare={() => {}}
          isWishlisted={isWishlisted}
          cartCount={3}
        />
      </View>
    </Stage>
  );
}

function FilterSheetDemo() {
  const [visible, setVisible] = useState(true);
  return (
    <Stage center>
      <Text className="text-[14px] text-neutral-500">Filter bottom sheet</Text>
      <FilterSheet visible={visible} onClose={() => setVisible(false)} />
    </Stage>
  );
}

export const navigationRegistry: DemoRegistry = {
  "navigation/FilterSortBar": () => <FilterSortBarDemo />,
  "navigation/ProductHeader": () => <ProductHeaderDemo />,
  "navigation/FilterSheet": () => <FilterSheetDemo />,
};
