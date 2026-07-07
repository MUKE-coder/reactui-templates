import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

interface ProfileHeaderProps {
  name: string;
  avatar?: string;
  onWishlistPress: () => void;
  onNotificationPress: () => void;
}

export default function ProfileHeader({
  name,
  avatar,
  onWishlistPress,
  onNotificationPress,
}: ProfileHeaderProps) {
  return (
    <View className="flex-row items-center px-4 py-3">
      {avatar ? (
        <Image
          source={{ uri: avatar }}
          style={{ width: 32, height: 32 }}
          className="rounded-full"
          contentFit="cover"
        />
      ) : (
        <View className="h-[32px] w-[32px] items-center justify-center rounded-full bg-[#F5F5F5]">
          <Ionicons name="person-outline" size={18} color="#888888" />
        </View>
      )}

      <View className="ml-2">
        <Text className="text-[12px] text-[#888888]">Hi, Welcome</Text>
        <Text className="text-[15px] font-semibold text-black">{name}</Text>
      </View>

      <View className="ml-auto flex-row gap-3">
        <Pressable onPress={onWishlistPress} hitSlop={8}>
          <Ionicons name="heart-outline" size={24} color="black" />
        </Pressable>
        <Pressable onPress={onNotificationPress} hitSlop={8}>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
}
