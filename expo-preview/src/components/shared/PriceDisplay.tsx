import React from 'react';
import { Text } from 'react-native';

interface PriceDisplayProps {
  amount: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const sizeStyles = {
  sm: 'text-[12px]',
  md: 'text-[16px]',
  lg: 'text-[22px]',
};

export default function PriceDisplay({
  amount,
  size = 'md',
  color = 'text-neutral-900',
}: PriceDisplayProps) {
  return (
    <Text
      className={`font-bold ${sizeStyles[size]} ${color}`}
      accessibilityLabel={`Price: $${amount.toFixed(2)}`}
    >
      ${amount.toFixed(2)}
    </Text>
  );
}
