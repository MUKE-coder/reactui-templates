import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  useWindowDimensions,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from 'react-native';
import { Image } from 'expo-image';

interface BannerItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  bgColor: string;
}

interface HeroBannerProps {
  banners: BannerItem[];
  onBannerPress: (id: string) => void;
}

export default function HeroBanner({
  banners,
  onBannerPress,
}: HeroBannerProps) {
  const { width: screenWidth } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const bannerWidth = screenWidth - 32; // mx-4 = 16px each side

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = e.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / screenWidth);
      setActiveIndex(index);
    },
    [screenWidth],
  );

  return (
    <View className="mt-3">
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
      >
        {banners.map((banner) => (
          <Pressable
            key={banner.id}
            onPress={() => onBannerPress(banner.id)}
            style={{ width: screenWidth }}
          >
            <View
              className="mx-4 overflow-hidden rounded-[12px]"
              style={{
                aspectRatio: 16 / 7,
                backgroundColor: banner.bgColor,
              }}
            >
              <Image
                source={{ uri: banner.image }}
                style={{ width: '100%', height: '100%' }}
                contentFit="cover"
              />

              {/* Overlay */}
              <View className="absolute bottom-0 left-0 right-0 bg-black/30 px-4 py-3">
                <Text className="text-[20px] font-bold text-white">
                  {banner.title}
                </Text>
                <Text className="text-[14px] text-white">
                  {banner.subtitle}
                </Text>

                <View className="mt-2 self-start rounded-full bg-white px-4 py-1.5">
                  <Text className="text-[12px] font-semibold text-black">
                    {banner.cta}
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {/* Pagination dots */}
      {banners.length > 1 && (
        <View className="mt-2 flex-row items-center justify-center gap-1.5">
          {banners.map((banner, index) => (
            <View
              key={banner.id}
              className={`h-[8px] w-[8px] rounded-full ${
                index === activeIndex ? 'bg-primary' : 'bg-[#D1D1D1]'
              }`}
            />
          ))}
        </View>
      )}
    </View>
  );
}
