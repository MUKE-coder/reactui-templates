import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/lib/theme';

interface RatingProps {
  value: number;
  size?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export default function Rating({
  value,
  size = 12,
  interactive = false,
  onChange,
}: RatingProps) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <View className="flex-row" accessibilityLabel={`Rating: ${value} out of 5`}>
      {stars.map((star) => {
        const filled = star <= Math.round(value);
        const StarWrapper = interactive ? TouchableOpacity : View;

        return (
          <StarWrapper
            key={star}
            onPress={interactive ? () => onChange?.(star) : undefined}
            accessibilityLabel={interactive ? `Rate ${star} stars` : undefined}
            style={{ marginRight: 2 }}
          >
            <Ionicons
              name={filled ? 'star' : 'star-outline'}
              size={size}
              color={filled ? colors.warning : colors.neutral[300]}
            />
          </StarWrapper>
        );
      })}
    </View>
  );
}
