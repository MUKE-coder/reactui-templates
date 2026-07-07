import React from 'react';
import { ScrollView, Pressable, Text, type ViewStyle } from 'react-native';

interface SidebarMenuProps {
  items: { id: string; name: string }[];
  activeId: string;
  onSelect: (id: string) => void;
}

export default function SidebarMenu({
  items,
  activeId,
  onSelect,
}: SidebarMenuProps) {
  return (
    <ScrollView
      className="w-[110px] bg-[#FAFAFA]"
      showsVerticalScrollIndicator={false}
    >
      {items.map((item) => {
        const isActive = item.id === activeId;

        return (
          <Pressable
            key={item.id}
            onPress={() => onSelect(item.id)}
            accessibilityRole="button"
            accessibilityLabel={item.name}
            accessibilityState={{ selected: isActive }}
            className={`py-3 px-3 ${
              isActive
                ? 'bg-white border-l-[3px] border-black'
                : ''
            }`}
            style={({ pressed }: { pressed: boolean }): ViewStyle => ({
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text
              className={`text-[13px] ${
                isActive
                  ? 'font-bold text-black'
                  : 'text-[#4A4A4A]'
              }`}
            >
              {item.name}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
