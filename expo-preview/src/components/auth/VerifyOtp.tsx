import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import OTPInput from '@/components/shared/OTPInput';
import Button from '@/components/ui/Button';
import { BrandLogo, AuthGradient } from './_brand';

export default function VerifyOTPScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [otp, setOtp] = useState('123456');
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(263); // 04:23

  useEffect(() => {
    const id = setInterval(
      () => setSeconds((s) => (s > 0 ? s - 1 : 0)),
      1000
    );
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  const handleVerify = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    router.push('/auth/new-password');
  };

  return (
    <View className="flex-1" style={{ paddingTop: 20 }}>
      <AuthGradient />
      <ScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
      >
        <BrandLogo align="left" />
        <Text className="text-[30px] font-extrabold text-neutral-900 mt-8 mb-2">
          {t('auth.verify_code')}
        </Text>
        <Text className="text-[15px] text-neutral-500 mb-8" style={{ lineHeight: 22 }}>
          {t('auth.verify_code_subtitle')}{' '}
          <Text className="font-semibold text-neutral-900">
            example@email.com
          </Text>
        </Text>

        <OTPInput initialValue="123456" onComplete={(code) => setOtp(code)} />

        <View className="flex-row justify-center mt-6">
          {seconds > 0 ? (
            <Text className="text-[14px] text-neutral-500">
              Resend code in{' '}
              <Text className="font-semibold text-neutral-900">
                {mm}:{ss}
              </Text>
            </Text>
          ) : (
            <>
              <Text className="text-[14px] text-neutral-500">
                {t('auth.didnt_receive_otp')}{' '}
              </Text>
              <TouchableOpacity
                onPress={() => setSeconds(263)}
                accessibilityLabel="Resend OTP code"
              >
                <Text className="text-[14px] font-semibold text-primary">
                  {t('auth.resend_code')}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <View className="mt-8">
          <Button
            title={t('auth.verify')}
            onPress={handleVerify}
            loading={loading}
            disabled={otp.length < 6}
          />
        </View>
      </ScrollView>
    </View>
  );
}
