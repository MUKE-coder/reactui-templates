import React from 'react';
import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import { colors } from '@/lib/theme';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  source?: string;
  name?: string;
  size?: AvatarSize;
}

const sizeMap: Record<AvatarSize, number> = {
  xs: 28,
  sm: 36,
  md: 48,
  lg: 80,
  xl: 96,
};

const fontSizeMap: Record<AvatarSize, number> = {
  xs: 10,
  sm: 12,
  md: 16,
  lg: 28,
  xl: 32,
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function Avatar({ source, name, size = 'md' }: AvatarProps) {
  const dimension = sizeMap[size];
  const fontSize = fontSizeMap[size];

  if (source) {
    return (
      <Image
        source={{ uri: source }}
        style={{ width: dimension, height: dimension, borderRadius: 9999 }}
        placeholder={{ blurhash: 'LKO2?U%2Tw=w]~RBVZRi};RPxuwH' }}
        contentFit="cover"
        accessibilityLabel={name ?? 'Avatar'}
      />
    );
  }

  return (
    <View
      className="items-center justify-center rounded-full"
      style={{
        width: dimension,
        height: dimension,
        backgroundColor: colors.neutral[300],
      }}
    >
      <Text style={{ fontSize, fontWeight: '600', color: colors.neutral[700] }}>
        {name ? getInitials(name) : '?'}
      </Text>
    </View>
  );
}
