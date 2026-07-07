import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

interface PointsCardProps {
  balance: number;
  tier: string;
}

export default function PointsCard({ balance, tier }: PointsCardProps) {
  const { t } = useTranslation();

  return (
    <View className="bg-[#7B2FBE] rounded-[16px] p-5 mx-4">
      {/* Label */}
      <Text className="text-white text-[12px] opacity-80">
        {t('points.sheinPoints', 'SHEIN Points')}
      </Text>

      {/* Balance */}
      <Text className="text-white text-[32px] font-extrabold mt-1">
        {balance.toLocaleString('en-US')}
      </Text>

      {/* Tier badge */}
      <View className="flex-row items-center mt-2">
        <Ionicons name="star" size={16} color="#FFC300" />
        <Text className="text-white text-[14px] font-semibold ml-1">
          {tier}
        </Text>
      </View>
    </View>
  );
}
