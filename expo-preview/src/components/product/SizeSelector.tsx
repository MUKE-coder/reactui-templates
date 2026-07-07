import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSelectSize: (size: string) => void;
  disabled?: string[];
}

export default function SizeSelector({
  sizes,
  selectedSize,
  onSelectSize,
  disabled = [],
}: SizeSelectorProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="px-4 gap-2 py-2"
    >
      {sizes.map((size) => {
        const isSelected = size === selectedSize;
        const isDisabled = disabled.includes(size);

        return (
          <Pressable
            key={size}
            onPress={() => {
              if (!isDisabled) onSelectSize(size);
            }}
            disabled={isDisabled}
            accessibilityLabel={`Size ${size}${isDisabled ? ', out of stock' : ''}`}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected, disabled: isDisabled }}
            className={`min-w-[44px] items-center justify-center px-4 py-2 rounded-lg relative overflow-hidden ${
              isSelected
                ? 'bg-primary'
                : 'bg-[#F5F5F5] border border-[#D1D1D1]'
            } ${isDisabled ? 'opacity-40' : ''}`}
          >
            <Text
              className={`text-[14px] font-medium ${
                isSelected ? 'text-white' : 'text-[#1A1A1A]'
              }`}
            >
              {size}
            </Text>

            {/* Diagonal strikethrough for out of stock */}
            {isDisabled ? (
              <View
                className="absolute bg-[#999999]"
                style={{
                  width: '140%',
                  height: 1,
                  transform: [{ rotate: '-45deg' }],
                }}
              />
            ) : null}
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
