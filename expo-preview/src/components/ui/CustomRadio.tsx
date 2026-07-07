import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/lib/theme';

interface RadioOption {
  label: string;
  value: string;
  subtitle?: string;
  rightText?: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

interface CustomRadioProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export default function CustomRadio({
  options,
  value,
  onChange,
  label,
}: CustomRadioProps) {
  return (
    <View className="w-full">
      {label && (
        <Text className="text-[14px] font-semibold text-neutral-900 mb-3">
          {label}
        </Text>
      )}
      <View className="gap-2">
        {options.map((option) => {
          const isSelected = option.value === value;
          return (
            <TouchableOpacity
              key={option.value}
              className={`flex-row items-center p-4 rounded-xl border ${
                isSelected
                  ? 'border-primary bg-primary-light'
                  : 'border-neutral-300 bg-white'
              }`}
              onPress={() => onChange(option.value)}
              accessibilityLabel={option.label}
              accessibilityRole="radio"
              accessibilityState={{ checked: isSelected }}
              activeOpacity={0.7}
            >
              {option.icon && (
                <View
                  className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${
                    isSelected ? 'bg-primary' : 'bg-neutral-100'
                  }`}
                >
                  <Ionicons
                    name={option.icon}
                    size={20}
                    color={isSelected ? colors.white : colors.neutral[500]}
                  />
                </View>
              )}

              <View className="flex-1">
                <Text
                  className={`text-[14px] font-semibold ${
                    isSelected ? 'text-primary' : 'text-neutral-900'
                  }`}
                >
                  {option.label}
                </Text>
                {option.subtitle && (
                  <Text className="text-[12px] text-neutral-500 mt-0.5">
                    {option.subtitle}
                  </Text>
                )}
              </View>

              {option.rightText && (
                <Text
                  className={`text-[14px] font-bold mr-3 ${
                    isSelected ? 'text-primary' : 'text-neutral-900'
                  }`}
                >
                  {option.rightText}
                </Text>
              )}

              <View
                className={`w-[22px] h-[22px] rounded-full border-2 items-center justify-center ${
                  isSelected ? 'border-primary' : 'border-neutral-300'
                }`}
              >
                {isSelected && (
                  <View className="w-[12px] h-[12px] rounded-full bg-primary" />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
