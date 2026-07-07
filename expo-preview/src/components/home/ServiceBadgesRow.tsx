import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const BADGES: Array<{
  icon: keyof typeof Ionicons.glyphMap;
  tKey: string;
  fallback: string;
}> = [
  {
    icon: 'checkmark-circle-outline',
    tKey: 'home.badge_original',
    fallback: '100% Original Products',
  },
  {
    icon: 'car-outline',
    tKey: 'home.badge_shipping',
    fallback: 'Free Shipping on All Orders',
  },
  {
    icon: 'return-down-back-outline',
    tKey: 'home.badge_returns',
    fallback: 'Easy Returns And Refund',
  },
];

export default function ServiceBadgesRow() {
  const { t } = useTranslation();

  return (
    <View className="mx-4 flex-row justify-between py-3">
      {BADGES.map((badge) => (
        <View key={badge.tKey} className="flex-1 items-center">
          <Ionicons name={badge.icon} size={20} color="black" />
          <Text
            className="mt-1 text-center text-[10px] text-[#4A4A4A]"
            numberOfLines={2}
          >
            {t(badge.tKey, badge.fallback)}
          </Text>
        </View>
      ))}
    </View>
  );
}
