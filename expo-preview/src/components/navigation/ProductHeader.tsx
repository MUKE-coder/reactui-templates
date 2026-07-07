import React from 'react';
import { View, Text, Pressable, type ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProductHeaderProps {
  onBack: () => void;
  onSearch: () => void;
  onWishlist: () => void;
  onCart: () => void;
  onShare: () => void;
  isWishlisted: boolean;
  cartCount: number;
}

function IconButton({
  icon,
  onPress,
  label,
  color = '#1A1A1A',
  children,
}: {
  icon: string;
  onPress: () => void;
  label: string;
  color?: string;
  children?: React.ReactNode;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      className="w-[36px] h-[36px] rounded-full bg-white items-center justify-center"
      style={({ pressed }: { pressed: boolean }): ViewStyle => ({
        opacity: pressed ? 0.7 : 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.12,
        shadowRadius: 3,
        elevation: 3,
      })}
    >
      <Ionicons
        name={icon as keyof typeof Ionicons.glyphMap}
        size={20}
        color={color}
      />
      {children}
    </Pressable>
  );
}

export default function ProductHeader({
  onBack,
  onSearch,
  onWishlist,
  onCart,
  onShare,
  isWishlisted,
  cartCount,
}: ProductHeaderProps) {
  return (
    <View className="absolute top-0 left-0 right-0 z-10 flex-row items-center justify-between px-4 pt-2 pb-2 bg-white/80">
      {/* Left: back */}
      <IconButton icon="arrow-back" onPress={onBack} label="Go back" />

      {/* Right: actions */}
      <View className="flex-row items-center gap-2">
        <IconButton icon="search-outline" onPress={onSearch} label="Search" />

        <IconButton
          icon={isWishlisted ? 'heart' : 'heart-outline'}
          onPress={onWishlist}
          label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          color={isWishlisted ? '#EE1C24' : '#1A1A1A'}
        />

        <IconButton icon="cart-outline" onPress={onCart} label="Cart">
          {cartCount > 0 ? (
            <View className="absolute -top-1 -right-1 min-w-[16px] h-[16px] bg-[#EE1C24] rounded-full items-center justify-center px-0.5">
              <Text className="text-[9px] font-bold text-white">
                {cartCount > 99 ? '99+' : cartCount}
              </Text>
            </View>
          ) : null}
        </IconButton>

        <IconButton icon="share-outline" onPress={onShare} label="Share" />
      </View>
    </View>
  );
}
