import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/lib/theme';

interface CurrencyInputProps {
  label?: string;
  value: string;
  onChangeValue: (rawValue: string, formattedValue: string) => void;
  placeholder?: string;
  error?: string;
  currencySymbol?: string;
}

function formatCurrency(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (!digits) return '';
  return Number(digits).toLocaleString('en-US');
}

function unformat(value: string): string {
  return value.replace(/\D/g, '');
}

export default function CurrencyInput({
  label,
  value,
  onChangeValue,
  placeholder = '0',
  error,
  currencySymbol = '$',
}: CurrencyInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = error
    ? 'border-error'
    : isFocused
    ? 'border-primary'
    : 'border-neutral-300';

  const handleChange = (text: string) => {
    const raw = unformat(text);
    const formatted = formatCurrency(raw);
    onChangeValue(raw, formatted);
  };

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
        <Text className="text-[16px] font-bold text-neutral-700 mr-2">
          {currencySymbol}
        </Text>
        <TextInput
          className="flex-1 text-[16px] font-semibold text-neutral-900"
          placeholderTextColor={colors.neutral[500]}
          keyboardType="number-pad"
          value={formatCurrency(value)}
          onChangeText={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          accessibilityLabel={label ?? 'Currency input'}
          accessibilityHint="Enter amount"
        />
      </View>
      {error && (
        <Text className="text-[12px] text-error mt-1">{error}</Text>
      )}
    </View>
  );
}
