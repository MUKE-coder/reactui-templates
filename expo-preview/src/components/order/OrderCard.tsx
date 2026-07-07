import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import Badge from '@/components/ui/Badge';

interface OrderCardProps {
  productName: string;
  productImage: string;
  category?: string;
  qty: number;
  price: number;
  badgeLabel: string;
  badgeVariant?: 'red' | 'green' | 'gray' | 'light';
  onBadgePress?: () => void;
  onPress?: () => void;
}

export default function OrderCard({
  productName,
  productImage,
  category,
  qty,
  price,
  badgeLabel,
  badgeVariant = 'red',
  onBadgePress,
  onPress,
}: OrderCardProps) {
  return (
    <TouchableOpacity
      className="flex-row items-center py-3"
      onPress={onPress}
      accessibilityLabel={`Order: ${productName}`}
    >
      <Image
        source={{ uri: productImage }}
        style={{ width: 80, height: 80, borderRadius: 8 }}
        contentFit="cover"
        placeholder={{ blurhash: 'LKO2?U%2Tw=w]~RBVZRi};RPxuwH' }}
      />
      <View className="flex-1 ml-3">
        <Text
          className="text-[14px] font-semibold text-neutral-900"
          numberOfLines={1}
        >
          {productName}
        </Text>
        {category && (
          <Text className="text-[12px] text-neutral-500 mt-0.5">
            {category} | Qty: {qty}
          </Text>
        )}
        <Text className="text-[16px] font-bold text-neutral-900 mt-1">
          ${price.toFixed(2)}
        </Text>
      </View>
      <Badge
        label={badgeLabel}
        variant={badgeVariant}
        onPress={onBadgePress}
      />
    </TouchableOpacity>
  );
}
