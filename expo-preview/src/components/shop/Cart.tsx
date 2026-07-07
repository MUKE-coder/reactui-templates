import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useCart } from '@/hooks/useCart';
import { colors } from '@/lib/theme';
import CartItemComponent from '@/components/cart/CartItem';
import RemoveCartModal from '@/components/cart/RemoveCartModal';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import type { CartItem } from '@/stores/cartStore';

export default function CartScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { items, updateQty, removeItem, subtotal, deliveryFee, discount, total } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<CartItem | null>(null);

  const handleRemovePress = (productId: string) => {
    const item = items.find((i) => i.productId === productId);
    if (item) {
      setItemToRemove(item);
      setRemoveModalVisible(true);
    }
  };

  const handleConfirmRemove = () => {
    if (itemToRemove) {
      removeItem(itemToRemove.productId);
      setRemoveModalVisible(false);
      setItemToRemove(null);
    }
  };

  if (items.length === 0) {
    return (
      <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
        <Text className="text-[22px] font-bold text-neutral-900 px-4 py-3">
          {t('cart.title')}
        </Text>
        <EmptyState
          icon="cart-outline"
          title={t('cart.empty_title')}
          subtitle={t('cart.empty_subtitle')}
          ctaTitle="Browse Products"
          onCtaPress={() => router.push('/(tabs)')}
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <Text className="text-[22px] font-bold text-neutral-900 px-4 py-3">
        {t('cart.title')}
      </Text>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 200 }}
      >
        {/* Cart Items */}
        {items.map((item) => (
          <CartItemComponent
            key={item.productId}
            item={item}
            onUpdateQty={updateQty}
            onRemove={handleRemovePress}
          />
        ))}

        {/* Promo Code */}
        <View className="flex-row items-center mt-4 gap-3">
          <View className="flex-1 flex-row items-center bg-neutral-100 rounded-lg h-[48px] px-4">
            <TextInput
              className="flex-1 text-[14px] text-neutral-900"
              placeholder={t('cart.promo_code')}
              placeholderTextColor={colors.neutral[500]}
              value={promoCode}
              onChangeText={setPromoCode}
              accessibilityLabel="Promo code input"
            />
          </View>
          <TouchableOpacity
            className="bg-primary rounded-lg h-[48px] px-5 items-center justify-center"
            accessibilityLabel="Apply promo code"
          >
            <Text className="text-white text-[14px] font-semibold">
              {t('common.apply')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Cost Summary */}
        <View className="mt-6 gap-3">
          <View className="flex-row justify-between">
            <Text className="text-[14px] text-neutral-500">
              {t('cart.sub_total')}
            </Text>
            <Text className="text-[14px] font-semibold text-neutral-900">
              ${subtotal.toFixed(2)}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-[14px] text-neutral-500">
              {t('cart.delivery_fee')}
            </Text>
            <Text className="text-[14px] font-semibold text-neutral-900">
              ${deliveryFee.toFixed(2)}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-[14px] text-neutral-500">
              {t('cart.discount')}
            </Text>
            <Text className="text-[14px] font-semibold text-primary">
              -${discount.toFixed(2)}
            </Text>
          </View>
          <View className="h-[1px] bg-neutral-100" />
          <View className="flex-row justify-between">
            <Text className="text-[16px] font-bold text-neutral-900">
              {t('cart.total_cost')}
            </Text>
            <Text className="text-[16px] font-bold text-neutral-900">
              ${total.toFixed(2)}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View
        className="absolute bottom-0 left-0 right-0 bg-white border-t border-neutral-100 px-4 py-3"
        style={{ paddingBottom: insets.bottom + 12 }}
      >
        <Button
          title={t('cart.proceed_to_checkout')}
          onPress={() => router.push('/checkout')}
        />
      </View>

      <RemoveCartModal
        visible={removeModalVisible}
        item={itemToRemove}
        onClose={() => setRemoveModalVisible(false)}
        onConfirm={handleConfirmRemove}
      />
    </View>
  );
}
