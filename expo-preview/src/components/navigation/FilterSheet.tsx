import React, { useCallback, useState } from 'react';
import { View, Text, Pressable, ScrollView, type ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';

import BottomSheet from '@/components/ui/BottomSheet';
import CustomRadio from '@/components/ui/CustomRadioDot';
import SizeSelector from '@/components/product/SizeSelector';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

import { useFiltersStore } from '@/stores/filtersStore';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SORT_OPTIONS = [
  { key: 'recommended', labelKey: 'filter.recommended' as const, fallback: 'Recommended' },
  { key: 'popular', labelKey: 'filter.most_popular' as const, fallback: 'Most Popular' },
  { key: 'price_low', labelKey: 'filter.price_low_high' as const, fallback: 'Price Low \u2192 High' },
  { key: 'price_high', labelKey: 'filter.price_high_low' as const, fallback: 'Price High \u2192 Low' },
  { key: 'new', labelKey: 'filter.new_arrivals' as const, fallback: 'New Arrivals' },
];

const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const COLOR_OPTIONS: { name: string; hex: string }[] = [
  { name: 'white', hex: '#FFFFFF' },
  { name: 'black', hex: '#000000' },
  { name: 'red', hex: '#EF4444' },
  { name: 'blue', hex: '#3B82F6' },
  { name: 'pink', hex: '#EC4899' },
  { name: 'green', hex: '#22C55E' },
  { name: 'beige', hex: '#D4B896' },
  { name: 'brown', hex: '#92400E' },
];

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface FilterSheetProps {
  visible: boolean;
  onClose: () => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FilterSheet({ visible, onClose }: FilterSheetProps) {
  const { t } = useTranslation();

  // ---- Store ----
  const sortBy = useFiltersStore((s) => s.sortBy);
  const setSortBy = useFiltersStore((s) => s.setSortBy);
  const sizes = useFiltersStore((s) => s.sizes);
  const toggleSize = useFiltersStore((s) => s.toggleSize);
  const priceRange = useFiltersStore((s) => s.priceRange);
  const setPriceRange = useFiltersStore((s) => s.setPriceRange);
  const colors = useFiltersStore((s) => s.colors);
  const toggleColor = useFiltersStore((s) => s.toggleColor);
  const resetFilters = useFiltersStore((s) => s.resetFilters);

  // ---- Local price inputs (string) ----
  const [minPrice, setMinPrice] = useState<string>(
    priceRange[0] > 0 ? String(priceRange[0]) : '',
  );
  const [maxPrice, setMaxPrice] = useState<string>(
    priceRange[1] < 10000 ? String(priceRange[1]) : '',
  );

  // ---- Handlers ----
  const handleApply = useCallback(() => {
    const min = minPrice ? Number(minPrice) : 0;
    const max = maxPrice ? Number(maxPrice) : 10000;
    setPriceRange([min, max]);
    onClose();
  }, [minPrice, maxPrice, setPriceRange, onClose]);

  const handleReset = useCallback(() => {
    resetFilters();
    setMinPrice('');
    setMaxPrice('');
  }, [resetFilters]);

  // ---- Size handler for SizeSelector (single-select API adapted to multi) ----
  const handleSizePress = useCallback(
    (size: string) => {
      toggleSize(size);
    },
    [toggleSize],
  );

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <ScrollView
        className="px-4"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-4"
      >
        {/* ================================================================ */}
        {/* Sort By */}
        {/* ================================================================ */}
        <Text className="text-[16px] font-bold text-black mt-2 mb-3">
          {t('filter.sort_by_heading', 'Sort By')}
        </Text>

        {SORT_OPTIONS.map((option) => {
          const isSelected = sortBy === option.key;
          return (
            <Pressable
              key={option.key}
              onPress={() => setSortBy(option.key)}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={t(option.labelKey, option.fallback)}
              className="flex-row items-center py-1"
              style={({ pressed }: { pressed: boolean }): ViewStyle => ({
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <CustomRadio
                selected={isSelected}
                onPress={() => setSortBy(option.key)}
              />
              <Text
                className={`text-[14px] ml-1 ${
                  isSelected ? 'font-semibold text-black' : 'text-[#4A4A4A]'
                }`}
              >
                {t(option.labelKey, option.fallback)}
              </Text>
            </Pressable>
          );
        })}

        {/* ================================================================ */}
        {/* Size */}
        {/* ================================================================ */}
        <Text className="text-[16px] font-bold text-black mt-5 mb-3">
          {t('filter.size_heading', 'Size')}
        </Text>

        <View className="flex-row flex-wrap gap-2">
          {SIZE_OPTIONS.map((size) => {
            const isSelected = sizes.includes(size);
            return (
              <Pressable
                key={size}
                onPress={() => handleSizePress(size)}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                accessibilityLabel={`${t('product.size', 'Size')} ${size}`}
                className={`min-w-[44px] items-center justify-center px-4 py-2 rounded-lg ${
                  isSelected
                    ? 'bg-primary'
                    : 'bg-[#F5F5F5] border border-[#D1D1D1]'
                }`}
              >
                <Text
                  className={`text-[14px] font-medium ${
                    isSelected ? 'text-white' : 'text-[#1A1A1A]'
                  }`}
                >
                  {size}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* ================================================================ */}
        {/* Price Range */}
        {/* ================================================================ */}
        <Text className="text-[16px] font-bold text-black mt-5 mb-3">
          {t('filter.price_range', 'Price Range')}
        </Text>

        <View className="flex-row gap-3">
          <View className="flex-1">
            <Input
              value={minPrice}
              onChangeText={setMinPrice}
              placeholder={t('filter.min_price', 'Min')}
              keyboardType="numeric"
              accessibilityLabel={t('filter.min_price', 'Min price')}
            />
          </View>
          <View className="flex-1">
            <Input
              value={maxPrice}
              onChangeText={setMaxPrice}
              placeholder={t('filter.max_price', 'Max')}
              keyboardType="numeric"
              accessibilityLabel={t('filter.max_price', 'Max price')}
            />
          </View>
        </View>

        {/* ================================================================ */}
        {/* Color */}
        {/* ================================================================ */}
        <Text className="text-[16px] font-bold text-black mt-5 mb-3">
          {t('filter.color_heading', 'Color')}
        </Text>

        <View className="flex-row flex-wrap gap-3">
          {COLOR_OPTIONS.map((color) => {
            const isSelected = colors.includes(color.name);
            return (
              <Pressable
                key={color.name}
                onPress={() => toggleColor(color.name)}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                accessibilityLabel={`${t('product.color', 'Color')} ${color.name}`}
                className="items-center"
                style={({ pressed }: { pressed: boolean }): ViewStyle => ({
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: color.hex,
                    borderWidth: isSelected ? 2.5 : 1,
                    borderColor: isSelected ? '#000000' : '#D1D1D1',
                  }}
                />
                <Text className="text-[10px] text-[#4A4A4A] mt-1 capitalize">
                  {color.name}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* ================================================================ */}
        {/* Action buttons */}
        {/* ================================================================ */}
        <View className="flex-row gap-3 mt-6">
          <View className="flex-1">
            <Button
              title={t('common.reset', 'Reset')}
              variant="ghost"
              onPress={handleReset}
              fullWidth
            />
          </View>
          <View className="flex-1">
            <Button
              title={t('common.apply', 'Apply')}
              variant="primary"
              onPress={handleApply}
              fullWidth
            />
          </View>
        </View>
      </ScrollView>
    </BottomSheet>
  );
}
