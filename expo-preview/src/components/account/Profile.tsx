import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { colors } from '@/lib/theme';
import Avatar from '@/components/ui/Avatar';
import BottomSheet from '@/components/ui/BottomSheet';
import Button from '@/components/ui/Button';

const MENU_ITEMS = [
  { key: 'your_profile', icon: 'person-outline', route: '/profile/edit' },
  { key: 'manage_address', icon: 'location-outline', route: '/profile/addresses' },
  { key: 'payment_methods', icon: 'card-outline', route: '/profile/payment-methods' },
  { key: 'my_orders', icon: 'receipt-outline', route: '/orders' },
  { key: 'my_coupons', icon: 'pricetag-outline', route: '/profile/coupons' },
  { key: 'my_wallet', icon: 'wallet-outline', route: '/profile/wallet' },
  { key: 'settings', icon: 'settings-outline', route: '/profile/settings' },
  { key: 'help_center', icon: 'help-circle-outline', route: '/profile/help' },
] as const;

export default function ProfileScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    setShowLogout(false);
    logout();
    router.replace('/auth/login');
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <Text className="text-[22px] font-bold text-neutral-900 px-4 py-3">
        {t('profile.title')}
      </Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Avatar */}
        <View className="items-center py-4">
          <Avatar source={user?.avatar} name={user?.name} size="lg" />
          <Text className="text-[18px] font-semibold text-neutral-900 mt-3">
            {user?.name ?? 'User'}
          </Text>
        </View>

        {/* Menu */}
        <View className="px-4">
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.key}
              className="flex-row items-center py-4 border-b border-neutral-100"
              onPress={() => router.push(item.route as string)}
              accessibilityLabel={t(`profile.${item.key}`)}
            >
              <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={22} color={colors.primary.DEFAULT} />
              <Text className="flex-1 text-[14px] text-neutral-900 ml-3">
                {t(`profile.${item.key}`)}
              </Text>
              <Ionicons name="chevron-forward" size={18} color={colors.neutral[500]} />
            </TouchableOpacity>
          ))}

          {/* Logout */}
          <TouchableOpacity
            className="flex-row items-center py-4"
            onPress={() => setShowLogout(true)}
            accessibilityLabel="Logout"
          >
            <Ionicons name="log-out-outline" size={22} color={colors.error} />
            <Text className="flex-1 text-[14px] text-error ml-3">
              {t('profile.logout')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomSheet visible={showLogout} onClose={() => setShowLogout(false)}>
        <View className="items-center">
          <Text className="text-[18px] font-semibold text-neutral-900 mb-2">
            {t('profile.logout')}
          </Text>
          <Text className="text-[14px] text-neutral-500 mb-6">
            {t('profile.logout_confirm')}
          </Text>
          <View className="flex-row gap-3 w-full">
            <View className="flex-1">
              <Button title={t('common.cancel')} variant="secondary" onPress={() => setShowLogout(false)} />
            </View>
            <View className="flex-1">
              <Button title={t('profile.yes_logout')} variant="destructive" onPress={handleLogout} />
            </View>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}
