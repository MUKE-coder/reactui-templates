import React from 'react';
import { View, Text, Pressable } from 'react-native';

interface CouponCardProps {
  discount: string;
  code: string;
  minSpend: string;
  note: string;
  onCopy: () => void;
}

export default function CouponCard({
  discount,
  code,
  minSpend,
  note,
  onCopy,
}: CouponCardProps) {
  return (
    <Pressable onPress={onCopy}>
      <View className="mx-4 rounded-[12px] border border-[#D1D1D1] bg-[#FAFAFA] p-4">
        <View className="flex-row items-center justify-between">
          {/* Left column */}
          <View className="flex-1">
            <Text className="text-[20px] font-bold text-black">
              {discount}
            </Text>
            <Text className="mt-1 text-[12px] text-[#888888]">{note}</Text>
          </View>

          {/* Right: code pill */}
          <View className="items-center">
            <View className="rounded-full bg-primary px-3 py-1.5">
              <Text className="text-[12px] font-semibold text-white">
                {code}
              </Text>
            </View>
            <Text className="mt-1 text-[10px] text-[#888888]">
              Tap to copy
            </Text>
          </View>
        </View>

        {/* Bottom */}
        <Text className="mt-3 text-[11px] text-[#888888]">
          {minSpend} &bull; T&amp;C Apply
        </Text>
      </View>
    </Pressable>
  );
}
