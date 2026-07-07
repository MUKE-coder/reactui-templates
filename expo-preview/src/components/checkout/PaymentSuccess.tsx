import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { colors } from '@/lib/theme';
import Button from '@/components/ui/Button';

export default function PaymentSuccessScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 bg-white items-center justify-center px-8"
      style={{ paddingBottom: insets.bottom }}
    >
      <View className="w-20 h-20 rounded-full bg-primary items-center justify-center mb-6">
        <Ionicons name="checkmark" size={40} color="#FFFFFF" />
      </View>

      <Text className="text-[22px] font-bold text-neutral-900 text-center mb-2">
        {t('checkout.payment_successful')}
      </Text>
      <Text className="text-[14px] text-neutral-500 text-center mb-8">
        {t('checkout.thank_you')}
      </Text>

      <View className="w-full">
        <Button
          title={t('checkout.view_order')}
          onPress={() => router.replace('/orders')}
        />
      </View>

      <TouchableOpacity
        className="mt-4"
        onPress={() => router.push('/checkout/e-receipt')}
        accessibilityLabel="View e-receipt"
      >
        <Text className="text-[14px] font-semibold text-primary">
          {t('checkout.view_e_receipt')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
