import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/lib/theme';

interface CategoryIconProps {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: (id: string) => void;
}

export default function CategoryIcon({
  id,
  name,
  icon,
  onPress,
}: CategoryIconProps) {
  return (
    <TouchableOpacity
      className="items-center mr-4"
      onPress={() => onPress(id)}
      accessibilityLabel={`Category: ${name}`}
    >
      <View className="w-12 h-12 rounded-full bg-primary-light items-center justify-center mb-1">
        <Ionicons name={icon} size={24} color={colors.primary.DEFAULT} />
      </View>
      <Text className="text-[12px] text-neutral-700 text-center" numberOfLines={1}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}
