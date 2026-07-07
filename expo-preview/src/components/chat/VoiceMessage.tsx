import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/lib/theme';

interface VoiceMessageProps {
  duration: number;
  isSent: boolean;
  timestamp: string;
}

export default function VoiceMessage({
  duration,
  isSent,
  timestamp,
}: VoiceMessageProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const time = new Date(timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const formattedDuration = `0:${duration.toString().padStart(2, '0')}`;

  return (
    <View className={`mb-3 ${isSent ? 'items-end' : 'items-start'} px-4`}>
      <View
        className={`flex-row items-center rounded-2xl px-4 py-2.5 ${
          isSent ? 'bg-primary' : 'bg-white'
        }`}
      >
        <TouchableOpacity
          onPress={() => setIsPlaying(!isPlaying)}
          accessibilityLabel={isPlaying ? 'Pause voice message' : 'Play voice message'}
        >
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={20}
            color={isSent ? colors.white : colors.primary.DEFAULT}
          />
        </TouchableOpacity>
        <View className="flex-row items-center mx-2 gap-0.5">
          {Array.from({ length: 20 }).map((_, i) => (
            <View
              key={i}
              className={`w-0.5 rounded-full ${
                isSent ? 'bg-white/60' : 'bg-neutral-300'
              }`}
              style={{ height: Math.random() * 16 + 4 }}
            />
          ))}
        </View>
        <Text
          className={`text-[12px] font-semibold ml-1 ${
            isSent ? 'text-white' : 'text-neutral-700'
          }`}
        >
          {formattedDuration}
        </Text>
      </View>
      <Text className="text-[10px] text-neutral-500 mt-1">{time}</Text>
    </View>
  );
}
