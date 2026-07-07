import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  type ViewToken,
} from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { colors } from '@/lib/theme';
import Button from '@/components/ui/Button';
import { BrandLogo, AuthGradient } from './_brand';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    titleKey: 'onboarding.slide1_title',
    subtitleKey: 'onboarding.slide1_subtitle',
    image: 'https://picsum.photos/seed/onboard1/400/400',
  },
  {
    id: '2',
    titleKey: 'onboarding.slide2_title',
    subtitleKey: 'onboarding.slide2_subtitle',
    image: 'https://picsum.photos/seed/onboard2/400/400',
  },
  {
    id: '3',
    titleKey: 'onboarding.slide3_title',
    subtitleKey: 'onboarding.slide3_subtitle',
    image: 'https://picsum.photos/seed/onboard3/400/400',
  },
];

export default function OnboardingScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const setHasSeenOnboarding = useAuthStore((s) => s.setHasSeenOnboarding);
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setActiveIndex(viewableItems[0].index);
      }
    }
  ).current;

  const handleSkip = () => {
    setHasSeenOnboarding(true);
    router.replace('/auth/register');
  };

  const handleNext = () => {
    if (activeIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: activeIndex + 1 });
    } else {
      handleSkip();
    }
  };

  const handleBack = () => {
    if (activeIndex > 0) {
      flatListRef.current?.scrollToIndex({ index: activeIndex - 1 });
    }
  };

  return (
    <View className="flex-1" style={{ paddingTop: insets.top }}>
      <AuthGradient />
      <View className="flex-row items-center justify-between px-6 py-3">
        <BrandLogo align="left" />
        <TouchableOpacity onPress={handleSkip} accessibilityLabel="Skip onboarding">
          <Text className="text-[14px] font-semibold text-neutral-500">
            {t('common.skip')}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        className="flex-1"
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{ width: SCREEN_WIDTH }}
            className="flex-1 items-center justify-center px-8"
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: SCREEN_WIDTH * 0.62, height: SCREEN_WIDTH * 0.62 }}
              contentFit="cover"
              className="rounded-3xl"
            />
            <Text className="text-[22px] font-bold text-neutral-900 text-center mt-10">
              {t(item.titleKey)}
            </Text>
            <Text
              className="text-[14px] text-neutral-500 text-center mt-3"
              style={{ lineHeight: 20 }}
            >
              {t(item.subtitleKey)}
            </Text>
          </View>
        )}
      />

      <View className="px-8 pb-4" style={{ paddingBottom: insets.bottom + 16 }}>
        <View className="flex-row items-center justify-center mb-6 gap-2">
          {slides.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => flatListRef.current?.scrollToIndex({ index })}
              accessibilityLabel={`Go to slide ${index + 1}`}
              hitSlop={{ top: 12, bottom: 12, left: 6, right: 6 }}
            >
              <View
                className={`h-2 rounded-full ${
                  index === activeIndex ? 'w-6 bg-primary' : 'w-2 bg-neutral-300'
                }`}
              />
            </TouchableOpacity>
          ))}
        </View>

        {activeIndex === 0 ? (
          <View>
            <Button
              title={t('onboarding.get_started')}
              onPress={handleNext}
            />
            <View className="flex-row justify-center mt-4">
              <Text className="text-[14px] text-neutral-500">
                {t('onboarding.already_have_account')}{' '}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setHasSeenOnboarding(true);
                  router.replace('/auth/login');
                }}
                accessibilityLabel="Sign in"
              >
                <Text className="text-[14px] font-semibold text-primary">
                  {t('onboarding.sign_in')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              onPress={handleBack}
              className="w-12 h-12 rounded-full bg-neutral-100 items-center justify-center"
              accessibilityLabel="Previous slide"
            >
              <Ionicons name="arrow-back" size={20} color={colors.neutral[700]} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleNext}
              className="w-12 h-12 rounded-full bg-primary items-center justify-center"
              accessibilityLabel="Next slide"
            >
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
