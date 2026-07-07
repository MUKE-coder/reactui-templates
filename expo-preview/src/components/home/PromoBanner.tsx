import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { colors } from '@/lib/theme';

interface PromoBannerProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge?: string;
  ctaText: string;
  onPress?: () => void;
}

export default function PromoBanner({
  title,
  subtitle,
  description,
  image,
  badge,
  ctaText,
  onPress,
}: PromoBannerProps) {
  return (
    <TouchableOpacity
      className="w-[260px] h-[160px] rounded-xl overflow-hidden mr-3"
      onPress={onPress}
      accessibilityLabel={`${title} promotion`}
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: image }}
        style={{ width: '100%', height: '100%', position: 'absolute' }}
        contentFit="cover"
      />
      <View
        className="flex-1 justify-end p-4"
        style={{ backgroundColor: 'rgba(240,78,62,0.75)' }}
      >
        {badge && (
          <View className="self-start bg-white/20 rounded-full px-2 py-0.5 mb-1">
            <Text className="text-white text-[10px] font-semibold">
              {badge}
            </Text>
          </View>
        )}
        <Text className="text-white text-[22px] font-bold">{title}</Text>
        <Text className="text-white/80 text-[12px] mt-0.5" numberOfLines={1}>
          {description}
        </Text>
        <TouchableOpacity
          className="self-start bg-white rounded-full px-4 py-1.5 mt-2"
          onPress={onPress}
          accessibilityLabel={ctaText}
        >
          <Text className="text-primary text-[12px] font-semibold">
            {ctaText}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
