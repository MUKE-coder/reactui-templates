import React from 'react';
import { View, Text } from 'react-native';

interface DividerProps {
  label?: string;
}

export default function Divider({ label }: DividerProps) {
  if (label) {
    return (
      <View className="flex-row items-center my-4">
        <View className="flex-1 h-[1px] bg-neutral-300" />
        <Text className="mx-4 text-[14px] text-neutral-500">{label}</Text>
        <View className="flex-1 h-[1px] bg-neutral-300" />
      </View>
    );
  }

  return <View className="h-[1px] bg-neutral-100 my-4" />;
}
