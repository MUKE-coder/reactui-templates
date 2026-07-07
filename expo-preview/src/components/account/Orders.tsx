import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useOrders } from '@/hooks/useOrders';
import { useCartStore } from '@/stores/cartStore';
import ScreenHeader from '@/components/shared/ScreenHeader';
import OrderCard from '@/components/order/OrderCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import EmptyState from '@/components/ui/EmptyState';
import products from '@/mock/products.json';

type Tab = 'active' | 'completed' | 'cancelled';

export default function OrdersScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<Tab>('active');
  const { data: orders, isLoading } = useOrders(activeTab);
  const addItem = useCartStore((s) => s.addItem);

  const tabs: { key: Tab; label: string }[] = [
    { key: 'active', label: t('orders.active') },
    { key: 'completed', label: t('orders.completed') },
    { key: 'cancelled', label: t('orders.cancelled') },
  ];

  const getBadge = (status: Tab) => {
    switch (status) {
      case 'active': return { label: t('orders.track_order'), action: (id: string) => router.push(`/orders/track/${id}`) };
      case 'completed': return { label: t('orders.leave_review'), action: (id: string) => router.push(`/product/${orders?.find(o => o.id === id)?.items[0]?.productId}/leave-review`) };
      case 'cancelled': return { label: t('orders.re_order'), action: (id: string) => {
        const order = orders?.find(o => o.id === id);
        if (order) {
          order.items.forEach(item => {
            const product = products.find(p => p.id === item.productId);
            if (product) addItem({ productId: product.id, name: product.name, category: product.category, price: item.price, qty: item.qty, image: product.images[0] });
          });
        }
      }};
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ScreenHeader title={t('orders.title')} />

      {/* Tabs */}
      <View className="flex-row border-b border-neutral-100">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            onPress={() => setActiveTab(tab.key)}
            className={`flex-1 py-3 items-center ${
              activeTab === tab.key ? 'border-b-2 border-primary' : ''
            }`}
            accessibilityLabel={tab.label}
          >
            <Text
              className={`text-[14px] font-semibold ${
                activeTab === tab.key ? 'text-primary' : 'text-neutral-500'
              }`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {isLoading ? (
        <LoadingSpinner />
      ) : orders && orders.length > 0 ? (
        <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 20 }}>
          {orders.map((order) => {
            const product = products.find((p) => p.id === order.items[0]?.productId);
            const badge = getBadge(activeTab);
            if (!product) return null;
            return (
              <OrderCard
                key={order.id}
                productName={product.name}
                productImage={product.images[0]}
                category={product.category}
                qty={order.items[0].qty}
                price={order.total}
                badgeLabel={badge.label}
                onBadgePress={() => badge.action(order.id)}
              />
            );
          })}
        </ScrollView>
      ) : (
        <EmptyState
          icon="receipt-outline"
          title="No orders yet"
          subtitle="Your orders will appear here"
        />
      )}
    </View>
  );
}
