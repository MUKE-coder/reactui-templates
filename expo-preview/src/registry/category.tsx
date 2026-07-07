import React, { useState } from "react";
import { View, Text } from "react-native";
import { Stage, type DemoRegistry } from "./_stage";

import SubcategoryGrid from "@/components/category/SubcategoryGrid";
import SidebarMenu from "@/components/category/SidebarMenu";

const subcategoryItems = [
  { id: "sc1", name: "Smartphones", image: "https://picsum.photos/seed/cat1/200/200", section: "Electronics" },
  { id: "sc2", name: "Laptops", image: "https://picsum.photos/seed/cat2/200/200", section: "Electronics" },
  { id: "sc3", name: "Headphones", image: "https://picsum.photos/seed/cat3/200/200", section: "Electronics" },
  { id: "sc4", name: "Cameras", image: "https://picsum.photos/seed/cat4/200/200", section: "Electronics" },
  { id: "sc5", name: "Smart Watches", image: "https://picsum.photos/seed/cat5/200/200", section: "Electronics" },
  { id: "sc6", name: "Speakers", image: "https://picsum.photos/seed/cat6/200/200", section: "Electronics" },
  { id: "sc7", name: "T-Shirts", image: "https://picsum.photos/seed/cat7/200/200", section: "Fashion" },
  { id: "sc8", name: "Sneakers", image: "https://picsum.photos/seed/cat8/200/200", section: "Fashion" },
  { id: "sc9", name: "Watches", image: "https://picsum.photos/seed/cat9/200/200", section: "Fashion" },
  { id: "sc10", name: "Bags", image: "https://picsum.photos/seed/cat10/200/200", section: "Fashion" },
  { id: "sc11", name: "Cookware", image: "https://picsum.photos/seed/cat11/200/200", section: "Home & Kitchen" },
  { id: "sc12", name: "Bedding", image: "https://picsum.photos/seed/cat12/200/200", section: "Home & Kitchen" },
  { id: "sc13", name: "Lighting", image: "https://picsum.photos/seed/cat13/200/200", section: "Home & Kitchen" },
];

const sidebarItems = [
  { id: "all", name: "All" },
  { id: "electronics", name: "Electronics" },
  { id: "fashion", name: "Fashion" },
  { id: "home", name: "Home & Kitchen" },
  { id: "beauty", name: "Beauty" },
  { id: "sports", name: "Sports" },
  { id: "toys", name: "Toys" },
  { id: "grocery", name: "Grocery" },
];

function SidebarMenuDemo() {
  const [activeId, setActiveId] = useState("electronics");
  return (
    <Stage>
      <View className="flex-row flex-1 bg-white">
        <SidebarMenu
          items={sidebarItems}
          activeId={activeId}
          onSelect={setActiveId}
        />
        <View className="flex-1 items-center justify-center px-4">
          <Text className="text-[15px] font-semibold text-black">
            {sidebarItems.find((i) => i.id === activeId)?.name}
          </Text>
          <Text className="text-[12px] text-[#4A4A4A] mt-1 text-center">
            Products in this category appear here.
          </Text>
        </View>
      </View>
    </Stage>
  );
}

export const categoryRegistry: DemoRegistry = {
  "category/SubcategoryGrid": () => (
    <Stage>
      <SubcategoryGrid
        items={subcategoryItems}
        onItemPress={() => {}}
      />
    </Stage>
  ),
  "category/SidebarMenu": () => <SidebarMenuDemo />,
};
