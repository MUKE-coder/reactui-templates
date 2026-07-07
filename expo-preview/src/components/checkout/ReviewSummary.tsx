import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import { useCart } from '@/hooks/useCart';
import ScreenHeader from '@/components/shared/ScreenHeader';
import Button from '@/components/ui/Button';

export default function ReviewSummaryScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { items, subtotal, deliveryFee, discount, total } = useCart();

  return (
    <View className="flex-1 bg-white">
      <ScreenHeader title={t('checkout.review_summary')} />
      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Items */}
        {items.map((item) => (
          <View key={item.productId} className="flex-row items-center py-3 border-b border-neutral-100">
            <Image source={{ uri: item.image }} style={{ width: 60, height: 60, borderRadius: 8 }} contentFit="cover" />
            <View className="flex-1 ml-3">
              <Text className="text-[14px] font-semibold text-neutral-900" numberOfLines={1}>{item.name}</Text>
              <Text className="text-[12px] text-neutral-500">{item.category}</Text>
            </View>
            <Text className="text-[14px] font-bold text-neutral-900">${(item.price * item.qty).toFixed(2)}</Text>
          </View>
        ))}

        {/* Order details */}
        <View className="mt-4 gap-3">
          <View className="flex-row justify-between">
            <Text className="text-[14px] text-neutral-500">{t('checkout.order_date')}</Text>
            <Text className="text-[14px] text-neutral-900">23 Sep 2023</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-[14px] text-neutral-500">{t('checkout.delivery_type')}</Text>
            <Text className="text-[14px] text-neutral-900">{t('checkout.economy')}</Text>
          </View>
          <View className="h-[1px] bg-neutral-100" />
          <View className="flex-row justify-between">
            <Text className="text-[14px] text-neutral-500">{t('checkout.amount')}</Text>
            <Text className="text-[14px] text-neutral-900">${subtotal.toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-[14px] text-neutral-500">{t('checkout.delivery_charge')}</Text>
            <Text className="text-[14px] text-neutral-900">${deliveryFee.toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-[14px] text-neutral-500">{t('cart.discount')}</Text>
            <Text className="text-[14px] text-primary">-${discount.toFixed(2)}</Text>
          </View>
          <View className="h-[1px] bg-neutral-100" />
          <View className="flex-row justify-between">
            <Text className="text-[16px] font-bold text-neutral-900">{t('common.total')}</Text>
            <Text className="text-[16px] font-bold text-neutral-900">${total.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      <View className="bg-white border-t border-neutral-100 px-4 py-3" style={{ paddingBottom: insets.bottom + 12 }}>
        <Button title={t('common.continue')} onPress={() => router.push('/checkout/confirm-payment')} />
      </View>
    </View>
  );
}
