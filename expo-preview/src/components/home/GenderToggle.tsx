import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';

interface GenderToggleProps {
  selected: 'men' | 'women';
  onToggle: (gender: 'men' | 'women') => void;
}

export default function GenderToggle({
  selected,
  onToggle,
}: GenderToggleProps) {
  const { t } = useTranslation();

  const pills: Array<{ key: 'men' | 'women'; label: string }> = [
    { key: 'women', label: t('home.women') },
    { key: 'men', label: t('home.men') },
  ];

  return (
    <View className="mx-4 mt-2 flex-row items-center justify-center gap-3">
      {pills.map((pill) => {
        const isSelected = selected === pill.key;
        return (
          <Pressable
            key={pill.key}
            onPress={() => onToggle(pill.key)}
            className={`rounded-full px-6 py-2 ${
              isSelected
                ? 'bg-primary'
                : 'border border-[#D1D1D1] bg-[#F5F5F5]'
            }`}
          >
            <Text
              className={`text-[14px] font-medium ${
                isSelected ? 'text-white' : 'text-[#888888]'
              }`}
            >
              {pill.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
