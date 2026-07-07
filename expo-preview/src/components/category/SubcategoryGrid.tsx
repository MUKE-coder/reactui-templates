import React, { useMemo } from 'react';
import { View, Text, Pressable, ScrollView, type ViewStyle } from 'react-native';
import { Image } from 'expo-image';

interface SubcategoryItem {
  id: string;
  name: string;
  image: string;
  section: string;
}

interface SubcategoryGridProps {
  items: SubcategoryItem[];
  onItemPress: (id: string) => void;
}

export default function SubcategoryGrid({
  items,
  onItemPress,
}: SubcategoryGridProps) {
  const grouped = useMemo(() => {
    const map = new Map<string, SubcategoryItem[]>();
    for (const item of items) {
      const list = map.get(item.section) ?? [];
      list.push(item);
      map.set(item.section, list);
    }
    return map;
  }, [items]);

  return (
    <ScrollView
      className="flex-1 px-3"
      showsVerticalScrollIndicator={false}
    >
      {Array.from(grouped.entries()).map(([section, sectionItems]) => (
        <View key={section}>
          {/* Section title */}
          <Text className="text-[15px] font-semibold text-black mb-2 mt-4">
            {section}
          </Text>

          {/* 3-column grid */}
          <View className="flex-row flex-wrap">
            {sectionItems.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => onItemPress(item.id)}
                accessibilityRole="button"
                accessibilityLabel={item.name}
                className="w-1/3 items-center mb-4"
                style={({ pressed }: { pressed: boolean }): ViewStyle => ({
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <View className="w-[60px] h-[60px] rounded-full overflow-hidden bg-[#F5F5F5]">
                  <Image
                    source={{ uri: item.image }}
                    contentFit="cover"
                    placeholder={{ blurhash: 'L6PZfSi_.AyE_3t7t7R**0o#DgR4' }}
                    className="w-full h-full"
                    transition={200}
                  />
                </View>
                <Text
                  className="text-[11px] text-center text-[#4A4A4A] mt-1"
                  numberOfLines={2}
                >
                  {item.name}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
