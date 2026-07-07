import React from 'react';
import { View, Text } from 'react-native';
import { Image } from 'expo-image';

interface ChatBubbleProps {
  type: 'text' | 'image' | 'voice';
  text?: string;
  image?: string;
  duration?: number;
  isSent: boolean;
  timestamp: string;
  senderName?: string;
}

export default function ChatBubble({
  type,
  text,
  image,
  isSent,
  timestamp,
  senderName,
}: ChatBubbleProps) {
  const time = new Date(timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  if (type === 'image' && image) {
    return (
      <View className={`mb-3 ${isSent ? 'items-end' : 'items-start'} px-4`}>
        <View
          className={`rounded-2xl overflow-hidden max-w-[70%] ${
            isSent ? 'bg-primary' : 'bg-white'
          }`}
        >
          <Image
            source={{ uri: image }}
            style={{ width: 200, height: 150, borderRadius: 12 }}
            contentFit="cover"
          />
        </View>
        <Text className="text-[10px] text-neutral-500 mt-1">{time}</Text>
      </View>
    );
  }

  return (
    <View className={`mb-3 ${isSent ? 'items-end' : 'items-start'} px-4`}>
      {!isSent && senderName && (
        <Text className="text-[10px] text-neutral-500 mb-1 ml-1">
          {senderName}
        </Text>
      )}
      <View
        className={`rounded-2xl px-4 py-2.5 max-w-[75%] ${
          isSent
            ? 'bg-primary rounded-br-sm'
            : 'bg-white rounded-bl-sm'
        }`}
      >
        <Text
          className={`text-[14px] ${
            isSent ? 'text-white' : 'text-neutral-900'
          }`}
        >
          {text}
        </Text>
      </View>
      <Text className="text-[10px] text-neutral-500 mt-1">
        {time}
      </Text>
    </View>
  );
}
