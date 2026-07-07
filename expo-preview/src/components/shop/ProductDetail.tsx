import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useProduct } from '@/hooks/useProducts';
import { useCartStore } from '@/stores/cartStore';
import { useWishlistStore } from '@/stores/wishlistStore';
import { colors, shadows } from '@/lib/theme';
import ProductGallery from '@/components/product/ProductGallery';
import Rating from '@/components/ui/Rating';
import Avatar from '@/components/ui/Avatar';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { data: product, isLoading } = useProduct(id);
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted);

  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [expanded, setExpanded] = useState(false);

  if (isLoading || !product) return <LoadingSpinner />;

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      qty: 1,
      image: product.images[0],
    });
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header overlay */}
      <View
        className="absolute top-0 left-0 right-0 z-10 flex-row justify-between px-4"
        style={{ paddingTop: insets.top + 8 }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white items-center justify-center"
          style={shadows.sm}
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={20} color={colors.neutral[700]} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleWishlist(product.id)}
          className="w-10 h-10 rounded-full bg-white items-center justify-center"
          style={shadows.sm}
          accessibilityLabel={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Ionicons
            name={wishlisted ? 'heart' : 'heart-outline'}
            size={20}
            color={wishlisted ? colors.primary.DEFAULT : colors.neutral[700]}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Image Gallery */}
        <ProductGallery images={product.images} />

        <View className="px-4 mt-4">
          {/* Category */}
          <Text className="text-[12px] text-neutral-500 mb-1">
            {product.category}
          </Text>

          {/* Name */}
          <Text className="text-[22px] font-bold text-neutral-900 mb-2">
            {product.name}
          </Text>

          {/* Rating */}
          <TouchableOpacity
            className="flex-row items-center mb-4"
            onPress={() => router.push(`/product/${product.id}/reviews`)}
            accessibilityLabel="View reviews"
          >
            <Rating value={product.rating} size={16} />
            <Text className="text-[14px] font-semibold text-neutral-900 ml-2">
              {product.rating}
            </Text>
            <Text className="text-[14px] text-neutral-500 ml-1">
              ({product.reviewCount} {t('product.reviews')})
            </Text>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={colors.neutral[500]}
              style={{ marginLeft: 2 }}
            />
          </TouchableOpacity>

          {/* Seller */}
          <View className="flex-row items-center py-3 border-t border-b border-neutral-100 mb-4">
            <Avatar source={product.seller.avatar} size="sm" />
            <View className="flex-1 ml-3">
              <Text className="text-[14px] font-semibold text-neutral-900">
                {product.seller.name}
              </Text>
              <Text className="text-[12px] text-neutral-500">
                {product.seller.role}
              </Text>
            </View>
            <TouchableOpacity
              className="w-10 h-10 rounded-full bg-primary-light items-center justify-center mr-2"
              accessibilityLabel="Chat with seller"
            >
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={18}
                color={colors.primary.DEFAULT}
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="w-10 h-10 rounded-full bg-primary-light items-center justify-center"
              accessibilityLabel="Call seller"
            >
              <Ionicons
                name="call-outline"
                size={18}
                color={colors.primary.DEFAULT}
              />
            </TouchableOpacity>
          </View>

          {/* Description */}
          <Text className="text-[16px] font-semibold text-neutral-900 mb-2">
            {t('product.product_details')}
          </Text>
          <Text
            className="text-[14px] text-neutral-500 leading-5"
            numberOfLines={expanded ? undefined : 3}
          >
            {product.description}
          </Text>
          <TouchableOpacity
            onPress={() => setExpanded(!expanded)}
            className="mt-1 mb-4"
            accessibilityLabel={expanded ? 'Show less' : 'Read more'}
          >
            <Text className="text-[14px] font-semibold text-primary">
              {expanded ? 'Show less' : t('product.read_more')}
            </Text>
          </TouchableOpacity>

          {/* Colors */}
          <Text className="text-[16px] font-semibold text-neutral-900 mb-2">
            {t('product.select_color')}
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8, marginBottom: 16 }}
          >
            {product.colors.map((color, index) => (
              <TouchableOpacity
                key={color}
                onPress={() => setSelectedColor(index)}
                className={`px-4 py-2 rounded-full border ${
                  selectedColor === index
                    ? 'bg-primary border-primary'
                    : 'bg-white border-neutral-300'
                }`}
                accessibilityLabel={`Color: ${color}`}
              >
                <Text
                  className={`text-[12px] font-semibold ${
                    selectedColor === index ? 'text-white' : 'text-neutral-700'
                  }`}
                >
                  {color}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Sizes */}
          <Text className="text-[16px] font-semibold text-neutral-900 mb-2">
            {t('product.select_size')}
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
          >
            {product.sizes.map((size, index) => (
              <TouchableOpacity
                key={size}
                onPress={() => setSelectedSize(index)}
                className={`w-11 h-11 rounded-full border items-center justify-center ${
                  selectedSize === index
                    ? 'bg-primary border-primary'
                    : 'bg-white border-neutral-300'
                }`}
                accessibilityLabel={`Size: ${size}`}
              >
                <Text
                  className={`text-[12px] font-semibold ${
                    selectedSize === index ? 'text-white' : 'text-neutral-700'
                  }`}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View
        className="absolute bottom-0 left-0 right-0 bg-white border-t border-neutral-100 flex-row items-center px-4 py-3"
        style={{ paddingBottom: insets.bottom + 12 }}
      >
        <View className="flex-1">
          <Text className="text-[12px] text-neutral-500">
            {t('product.total_price')}
          </Text>
          <Text className="text-[22px] font-bold text-neutral-900">
            ${product.price.toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity
          className="bg-primary rounded-full h-[52px] px-8 items-center justify-center flex-row"
          onPress={handleAddToCart}
          accessibilityLabel="Add to cart"
          activeOpacity={0.8}
        >
          <Ionicons name="bag-handle-outline" size={20} color="#FFFFFF" />
          <Text className="text-white text-[16px] font-semibold ml-2">
            {t('product.add_to_cart')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
