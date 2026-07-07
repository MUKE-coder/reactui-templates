import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import { useCart } from '@/hooks/useCart';
import { colors } from '@/lib/theme';
import ScreenHeader from '@/components/shared/ScreenHeader';
import Button from '@/components/ui/Button';

export default function CheckoutScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { items, subtotal, deliveryFee, discount, total } = useCart();

  return (
    <View className="flex-1 bg-white">
      <ScreenHeader title={t('checkout.title')} />
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
      >
        {/* Shipping Address */}
        <View className="py-4 border-b border-neutral-100">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-[16px] font-semibold text-neutral-900">
              {t('checkout.shipping_address')}
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/checkout/shipping-address')}
              accessibilityLabel="Change address"
            >
              <Text className="text-[12px] font-semibold text-primary">
                {t('checkout.change')}
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="location" size={18} color={colors.primary.DEFAULT} />
            <Text className="text-[14px] text-neutral-700 ml-2 flex-1">
              1901 Thornridge Cir. Shiloh, Hawaii 81063
            </Text>
          </View>
        </View>

        {/* Shipping Type */}
        <View className="py-4 border-b border-neutral-100">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-[16px] font-semibold text-neutral-900">
              {t('checkout.choose_shipping')}
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/checkout/shipping-type')}
              accessibilityLabel="Change shipping type"
            >
              <Text className="text-[12px] font-semibold text-primary">
                {t('checkout.change')}
              </Text>
            </TouchableOpacity>
          </View>
          <Text className="text-[14px] text-neutral-700">
            {t('checkout.economy')} — {t('checkout.estimated_arrival')}: 25 Sep 2023
          </Text>
        </View>

        {/* Order List */}
        <View className="py-4 border-b border-neutral-100">
          <Text className="text-[16px] font-semibold text-neutral-900 mb-3">
            {t('checkout.order_list')}
          </Text>
          {items.map((item) => (
            <View key={item.productId} className="flex-row items-center py-2">
              <Image
                source={{ uri: item.image }}
                style={{ width: 60, height: 60, borderRadius: 8 }}
                contentFit="cover"
              />
              <View className="flex-1 ml-3">
                <Text className="text-[14px] font-semibold text-neutral-900" numberOfLines={1}>
                  {item.name}
                </Text>
                <Text className="text-[12px] text-neutral-500">{item.category}</Text>
              </View>
              <Text className="text-[14px] font-bold text-neutral-900">
                ${(item.price * item.qty).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Cost Summary */}
        <View className="mt-4 gap-3">
          <View className="flex-row justify-between">
            <Text className="text-[14px] text-neutral-500">{t('cart.sub_total')}</Text>
            <Text className="text-[14px] font-semibold text-neutral-900">${subtotal.toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-[14px] text-neutral-500">{t('cart.delivery_fee')}</Text>
            <Text className="text-[14px] font-semibold text-neutral-900">${deliveryFee.toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-[14px] text-neutral-500">{t('cart.discount')}</Text>
            <Text className="text-[14px] font-semibold text-primary">-${discount.toFixed(2)}</Text>
          </View>
          <View className="h-[1px] bg-neutral-100" />
          <View className="flex-row justify-between">
            <Text className="text-[16px] font-bold text-neutral-900">{t('cart.total_cost')}</Text>
            <Text className="text-[16px] font-bold text-neutral-900">${total.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      <View
        className="absolute bottom-0 left-0 right-0 bg-white border-t border-neutral-100 px-4 py-3"
        style={{ paddingBottom: insets.bottom + 12 }}
      >
        <Button
          title={t('checkout.continue_to_payment')}
          onPress={() => router.push('/checkout/payment-methods')}
        />
      </View>
    </View>
  );
}
