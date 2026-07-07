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
import addresses from '@/mock/addresses.json';

export default function ShippingAddressScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState(addresses[0].id);

  const options = addresses.map((addr) => ({
    label: addr.label,
    value: addr.id,
    subtitle: addr.address,
    icon: 'location-outline' as keyof typeof Ionicons.glyphMap,
  }));

  return (
    <View className="flex-1 bg-white">
      <ScreenHeader title={t('checkout.shipping_address')} />
      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <CustomRadio
          options={options}
          value={selected}
          onChange={setSelected}
        />

        <TouchableOpacity
          className="flex-row items-center justify-center py-4 mt-4 border-2 border-dashed border-neutral-300 rounded-xl"
          onPress={() => router.push('/checkout/add-address')}
          accessibilityLabel="Add new shipping address"
        >
          <Ionicons name="add" size={20} color={colors.primary.DEFAULT} />
          <Text className="text-[14px] font-semibold text-primary ml-2">
            {t('checkout.add_new_address')}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <View
        className="absolute bottom-0 left-0 right-0 bg-white border-t border-neutral-100 px-4 py-3"
        style={{ paddingBottom: insets.bottom + 12 }}
      >
        <Button title={t('common.apply')} onPress={() => router.back()} />
      </View>
    </View>
  );
}
