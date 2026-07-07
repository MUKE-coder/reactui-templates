import React, { useState } from "react";
import { View, Text } from "react-native";
import { Stage, type DemoRegistry } from "./_stage";

import CategoryIcon from "@/components/home/CategoryIcon";
import FlashSaleTimer from "@/components/home/FlashSaleTimer";
import PromoBanner from "@/components/home/PromoBanner";
import SectionHeader from "@/components/home/SectionHeader";

const CATEGORIES: {
  id: string;
  name: string;
  icon: React.ComponentProps<typeof CategoryIcon>["icon"];
}[] = [
  { id: "fashion", name: "Fashion", icon: "shirt-outline" },
  { id: "electronics", name: "Electronics", icon: "phone-portrait-outline" },
  { id: "home", name: "Home", icon: "home-outline" },
  { id: "beauty", name: "Beauty", icon: "sparkles-outline" },
  { id: "gifts", name: "Gifts", icon: "gift-outline" },
];

function CategoryIconDemo() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <Stage>
      <View className="flex-row flex-wrap">
        {CATEGORIES.map((c) => (
          <CategoryIcon
            key={c.id}
            id={c.id}
            name={c.name}
            icon={c.icon}
            onPress={(id) => setSelected(id)}
          />
        ))}
      </View>
      <Text className="text-[12px] text-neutral-500">
        {selected ? `Selected: ${selected}` : "Tap a category"}
      </Text>
    </Stage>
  );
}

export const homeRegistry: DemoRegistry = {
  "home/PromoBanner": () => (
    <Stage>
      <PromoBanner
        title="Mega Sale"
        subtitle="Limited time"
        description="Up to 50% off selected items"
        image="https://picsum.photos/seed/promo1/600/300"
        badge="Flash Deal"
        ctaText="Shop now"
        onPress={() => {}}
      />
    </Stage>
  ),
  "home/FlashSaleTimer": () => (
    <Stage center>
      <SectionHeader title="Flash Sale" />
      <FlashSaleTimer endTime={5 * 3600 + 42 * 60 + 18} />
    </Stage>
  ),
  "home/CategoryIcon": () => <CategoryIconDemo />,
  "home/SectionHeader": () => (
    <Stage>
      <SectionHeader title="Popular Products" onSeeAll={() => {}} />
      <SectionHeader
        title="Recommended"
        rightElement={
          <Text className="text-[14px] font-semibold text-primary">Filter</Text>
        }
      />
    </Stage>
  ),
};
