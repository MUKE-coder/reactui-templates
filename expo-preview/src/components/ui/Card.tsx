import React from 'react';
import { View, type ViewProps } from 'react-native';
import { shadows } from '@/lib/theme';

interface CardProps extends ViewProps {
  children: React.ReactNode;
}

export default function Card({ children, style, ...props }: CardProps) {
  return (
    <View
      className="bg-white rounded-xl"
      style={[shadows.card, style]}
      {...props}
    >
      {children}
    </View>
  );
}
