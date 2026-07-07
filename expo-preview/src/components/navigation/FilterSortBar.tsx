import React from 'react';
import { View, Text, Pressable, type ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

interface FilterSortBarProps {
  onSortPress: () => void;
  onCategoryPress: () => void;
  onFilterPress: () => void;
  sortLabel?: string;
  resultCount?: number;
}

export default function FilterSortBar({
  onSortPress,
  onCategoryPress,
  onFilterPress,
  sortLabel,
  resultCount,
}: FilterSortBarProps) {
  const { t } = useTranslation();

  return (
    <View className="flex-row items-center px-4 py-2 bg-white border-b border-[#F5F5F5]">
      {/* Sort button */}
      <Pressable
        onPress={onSortPress}
        accessibilityRole="button"
        accessibilityLabel={t('filter.sortBy', 'Sort by')}
        className="flex-row items-center mr-4"
        style={({ pressed }: { pressed: boolean }): ViewStyle => ({
          opacity: pressed ? 0.7 : 1,
        })}
      >
        <Ionicons name="swap-vertical-outline" size={16} color="#1A1A1A" />
        <Text className="text-[12px] font-semibold text-[#1A1A1A] ml-1">
          {sortLabel ?? t('filter.sortByDefault', 'SORT BY')} {'\u25BE'}
        </Text>
      </Pressable>

      {/* Category button */}
      <Pressable
        onPress={onCategoryPress}
        accessibilityRole="button"
        accessibilityLabel={t('filter.category', 'Category')}
        className="flex-row items-center mr-4"
        style={({ pressed }: { pressed: boolean }): ViewStyle => ({
          opacity: pressed ? 0.7 : 1,
        })}
      >
        <Ionicons name="grid-outline" size={14} color="#1A1A1A" />
        <Text className="text-[12px] font-semibold text-[#1A1A1A] ml-1">
          {t('filter.category', 'CATEGORY')}
        </Text>
      </Pressable>

      {/* Filter button */}
      <Pressable
        onPress={onFilterPress}
        accessibilityRole="button"
        accessibilityLabel={t('filter.filters', 'Filters')}
        className="flex-row items-center"
        style={({ pressed }: { pressed: boolean }): ViewStyle => ({
          opacity: pressed ? 0.7 : 1,
        })}
      >
        <Ionicons name="options-outline" size={16} color="#1A1A1A" />
        <Text className="text-[12px] font-semibold text-[#1A1A1A] ml-1">
          {t('filter.filters', 'FILTERS')}
        </Text>
      </Pressable>

      {/* Spacer + result count */}
      {resultCount != null ? (
        <Text className="text-[12px] text-[#888888] ml-auto">
          {resultCount.toLocaleString('en-US')}{' '}
          {t('filter.results', 'results')}
        </Text>
      ) : null}
    </View>
  );
}
