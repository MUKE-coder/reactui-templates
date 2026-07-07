import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';

interface ProductGalleryProps {
  images: string[];
}

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleThumbs = images.slice(0, 4);
  const extraCount = images.length - 4;

  return (
    <View>
      <Image
        source={{ uri: images[activeIndex] }}
        style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH * 0.75 }}
        contentFit="cover"
        placeholder={{ blurhash: 'LKO2?U%2Tw=w]~RBVZRi};RPxuwH' }}
        accessibilityLabel="Product image"
      />
      <View className="flex-row px-4 mt-3 gap-2">
        {visibleThumbs.map((img, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setActiveIndex(index)}
            className={`rounded-lg overflow-hidden border-2 ${
              activeIndex === index ? 'border-primary' : 'border-transparent'
            }`}
            accessibilityLabel={`Thumbnail ${index + 1}`}
          >
            <Image
              source={{ uri: img }}
              style={{ width: 56, height: 56 }}
              contentFit="cover"
            />
          </TouchableOpacity>
        ))}
        {extraCount > 0 && (
          <View className="w-[56px] h-[56px] rounded-lg bg-neutral-100 items-center justify-center">
            <Text className="text-[14px] font-semibold text-neutral-700">
              +{extraCount}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
