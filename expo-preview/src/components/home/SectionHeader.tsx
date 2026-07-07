import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

interface SectionHeaderProps {
  title: string;
  onSeeAll?: () => void;
  rightElement?: React.ReactNode;
}

export default function SectionHeader({
  title,
  onSeeAll,
  rightElement,
}: SectionHeaderProps) {
  const { t } = useTranslation();

  return (
    <View className="flex-row items-center justify-between px-4 mb-3">
      <Text className="text-[18px] font-semibold text-neutral-900">
        {title}
      </Text>
      {rightElement
        ? rightElement
        : onSeeAll && (
            <TouchableOpacity
              onPress={onSeeAll}
              accessibilityLabel={`${t('common.see_all')} ${title}`}
            >
              <Text className="text-[14px] font-semibold text-primary">
                {t('common.see_all')}
              </Text>
            </TouchableOpacity>
          )}
    </View>
  );
}
