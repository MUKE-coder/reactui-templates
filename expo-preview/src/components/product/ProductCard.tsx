import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { colors, shadows } from '@/lib/theme';
import Rating from '@/components/ui/Rating';
import { useWishlistStore } from '@/stores/wishlistStore';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  discount?: number;
}

const CARD_GAP = 12;
const CARD_WIDTH =
  (Dimensions.get('window').width - 16 * 2 - CARD_GAP) / 2;

export default function ProductCard({
  id,
  name,
  price,
  rating,
  reviewCount,
  image,
  discount,
}: ProductCardProps) {
  const toggleItem = useWishlistStore((state) => state.toggleItem);
  const isWishlisted = useWishlistStore((state) => state.isWishlisted);
  const wishlisted = isWishlisted(id);

  return (
    <TouchableOpacity
      className="bg-white rounded-xl overflow-hidden"
      style={[{ width: CARD_WIDTH }, shadows.card]}
      onPress={() => router.push(`/product/${id}`)}
      accessibilityLabel={`${name}, $${price}`}
    >
      <View className="relative">
        <Image
          source={{ uri: image }}
          style={{ width: '100%', aspectRatio: 1 }}
          contentFit="cover"
          placeholder={{ blurhash: 'LKO2?U%2Tw=w]~RBVZRi};RPxuwH' }}
        />
        <TouchableOpacity
          onPress={() => toggleItem(id)}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white items-center justify-center"
          style={shadows.sm}
          accessibilityLabel={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Ionicons
            name={wishlisted ? 'heart' : 'heart-outline'}
            size={18}
            color={wishlisted ? colors.primary.DEFAULT : colors.neutral[700]}
          />
        </TouchableOpacity>
        {typeof discount === 'number' && discount > 0 ? (
          <View className="absolute top-2 left-2 bg-primary rounded-full px-2 py-1">
            <Text className="text-white text-[10px] font-bold">
              -{discount}%
            </Text>
          </View>
        ) : null}
      </View>
      <View className="p-3">
        <Text
          className="text-[14px] font-semibold text-neutral-900 mb-1"
          numberOfLines={2}
        >
          {name}
        </Text>
        <View className="flex-row items-center mb-1">
          <Rating value={rating} size={12} />
          <Text className="text-[12px] text-neutral-500 ml-1">
            {rating}
          </Text>
        </View>
        <Text className="text-[16px] font-bold text-primary">
          ${price.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
