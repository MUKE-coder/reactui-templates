import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';

interface ProductCardListProps {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  rightElement?: React.ReactNode;
}

export default function ProductCardList({
  id,
  name,
  category,
  price,
  image,
  rightElement,
}: ProductCardListProps) {
  return (
    <TouchableOpacity
      className="flex-row items-center py-3"
      onPress={() => router.push(`/product/${id}`)}
      accessibilityLabel={`${name}, $${price}`}
    >
      <Image
        source={{ uri: image }}
        style={{ width: 80, height: 80, borderRadius: 8 }}
        contentFit="cover"
        placeholder={{ blurhash: 'LKO2?U%2Tw=w]~RBVZRi};RPxuwH' }}
      />
      <View className="flex-1 ml-3">
        <Text
          className="text-[14px] font-semibold text-neutral-900"
          numberOfLines={1}
        >
          {name}
        </Text>
        <Text className="text-[12px] text-neutral-500 mt-0.5">
          {category}
        </Text>
        <Text className="text-[16px] font-bold text-neutral-900 mt-1">
          ${price.toFixed(2)}
        </Text>
      </View>
      {rightElement && <View className="ml-2">{rightElement}</View>}
    </TouchableOpacity>
  );
}
