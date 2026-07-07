import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, shadows } from '@/lib/theme';

interface ScreenHeaderProps {
  title: string;
  showBack?: boolean;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightPress?: () => void;
  rightElement?: React.ReactNode;
}

export default function ScreenHeader({
  title,
  showBack = true,
  rightIcon,
  onRightPress,
  rightElement,
}: ScreenHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="bg-white flex-row items-center px-4"
      style={{ paddingTop: insets.top + 8, height: 56 + insets.top }}
    >
      {showBack ? (
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white items-center justify-center"
          style={shadows.sm}
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={20} color={colors.neutral[700]} />
        </TouchableOpacity>
      ) : (
        <View className="w-10" />
      )}
      <Text className="flex-1 text-center text-[18px] font-semibold text-neutral-900">
        {title}
      </Text>
      {rightElement ? (
        rightElement
      ) : rightIcon ? (
        <TouchableOpacity
          onPress={onRightPress}
          className="w-10 h-10 rounded-full bg-white items-center justify-center"
          style={shadows.sm}
          accessibilityLabel="Header action"
        >
          <Ionicons name={rightIcon} size={20} color={colors.neutral[700]} />
        </TouchableOpacity>
      ) : (
        <View className="w-10" />
      )}
    </View>
  );
}
