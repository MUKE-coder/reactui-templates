import React from 'react';
import { Pressable, View } from 'react-native';

interface CustomRadioProps {
  selected: boolean;
  onPress: () => void;
  size?: number;
}

export default function CustomRadio({
  selected,
  onPress,
  size = 20,
}: CustomRadioProps) {
  const innerDotSize = Math.round(size * 0.4); // ~8px for default 20

  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel={selected ? 'Selected radio button' : 'Unselected radio button'}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      style={{
        minWidth: 44,
        minHeight: 44,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: 1.5,
          borderColor: selected ? '#000000' : '#D1D1D1',
          backgroundColor: selected ? '#000000' : '#FFFFFF',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {selected ? (
          <View
            style={{
              width: innerDotSize,
              height: innerDotSize,
              borderRadius: innerDotSize / 2,
              backgroundColor: '#FFFFFF',
            }}
          />
        ) : null}
      </View>
    </Pressable>
  );
}
