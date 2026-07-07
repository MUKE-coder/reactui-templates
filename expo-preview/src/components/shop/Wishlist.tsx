import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useWishlistProducts } from '@/hooks/useWishlist';
import ProductCard from '@/components/product/ProductCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import EmptyState from '@/components/ui/EmptyState';

const FILTER_CHIPS = [
  { key: undefined, label: 'All' },
  { key: 'shoes', label: 'Shoes' },
  { key: 'clothes', label: 'Clothes' },
  { key: 'electronics', label: 'Electronics' },
] as const;

export default function WishlistScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState<string | undefined>(undefined);
  const { data: products, isLoading } = useWishlistProducts(activeFilter);

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <Text className="text-[22px] font-bold text-neutral-900 px-4 py-3">
        {t('wishlist.title')}
      </Text>

      {/* Filter chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 8, marginBottom: 12 }}
      >
        {FILTER_CHIPS.map((chip) => (
          <TouchableOpacity
            key={chip.label}
            onPress={() => setActiveFilter(chip.key)}
            className={`px-4 py-2 rounded-full ${
              activeFilter === chip.key
                ? 'bg-primary'
                : 'bg-white border border-neutral-300'
            }`}
            accessibilityLabel={chip.label}
          >
            <Text
              className={`text-[12px] font-semibold ${
                activeFilter === chip.key ? 'text-white' : 'text-neutral-700'
              }`}
            >
              {chip.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {isLoading ? (
        <LoadingSpinner />
      ) : products && products.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        >
          <View className="flex-row flex-wrap gap-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                rating={product.rating}
                reviewCount={product.reviewCount}
                image={product.images[0]}
                discount={product.discount}
              />
            ))}
          </View>
        </ScrollView>
      ) : (
        <EmptyState
          icon="heart-outline"
          title="Your wishlist is empty"
          subtitle="Items you save will appear here"
        />
      )}
    </View>
  );
}
