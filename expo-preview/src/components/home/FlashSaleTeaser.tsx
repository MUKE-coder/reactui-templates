import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import CountdownTimer from '@/components/ui/CountdownTimer';
import SectionHeader from './SectionHeader';

interface FlashSaleProduct {
  id: string;
  name: string;
  image: string;
  flashSalePrice: number;
  mrpPrice: number;
  flashDiscountPercent: number;
}

interface FlashSaleTeaserProps {
  endTime: Date;
  products: FlashSaleProduct[];
  onViewAll: () => void;
  onProductPress: (id: string) => void;
}

export default function FlashSaleTeaser({
  endTime,
  products,
  onViewAll,
  onProductPress,
}: FlashSaleTeaserProps) {
  return (
    <View>
      <SectionHeader
        title="Flash Sale"
        actionLabel="View all"
        onAction={onViewAll}
        rightElement={
          <View className="flex-row items-center gap-2">
            <CountdownTimer endTime={endTime} />
            <Pressable onPress={onViewAll} hitSlop={8}>
              <Text className="text-[13px] font-semibold text-black">
                View all
              </Text>
            </Pressable>
          </View>
        }
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-4"
      >
        {products.map((product) => (
          <Pressable
            key={product.id}
            onPress={() => onProductPress(product.id)}
            className="mr-3 w-[140px] overflow-hidden rounded-[12px]"
          >
            <Image
              source={{ uri: product.image }}
              style={{ aspectRatio: 3 / 4, width: '100%' }}
              contentFit="cover"
            />

            {/* Price bar */}
            <View className="flex-row items-center bg-[#FFC300] px-2 py-1">
              <Text className="text-[14px] font-bold text-black">
                ${product.flashSalePrice}
              </Text>
              <Text className="ml-1 text-[12px] text-[#999999] line-through">
                ${product.mrpPrice}
              </Text>
              <View className="ml-auto rounded-sm bg-[#FF3B00] px-1">
                <Text className="text-[11px] text-white">
                  -{product.flashDiscountPercent}%
                </Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
