import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { colors } from '@/lib/theme';
import ScreenHeader from '@/components/shared/ScreenHeader';
import Button from '@/components/ui/Button';

const TRANSACTIONS = [
  { id: '1', name: 'Top Up', date: 'Today, 10:30 AM', amount: '+$500', color: 'text-success' },
  { id: '2', name: 'Nike Pegasus 39', date: 'Today, 08:15 AM', amount: '-$90', color: 'text-error' },
  { id: '3', name: 'Top Up', date: 'Yesterday, 04:00 PM', amount: '+$200', color: 'text-success' },
  { id: '4', name: 'Modern Sofa Chair', date: 'Yesterday, 01:30 PM', amount: '-$250', color: 'text-error' },
  { id: '5', name: 'Refund - Apple Watch', date: '22 Sep 2023, 09:00 AM', amount: '+$399', color: 'text-success' },
];

export default function WalletScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-white">
      <ScreenHeader title={t('wallet.title')} />
      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="bg-primary rounded-2xl p-5 mb-4">
          <View className="flex-row justify-between items-start">
            <Text className="text-white/70 text-[14px]">{t('wallet.wallet_balance')}</Text>
            <Ionicons name="wallet" size={24} color="#FFFFFF" />
          </View>
          <Text className="text-white text-[28px] font-bold mt-2">$12,000.00</Text>
        </View>
        <Button title={t('wallet.add_money')} onPress={() => router.push('/profile/wallet/add-money')} />
        <Text className="text-[16px] font-semibold text-neutral-900 mt-6 mb-3">{t('wallet.today')}</Text>
        {TRANSACTIONS.map((tx) => (
          <View key={tx.id} className="flex-row items-center py-3 border-b border-neutral-100">
            <View className="flex-1">
              <Text className="text-[14px] font-semibold text-neutral-900">{tx.name}</Text>
              <Text className="text-[12px] text-neutral-500">{tx.date}</Text>
            </View>
            <Text className={`text-[14px] font-bold ${tx.color}`}>{tx.amount}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
