import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Image } from 'expo-image';

interface CategoryItem {
  id: string;
  name: string;
  image: string;
}

interface CategoryCirclesProps {
  categories: CategoryItem[];
  onCategoryPress: (id: string) => void;
}

export default function CategoryCircles({
  categories,
  onCategoryPress,
}: CategoryCirclesProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="px-4"
    >
      {categories.map((category) => (
        <Pressable
          key={category.id}
          onPress={() => onCategoryPress(category.id)}
          className="mr-3 w-[70px] items-center"
        >
          <Image
            source={{ uri: category.image }}
            style={{ width: 60, height: 60 }}
            className="rounded-full"
            contentFit="cover"
          />
          <Text
            className="mt-1 text-center text-[11px] text-[#4A4A4A]"
            numberOfLines={2}
          >
            {category.name}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
