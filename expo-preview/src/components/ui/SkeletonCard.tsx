import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

interface SkeletonCardProps {
  width?: number;
  height?: number;
}

export default function SkeletonCard({ width, height = 200 }: SkeletonCardProps) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <View
      className="rounded-xl overflow-hidden"
      style={{ width: width ?? '100%', height }}
    >
      <Animated.View style={{ flex: 1, opacity, backgroundColor: '#E5E5E5' }} />
      <View className="p-3">
        <Animated.View
          style={{ opacity, height: 12, width: '70%', borderRadius: 4, marginBottom: 8, backgroundColor: '#E5E5E5' }}
        />
        <Animated.View
          style={{ opacity, height: 12, width: '40%', borderRadius: 4, backgroundColor: '#E5E5E5' }}
        />
      </View>
    </View>
  );
}
