import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/lib/theme';
import Button from './Button';

interface EmptyStateProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  ctaTitle?: string;
  onCtaPress?: () => void;
}

export default function EmptyState({
  icon,
  title,
  subtitle,
  ctaTitle,
  onCtaPress,
}: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center px-8">
      <View className="w-20 h-20 rounded-full bg-primary-light items-center justify-center mb-4">
        <Ionicons name={icon} size={36} color={colors.primary.DEFAULT} />
      </View>
      <Text className="text-[18px] font-semibold text-neutral-900 text-center mb-2">
        {title}
      </Text>
      <Text className="text-[14px] text-neutral-500 text-center mb-6">
        {subtitle}
      </Text>
      {ctaTitle && onCtaPress && (
        <Button title={ctaTitle} onPress={onCtaPress} fullWidth={false} />
      )}
    </View>
  );
}
