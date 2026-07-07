import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { Image } from 'expo-image';

interface ProductCardHorizontalProps {
  image: string;
  name: string;
  size?: string;
  color?: string;
  price: number;
  qty?: number;
  onPress?: () => void;
}

export default function ProductCardHorizontal({
  image,
  name,
  size,
  color,
  price,
  qty,
  onPress,
}: ProductCardHorizontalProps) {
  const meta = [size ? `Size: ${size}` : null, color ? `Color: ${color}` : null]
    .filter(Boolean)
    .join(' \u00B7 ');

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole="button"
      accessibilityLabel={name}
      className="flex-row items-center gap-3 py-3"
      style={({ pressed }: { pressed: boolean }): ViewStyle => ({
        opacity: pressed && onPress ? 0.9 : 1,
      })}
    >
      {/* Thumbnail */}
      <View className="w-[90px] h-[90px] rounded-lg overflow-hidden bg-[#F5F5F5]">
        <Image
          source={{ uri: image }}
          contentFit="cover"
          className="w-full h-full"
          placeholder={{ blurhash: 'L6PZfSi_.AyE_3t7t7R**0o#DgR4' }}
          transition={200}
        />
      </View>

      {/* Info column */}
      <View className="flex-1 justify-center">
        <Text
          className="text-[14px] font-semibold text-[#1A1A1A]"
          numberOfLines={2}
        >
          {name}
        </Text>

        {meta ? (
          <Text className="text-[12px] text-[#888888] mt-0.5">
            {meta}
          </Text>
        ) : null}

        <Text className="text-[16px] font-bold text-[#1A1A1A] mt-1">
          {'$'}{price.toLocaleString('en-US')}
        </Text>

        {qty != null ? (
          <Text className="text-[12px] text-[#888888] mt-0.5">
            Qty: {qty}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}
