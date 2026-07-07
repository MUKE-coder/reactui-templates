import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

interface FlashSaleTimerProps {
  endTime?: number;
}

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return {
    hours: h.toString().padStart(2, '0'),
    minutes: m.toString().padStart(2, '0'),
    seconds: s.toString().padStart(2, '0'),
  };
}

export default function FlashSaleTimer({
  endTime = 2 * 3600 + 12 * 60 + 56,
}: FlashSaleTimerProps) {
  const [remaining, setRemaining] = useState(endTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const { hours, minutes, seconds } = formatTime(remaining);

  return (
    <View className="flex-row items-center gap-1">
      <TimeBox value={hours} />
      <Text className="text-[14px] font-bold text-neutral-900">:</Text>
      <TimeBox value={minutes} />
      <Text className="text-[14px] font-bold text-neutral-900">:</Text>
      <TimeBox value={seconds} />
    </View>
  );
}

function TimeBox({ value }: { value: string }) {
  return (
    <View className="bg-primary rounded-md px-1.5 py-0.5">
      <Text className="text-white text-[14px] font-bold">{value}</Text>
    </View>
  );
}
