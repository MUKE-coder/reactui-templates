import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useProducts, useFlashSaleProducts } from '@/hooks/useProducts';
import { useUnreadNotificationCount } from '@/hooks/useNotifications';
import { colors } from '@/lib/theme';
import RedHeader from '@/components/shared/RedHeader';
import SectionHeader from '@/components/home/SectionHeader';
import PromoBanner from '@/components/home/PromoBanner';
import CategoryIcon from '@/components/home/CategoryIcon';
import FlashSaleTimer from '@/components/home/FlashSaleTimer';
import ProductCard from '@/components/product/ProductCard';
import SkeletonCard from '@/components/ui/SkeletonCard';
import banners from '@/mock/banners.json';
import categories from '@/mock/categories.json';

const FLASH_FILTERS = ['filter_all', 'filter_newest', 'filter_popular', 'filter_clothes'] as const;

export default function HomeScreen() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('filter_all');
  const { data: flashProducts, isLoading: flashLoading } = useFlashSaleProducts();
  const { data: allProducts, isLoading: productsLoading } = useProducts();
  const { data: unreadCount } = useUnreadNotificationCount();

  // Show all categories — the row is a horizontal ScrollView so it scrolls.
  const topCategories = categories;

  return (
    <View className="flex-1 bg-neutral-100">
      <RedHeader
        notificationCount={unreadCount ?? 0}
        onNotificationPress={() => router.push('/profile/notifications')}
      />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* #SpecialForYou */}
        <View className="mt-4">
          <SectionHeader title={t('home.special_for_you')} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            {banners.map((banner) => (
              <PromoBanner
                key={banner.id}
                title={banner.title}
                subtitle={banner.subtitle}
                description={banner.description}
                image={banner.image}
                badge={banner.badge}
                ctaText={banner.ctaText}
              />
            ))}
          </ScrollView>
        </View>

        {/* Categories */}
        <View className="mt-6">
          <SectionHeader
            title={t('home.category')}
            onSeeAll={() => router.push('/categories')}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            {topCategories.map((cat) => (
              <CategoryIcon
                key={cat.id}
                id={cat.id}
                name={cat.name}
                icon={cat.icon as keyof typeof import('@expo/vector-icons').Ionicons.glyphMap}
                onPress={(id) => router.push(`/categories/${id}`)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Flash Sale */}
        <View className="mt-6">
          <SectionHeader
            title={t('home.flash_sale')}
            rightElement={<FlashSaleTimer />}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
          >
            {FLASH_FILTERS.map((filter) => (
              <TouchableOpacity
                key={filter}
                onPress={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full ${
                  activeFilter === filter
                    ? 'bg-primary'
                    : 'bg-white border border-neutral-300'
                }`}
                accessibilityLabel={t(`home.${filter}`)}
              >
                <Text
                  className={`text-[12px] font-semibold ${
                    activeFilter === filter ? 'text-white' : 'text-neutral-700'
                  }`}
                >
                  {t(`home.${filter}`)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {flashLoading ? (
            <View className="flex-row px-4 mt-3 gap-3">
              <SkeletonCard height={220} />
              <SkeletonCard height={220} />
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, gap: 12 }}
            >
              {flashProducts?.map((product) => (
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
            </ScrollView>
          )}
        </View>

        {/* More Products */}
        <View className="mt-6">
          <SectionHeader title="Popular" />
          {productsLoading ? (
            <View className="flex-row flex-wrap px-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <SkeletonCard key={i} height={220} />
              ))}
            </View>
          ) : (
            <View className="flex-row flex-wrap px-4 gap-3">
              {allProducts?.slice(0, 6).map((product) => (
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
          )}
        </View>
      </ScrollView>
    </View>
  );
}
