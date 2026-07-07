import React, { useEffect, useRef } from 'react';
import { View, Text, Pressable, Animated } from 'react-native';

interface ToastAction {
  label: string;
  onPress: () => void;
}

interface ToastProps {
  visible: boolean;
  message: string;
  action?: ToastAction;
  onDismiss: () => void;
  duration?: number;
}

export default function Toast({
  visible,
  message,
  action,
  onDismiss,
  duration = 3000,
}: ToastProps) {
  const translateY = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 80,
        friction: 12,
      }).start();

      const timer = setTimeout(() => {
        onDismiss();
      }, duration);

      return () => clearTimeout(timer);
    } else {
      Animated.timing(translateY, {
        toValue: 100,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, duration, onDismiss, translateY]);

  if (!visible) return null;

  return (
    <Animated.View
      className="absolute bottom-24 left-0 right-0 mx-4"
      style={{ transform: [{ translateY }] }}
      pointerEvents="box-none"
    >
      <View className="bg-[#1A1A1A] rounded-lg px-4 py-3 flex-row items-center justify-between">
        <Text className="text-white text-[14px] flex-1 mr-3" numberOfLines={2}>
          {message}
        </Text>

        {action ? (
          <Pressable
            onPress={action.onPress}
            accessibilityLabel={action.label}
          >
            <Text className="text-[#FF9E90] text-[14px] font-semibold">
              {action.label}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </Animated.View>
  );
}
