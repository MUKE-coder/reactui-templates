import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/lib/theme';

interface TimelineStep {
  status: string;
  date: string;
  completed: boolean;
}

interface OrderTimelineProps {
  steps: TimelineStep[];
}

const stepIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
  'Order Placed': 'document-text-outline',
  'In Progress': 'cube-outline',
  'Shipped': 'car-outline',
  'Delivered': 'checkmark-circle-outline',
  'Cancelled': 'close-circle-outline',
};

export default function OrderTimeline({ steps }: OrderTimelineProps) {
  return (
    <View className="px-4">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const iconName = stepIcons[step.status] ?? 'ellipse-outline';

        return (
          <View key={index} className="flex-row">
            <View className="items-center mr-3">
              <View
                className={`w-8 h-8 rounded-full items-center justify-center ${
                  step.completed ? 'bg-primary' : 'bg-neutral-100'
                }`}
              >
                <Ionicons
                  name={step.completed ? 'checkmark' : (iconName as keyof typeof Ionicons.glyphMap)}
                  size={16}
                  color={step.completed ? colors.white : colors.neutral[500]}
                />
              </View>
              {!isLast && (
                <View
                  className={`w-0.5 flex-1 min-h-[32px] ${
                    step.completed ? 'bg-primary' : 'bg-neutral-300'
                  }`}
                />
              )}
            </View>
            <View className="flex-1 pb-4">
              <Text
                className={`text-[14px] font-semibold ${
                  step.completed ? 'text-neutral-900' : 'text-neutral-500'
                }`}
              >
                {step.status}
              </Text>
              <Text className="text-[12px] text-neutral-500 mt-0.5">
                {new Date(step.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>
            <View className="mt-1">
              <Ionicons
                name={iconName}
                size={20}
                color={step.completed ? colors.primary.DEFAULT : colors.neutral[300]}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
}
