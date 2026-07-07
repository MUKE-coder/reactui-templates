import React from 'react';
import { TouchableOpacity, Text, type TouchableOpacityProps } from 'react-native';

type BadgeVariant = 'red' | 'green' | 'gray' | 'light';

interface BadgeProps extends TouchableOpacityProps {
  label: string;
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, { bg: string; text: string }> = {
  red: { bg: 'bg-primary', text: 'text-white' },
  green: { bg: 'bg-success', text: 'text-white' },
  gray: { bg: 'bg-neutral-100', text: 'text-neutral-700' },
  light: { bg: 'bg-primary-light', text: 'text-primary' },
};

export default function Badge({
  label,
  variant = 'red',
  ...props
}: BadgeProps) {
  const styles = variantStyles[variant];

  return (
    <TouchableOpacity
      className={`h-[28px] px-3 rounded-full items-center justify-center ${styles.bg}`}
      accessibilityLabel={label}
      accessibilityRole="button"
      {...props}
    >
      <Text className={`text-[12px] font-semibold ${styles.text}`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
