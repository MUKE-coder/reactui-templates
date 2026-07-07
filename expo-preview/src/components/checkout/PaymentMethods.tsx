import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { colors } from '@/lib/theme';
import ScreenHeader from '@/components/shared/ScreenHeader';
import CustomRadio from '@/components/ui/CustomRadio';
import Button from '@/components/ui/Button';

export default function PaymentMethodsScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState('paypal');

  const paymentOptions = [
    { label: 'PayPal', value: 'paypal', icon: 'logo-paypal' as const },
    { label: 'Apple Pay', value: 'apple', icon: 'logo-apple' as const },
    { label: 'Google Pay', value: 'google', icon: 'logo-google' as const },
  ];

  return (
    <View className="flex-1 bg-white">
      <ScreenHeader title={t('checkout.payment_methods')} />
      <ScrollView className="flex-1 px-4">
        {/* Credit Card */}
        <Text className="text-[16px] font-semibold text-neutral-900 mb-3">
          {t('checkout.credit_debit_card')}
        </Text>
        <TouchableOpacity
          className="flex-row items-center p-4 rounded-xl border border-neutral-300 mb-6"
          onPress={() => router.push('/checkout/add-card')}
          accessibilityLabel="Add card"
        >
          <Ionicons name="card-outline" size={20} color={colors.primary.DEFAULT} />
          <Text className="text-[14px] font-semibold text-neutral-900 flex-1 ml-3">
            {t('checkout.add_card')}
          </Text>
          <Ionicons name="chevron-forward" size={18} color={colors.neutral[500]} />
        </TouchableOpacity>

        {/* More Options */}
        <Text className="text-[16px] font-semibold text-neutral-900 mb-3">
          {t('checkout.more_payment_options')}
        </Text>
        <CustomRadio
          options={paymentOptions}
          value={selected}
          onChange={setSelected}
        />
      </ScrollView>

      <View
        className="bg-white border-t border-neutral-100 px-4 py-3"
        style={{ paddingBottom: insets.bottom + 12 }}
      >
        <Button
          title={t('checkout.confirm_payment')}
          onPress={() => router.push('/checkout/review-summary')}
        />
      </View>
    </View>
  );
}
