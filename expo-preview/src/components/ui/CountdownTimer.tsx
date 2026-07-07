import React, { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';

interface CountdownTimerProps {
  endTime: Date;
  onEnd?: () => void;
}

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

function getTimeRemaining(endTime: Date): {
  hours: string;
  minutes: string;
  seconds: string;
  isEnded: boolean;
} {
  const diff = Math.max(0, endTime.getTime() - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
    isEnded: diff <= 0,
  };
}

export default function CountdownTimer({ endTime, onEnd }: CountdownTimerProps) {
  const [time, setTime] = useState(() => getTimeRemaining(endTime));

  const tick = useCallback(() => {
    const remaining = getTimeRemaining(endTime);
    setTime(remaining);
    if (remaining.isEnded) {
      onEnd?.();
    }
    return remaining.isEnded;
  }, [endTime, onEnd]);

  useEffect(() => {
    if (time.isEnded) return;

    const interval = setInterval(() => {
      const ended = tick();
      if (ended) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [tick, time.isEnded]);

  if (time.isEnded) {
    return (
      <Text className="text-[14px] font-semibold text-[#EE1C24]">
        Sale Ended
      </Text>
    );
  }

  return (
    <View className="flex-row items-center">
      <View className="bg-primary px-2 py-1 rounded">
        <Text className="text-white font-bold text-[14px]">{time.hours}</Text>
      </View>
      <Text className="text-[14px] font-bold mx-1">:</Text>
      <View className="bg-primary px-2 py-1 rounded">
        <Text className="text-white font-bold text-[14px]">{time.minutes}</Text>
      </View>
      <Text className="text-[14px] font-bold mx-1">:</Text>
      <View className="bg-primary px-2 py-1 rounded">
        <Text className="text-white font-bold text-[14px]">{time.seconds}</Text>
      </View>
    </View>
  );
}
