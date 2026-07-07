import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/Button';

interface ReferralCodeCardProps {
  code: string;
  onCopy: () => void;
  onShare: () => void;
}

export default function ReferralCodeCard({
  code,
  onCopy,
  onShare,
}: ReferralCodeCardProps) {
  const { t } = useTranslation();

  return (
    <View className="bg-[#FAFAFA] border border-[#D1D1D1] rounded-[12px] p-4 mx-4">
      {/* Dashed code display */}
      <View className="border border-dashed border-[#D1D1D1] rounded-lg py-3 px-4 items-center">
        <Text className="text-[24px] font-bold text-black tracking-widest">
          {code}
        </Text>
      </View>

      {/* Buttons row */}
      <View className="flex-row gap-3 mt-4">
        <View className="flex-1">
          <Button
            title={t('referral.copyCode', 'Copy Code')}
            variant="secondary"
            onPress={onCopy}
            icon="copy-outline"
            fullWidth
          />
        </View>
        <View className="flex-1">
          <Button
            title={t('referral.share', 'Share')}
            variant="primary"
            onPress={onShare}
            icon="share-social-outline"
            fullWidth
          />
        </View>
      </View>
    </View>
  );
}
