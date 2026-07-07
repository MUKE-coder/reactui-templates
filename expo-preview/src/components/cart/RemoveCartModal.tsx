import React from 'react';
import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import BottomSheet from '@/components/ui/BottomSheet';
import Button from '@/components/ui/Button';
import type { CartItem } from '@/stores/cartStore';

interface RemoveCartModalProps {
  visible: boolean;
  item: CartItem | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function RemoveCartModal({
  visible,
  item,
  onClose,
  onConfirm,
}: RemoveCartModalProps) {
  const { t } = useTranslation();

  if (!item) return null;

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <View className="items-center">
        <Text className="text-[18px] font-semibold text-neutral-900 mb-4">
          {t('cart.remove_from_cart')}
        </Text>
        <View className="flex-row items-center w-full py-3">
          <Image
            source={{ uri: item.image }}
            style={{ width: 80, height: 80, borderRadius: 8 }}
            contentFit="cover"
          />
          <View className="flex-1 ml-3">
            <Text className="text-[14px] font-semibold text-neutral-900">
              {item.name}
            </Text>
            <Text className="text-[12px] text-neutral-500">{item.category}</Text>
            <Text className="text-[16px] font-bold text-neutral-900 mt-1">
              ${item.price.toFixed(2)}
            </Text>
          </View>
        </View>
        <View className="flex-row gap-3 mt-4 w-full">
          <View className="flex-1">
            <Button
              title={t('common.cancel')}
              variant="secondary"
              onPress={onClose}
            />
          </View>
          <View className="flex-1">
            <Button
              title={t('cart.yes_remove')}
              variant="destructive"
              onPress={onConfirm}
            />
          </View>
        </View>
      </View>
    </BottomSheet>
  );
}
