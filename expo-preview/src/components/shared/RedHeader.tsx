import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors } from '@/lib/theme';
import { useTranslation } from 'react-i18next';

interface RedHeaderProps {
  location?: string;
  onNotificationPress?: () => void;
  onSearchPress?: () => void;
  onFilterPress?: () => void;
  notificationCount?: number;
}

export default function RedHeader({
  location = 'New York, USA',
  onNotificationPress,
  onSearchPress,
  onFilterPress,
  notificationCount = 0,
}: RedHeaderProps) {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  return (
    <View
      className="bg-primary px-4 pb-6"
      style={{ paddingTop: insets.top + 8 }}
    >
      <View className="flex-row items-center justify-between mb-4">
        <View>
          <Text className="text-white/70 text-[12px] font-semibold">
            {t('home.location')}
          </Text>
          <View className="flex-row items-center mt-1">
            <Ionicons name="location" size={16} color="#FFFFFF" />
            <Text className="text-white text-[14px] font-semibold ml-1">
              {location}
            </Text>
            <Ionicons name="chevron-down" size={14} color="#FFFFFF" style={{ marginLeft: 4 }} />
          </View>
        </View>
        <TouchableOpacity
          onPress={onNotificationPress}
          accessibilityLabel="Notifications"
          className="relative"
        >
          <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
          {notificationCount > 0 && (
            <View className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white items-center justify-center">
              <Text className="text-[10px] font-bold text-primary">
                {notificationCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={onSearchPress ?? (() => router.push('/search'))}
        className="flex-row items-center bg-white rounded-full h-[46px] px-4"
        accessibilityLabel="Search products"
      >
        <Ionicons name="search" size={20} color={colors.neutral[500]} />
        <Text className="flex-1 text-[14px] text-neutral-500 ml-3">
          {t('home.search_placeholder')}
        </Text>
        <TouchableOpacity
          onPress={onFilterPress}
          accessibilityLabel="Filter"
        >
          <Ionicons name="options-outline" size={20} color={colors.neutral[500]} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}
