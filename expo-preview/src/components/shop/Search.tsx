import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Image } from 'expo-image';
import { colors } from '@/lib/theme';
import products from '@/mock/products.json';

const RECENT_SEARCHES = ['Brown Jacket', 'Shoes', 'Wood Chair'];
const RECENT_VIEWS = products.slice(0, 3);

export default function SearchScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search/results?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {/* Search Bar */}
      <View className="flex-row items-center px-4 py-3 gap-3">
        <TouchableOpacity
          onPress={() => router.back()}
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={22} color={colors.neutral[900]} />
        </TouchableOpacity>
        <View className="flex-1 flex-row items-center bg-neutral-100 rounded-full h-[44px] px-4">
          <Ionicons name="search" size={18} color={colors.neutral[500]} />
          <TextInput
            className="flex-1 text-[14px] text-neutral-900 ml-2"
            placeholder={t('home.search_placeholder')}
            placeholderTextColor={colors.neutral[500]}
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
            autoFocus
            returnKeyType="search"
            accessibilityLabel="Search input"
          />
          {query.length > 0 && (
            <TouchableOpacity
              onPress={() => setQuery('')}
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

      {/* Recent Searches */}
      <View className="px-4 mt-2">
        <Text className="text-[16px] font-semibold text-neutral-900 mb-3">
          {t('search.recent_search')}
        </Text>
        {RECENT_SEARCHES.map((term) => (
          <TouchableOpacity
            key={term}
            className="flex-row items-center justify-between py-2.5"
            onPress={() => {
              setQuery(term);
              router.push(`/search/results?q=${encodeURIComponent(term)}`);
            }}
            accessibilityLabel={`Search for ${term}`}
          >
            <Text className="text-[14px] text-neutral-700">{term}</Text>
            <TouchableOpacity accessibilityLabel={`Remove ${term}`}>
              <Ionicons name="close" size={16} color={colors.neutral[500]} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recent Views */}
      <View className="px-4 mt-6">
        <Text className="text-[16px] font-semibold text-neutral-900 mb-3">
          {t('search.recent_view')}
        </Text>
        {RECENT_VIEWS.map((product) => (
          <TouchableOpacity
            key={product.id}
            className="flex-row items-center py-2.5"
            onPress={() => router.push(`/product/${product.id}`)}
            accessibilityLabel={product.name}
          >
            <Image
              source={{ uri: product.images[0] }}
              style={{ width: 48, height: 48, borderRadius: 8 }}
              contentFit="cover"
            />
            <View className="ml-3 flex-1">
              <Text className="text-[14px] font-semibold text-neutral-900">
                {product.name}
              </Text>
              <Text className="text-[12px] text-neutral-500">
                {product.category}
              </Text>
            </View>
            <Text className="text-[14px] font-bold text-neutral-900">
              ${product.price.toFixed(2)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
