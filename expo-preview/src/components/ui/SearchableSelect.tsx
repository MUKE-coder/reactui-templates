import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/lib/theme';

interface SelectOption {
  label: string;
  value: string;
}

interface SearchableSelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
}

export default function SearchableSelect({
  label,
  placeholder = 'Select...',
  options,
  value,
  onChange,
  error,
  leftIcon,
}: SearchableSelectProps) {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');
  const insets = useSafeAreaInsets();

  const selectedLabel = options.find((o) => o.value === value)?.label ?? '';

  const filtered = useMemo(
    () =>
      options.filter((o) =>
        o.label.toLowerCase().includes(search.toLowerCase())
      ),
    [options, search]
  );

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setVisible(false);
    setSearch('');
  };

  const borderColor = error ? 'border-error' : 'border-neutral-300';

  return (
    <View className="w-full">
      {label && (
        <Text className="text-[14px] font-semibold text-neutral-900 mb-2">
          {label}
        </Text>
      )}
      <TouchableOpacity
        className={`h-[52px] flex-row items-center bg-neutral-100 rounded-lg border ${borderColor} px-4`}
        onPress={() => setVisible(true)}
        accessibilityLabel={label ?? 'Select option'}
        accessibilityRole="button"
      >
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            color={colors.neutral[500]}
            style={{ marginRight: 12 }}
          />
        )}
        <Text
          className={`flex-1 text-[14px] ${
            selectedLabel ? 'text-neutral-900' : 'text-neutral-500'
          }`}
        >
          {selectedLabel || placeholder}
        </Text>
        <Ionicons
          name="chevron-down"
          size={18}
          color={colors.neutral[500]}
        />
      </TouchableOpacity>
      {error && (
        <Text className="text-[12px] text-error mt-1">{error}</Text>
      )}

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View
            className="bg-white rounded-t-3xl max-h-[70%]"
            style={{ paddingBottom: insets.bottom + 16 }}
          >
            <View className="px-4 pt-3 pb-2">
              <View className="w-8 h-1 bg-neutral-300 rounded-full self-center mb-4" />
              <Text className="text-[18px] font-semibold text-neutral-900 mb-3">
                {label ?? 'Select'}
              </Text>
              <View className="h-[44px] flex-row items-center bg-neutral-100 rounded-full px-4 mb-2">
                <Ionicons
                  name="search"
                  size={18}
                  color={colors.neutral[500]}
                />
                <TextInput
                  className="flex-1 text-[14px] text-neutral-900 ml-2"
                  placeholder="Search..."
                  placeholderTextColor={colors.neutral[500]}
                  value={search}
                  onChangeText={setSearch}
                  autoFocus
                />
                {search.length > 0 && (
                  <TouchableOpacity
                    onPress={() => setSearch('')}
                    accessibilityLabel="Clear search"
                  >
                    <Ionicons
                      name="close-circle"
                      size={18}
                      color={colors.neutral[500]}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <FlatList
              data={filtered}
              keyExtractor={(item) => item.value}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => {
                const isSelected = item.value === value;
                return (
                  <TouchableOpacity
                    className={`flex-row items-center px-4 py-3.5 ${
                      isSelected ? 'bg-primary-light' : ''
                    }`}
                    onPress={() => handleSelect(item.value)}
                    accessibilityLabel={item.label}
                    accessibilityState={{ selected: isSelected }}
                  >
                    <View
                      className={`w-5 h-5 rounded-full border-2 mr-3 items-center justify-center ${
                        isSelected
                          ? 'border-primary bg-primary'
                          : 'border-neutral-300'
                      }`}
                    >
                      {isSelected && (
                        <View className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </View>
                    <Text
                      className={`text-[14px] flex-1 ${
                        isSelected
                          ? 'font-semibold text-primary'
                          : 'text-neutral-900'
                      }`}
                    >
                      {item.label}
                    </Text>
                    {isSelected && (
                      <Ionicons
                        name="checkmark"
                        size={20}
                        color={colors.primary.DEFAULT}
                      />
                    )}
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={
                <View className="items-center py-8">
                  <Text className="text-[14px] text-neutral-500">
                    No results found
                  </Text>
                </View>
              }
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
