import React from 'react';
import { ActivityIndicator, Pressable, Text, type ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AddToCartButtonProps {
  onPress: () => void;
  variant?: 'icon' | 'full';
  loading?: boolean;
}

export default function AddToCartButton({
  onPress,
  variant = 'full',
  loading = false,
}: AddToCartButtonProps) {
  if (variant === 'icon') {
    return (
      <Pressable
        onPress={onPress}
        disabled={loading}
        accessibilityLabel="Add to cart"
        accessibilityRole="button"
        className="w-8 h-8 rounded-full bg-white border border-[#D1D1D1] items-center justify-center"
        style={({ pressed }: { pressed: boolean }): ViewStyle => ({
          opacity: pressed ? 0.8 : 1,
        })}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#1A1A1A" />
        ) : (
          <Ionicons name="cart-outline" size={16} color="#1A1A1A" />
        )}
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      accessibilityLabel="Add to bag"
      accessibilityRole="button"
      className={`w-full h-[52px] bg-primary rounded-lg items-center justify-center ${
        loading ? 'opacity-70' : ''
      }`}
      style={({ pressed }: { pressed: boolean }): ViewStyle => ({
        opacity: pressed && !loading ? 0.9 : loading ? 0.7 : 1,
      })}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        <Text className="text-white text-[16px] font-semibold">
          Add to Bag
        </Text>
      )}
    </Pressable>
  );
}
