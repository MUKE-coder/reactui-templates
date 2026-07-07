import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Image } from 'expo-image';

interface ColorVariantSelectorProps {
  images: { [color: string]: string[] };
  availableColors: string[];
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

export default function ColorVariantSelector({
  images,
  availableColors,
  selectedColor,
  onSelectColor,
}: ColorVariantSelectorProps) {
  return (
    <View className="py-3">
      {/* Label */}
      <Text className="text-[14px] font-semibold text-[#1A1A1A] mb-2 px-4">
        Color :{' '}
        <Text className="font-normal text-[#4A4A4A]">{selectedColor}</Text>
        <Text className="font-normal text-[#888888]">
          {' '}&middot; Available Color: {availableColors.length}
        </Text>
      </Text>

      {/* Thumbnail row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-4 gap-2"
      >
        {availableColors.map((color) => {
          const thumbUrl = images[color]?.[0] ?? '';
          const isSelected = color === selectedColor;

          return (
            <Pressable
              key={color}
              onPress={() => onSelectColor(color)}
              accessibilityLabel={`Select color ${color}`}
              accessibilityRole="button"
              className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                isSelected ? 'border-black' : 'border-[#D1D1D1]'
              }`}
            >
              <Image
                source={{ uri: thumbUrl }}
                contentFit="cover"
                className="w-full h-full"
                placeholder={{ blurhash: 'L6PZfSi_.AyE_3t7t7R**0o#DgR4' }}
                transition={150}
              />
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
