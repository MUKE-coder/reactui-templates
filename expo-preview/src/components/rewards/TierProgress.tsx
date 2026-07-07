import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

interface TierProgressProps {
  currentTier: string;
  nextTier: string;
  progress: number; // 0-1
  pointsToNext: number;
}

export default function TierProgress({
  currentTier,
  nextTier,
  progress,
  pointsToNext,
}: TierProgressProps) {
  const { t } = useTranslation();
  const clampedProgress = Math.min(Math.max(progress, 0), 1);

  return (
    <View className="px-4 py-3">
      {/* Tier labels row */}
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-[13px] font-semibold text-black">
          {currentTier}
        </Text>
        <Text className="text-[13px] font-semibold text-[#888888]">
          {nextTier}
        </Text>
      </View>

      {/* Progress bar */}
      <View className="h-2 bg-[#F5F5F5] rounded-full overflow-hidden">
        <View
          className="h-full bg-[#7B2FBE] rounded-full"
          style={{ width: `${clampedProgress * 100}%` }}
        />
      </View>

      {/* Points to next tier */}
      <Text className="text-[12px] text-[#888888] mt-2">
        {t('points.pointsToNext', '{{points}} points to {{tier}}', {
          points: pointsToNext.toLocaleString('en-US'),
          tier: nextTier,
        })}
      </Text>
    </View>
  );
}
