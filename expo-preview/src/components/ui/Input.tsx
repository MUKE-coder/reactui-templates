import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  type TextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/lib/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  isPassword?: boolean;
}

export default function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  isPassword = false,
  style,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const borderColor = error
    ? 'border-error'
    : isFocused
    ? 'border-primary'
    : 'border-neutral-300';

  return (
    <View className="w-full">
      {label && (
        <Text className="text-[14px] font-semibold text-neutral-900 mb-2">
          {label}
        </Text>
      )}
      <View
        className={`h-[52px] flex-row items-center bg-neutral-100 rounded-lg border ${borderColor} px-4`}
        style={isFocused ? { borderWidth: 1.5 } : undefined}
      >
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            color={isFocused ? colors.primary.DEFAULT : colors.neutral[500]}
            style={{ marginRight: 12 }}
          />
        )}
        <TextInput
          className="flex-1 text-[14px] text-neutral-900"
          placeholderTextColor={colors.neutral[500]}
          secureTextEntry={isPassword && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          accessibilityHint={label}
          style={style}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="w-10 h-10 items-center justify-center -mr-2"
            accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons
              name={showPassword ? 'eye' : 'eye-off'}
              size={22}
              color={showPassword ? colors.primary.DEFAULT : colors.neutral[500]}
            />
          </TouchableOpacity>
        )}
        {rightIcon && !isPassword && (
          <TouchableOpacity
            onPress={onRightIconPress}
            className="w-10 h-10 items-center justify-center -mr-2"
            accessibilityLabel="Input action"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons
              name={rightIcon}
              size={20}
              color={colors.neutral[500]}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text className="text-[12px] text-error mt-1">{error}</Text>
      )}
    </View>
  );
}
