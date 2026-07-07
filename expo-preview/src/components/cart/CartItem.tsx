import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/lib/theme';
import type { CartItem as CartItemType } from '@/stores/cartStore';

interface CartItemProps {
  item: CartItemType;
  onUpdateQty: (productId: string, qty: number) => void;
  onRemove: (productId: string) => void;
}

export default function CartItem({
  item,
  onUpdateQty,
  onRemove,
}: CartItemProps) {
  return (
    <View className="flex-row items-center py-3">
      <Image
        source={{ uri: item.image }}
        style={{ width: 80, height: 80, borderRadius: 8 }}
        contentFit="cover"
        placeholder={{ blurhash: 'LKO2?U%2Tw=w]~RBVZRi};RPxuwH' }}
      />
      <View className="flex-1 ml-3">
        <Text
          className="text-[14px] font-semibold text-neutral-900"
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text className="text-[12px] text-neutral-500 mt-0.5">
          {item.category}
        </Text>
        <Text className="text-[16px] font-bold text-neutral-900 mt-1">
          ${item.price.toFixed(2)}
        </Text>
      </View>
      <View className="items-center">
        <TouchableOpacity
          onPress={() => onRemove(item.productId)}
          className="mb-2"
          accessibilityLabel="Remove item"
        >
          <Ionicons name="trash-outline" size={18} color={colors.error} />
        </TouchableOpacity>
        <View className="flex-row items-center bg-neutral-100 rounded-full">
          <TouchableOpacity
            onPress={() =>
              item.qty > 1 && onUpdateQty(item.productId, item.qty - 1)
            }
            className="w-8 h-8 items-center justify-center"
            accessibilityLabel="Decrease quantity"
          >
            <Ionicons name="remove" size={16} color={colors.neutral[700]} />
          </TouchableOpacity>
          <Text className="text-[14px] font-semibold text-neutral-900 mx-2">
            {item.qty}
          </Text>
          <TouchableOpacity
            onPress={() => onUpdateQty(item.productId, item.qty + 1)}
            className="w-8 h-8 items-center justify-center"
            accessibilityLabel="Increase quantity"
          >
            <Ionicons name="add" size={16} color={colors.neutral[700]} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
