import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { loginSchema, type LoginFormData } from '@/lib/validators/authSchemas';
import { useAuthStore } from '@/stores/authStore';
import { colors } from '@/lib/theme';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Divider from '@/components/ui/Divider';
import { BrandLogo, AuthGradient } from './_brand';

export default function LoginScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const setToken = useAuthStore((s) => s.setToken);
  const setUser = useAuthStore((s) => s.setUser);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginFormData) => {
    await new Promise((r) => setTimeout(r, 1000));
    setToken('mock-jwt-token');
    setUser({
      id: 'u1',
      name: 'Esther Howard',
      email: data.email,
      phone: '+1 (555) 123-4567',
      gender: 'Female',
      avatar: 'https://picsum.photos/seed/u1/200/200',
      location: 'New York, USA',
    });
    router.replace('/(tabs)');
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
          {t('auth.sign_in')}
        </Text>
        <Text className="text-[15px] text-neutral-500 mb-8" style={{ lineHeight: 22 }}>
          {t('auth.sign_in_subtitle')}
        </Text>

        <View className="gap-4 mb-2">
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder={t('auth.email_placeholder')}
                leftIcon="mail-outline"
                keyboardType="email-address"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                error={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder={t('auth.password_placeholder')}
                leftIcon="lock-closed-outline"
                isPassword
                value={value}
                onChangeText={onChange}
                error={errors.password?.message}
              />
            )}
          />
        </View>

        <TouchableOpacity
          className="self-end mb-6"
          onPress={() => router.push('/auth/forgot-password')}
          accessibilityLabel="Forgot password"
        >
          <Text className="text-[14px] font-semibold text-primary">
            {t('auth.forgot_password')}
          </Text>
        </TouchableOpacity>

        <Button
          title={t('auth.sign_in')}
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
        />

        <Divider label={t('auth.sign_in_with')} />

        <View className="flex-row justify-center gap-4">
          {(['logo-apple', 'logo-google', 'logo-facebook'] as const).map(
            (icon) => (
              <TouchableOpacity
                key={icon}
                className="w-14 h-14 rounded-full border border-neutral-300 items-center justify-center"
                accessibilityLabel={`Sign in with ${icon.replace('logo-', '')}`}
              >
                <Ionicons name={icon} size={24} color={colors.neutral[900]} />
              </TouchableOpacity>
            )
          )}
        </View>

        <View className="flex-row justify-center mt-6">
          <Text className="text-[14px] text-neutral-500">
            {t('auth.dont_have_account')}{' '}
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/auth/register')}
            accessibilityLabel="Sign up"
          >
            <Text className="text-[14px] font-semibold text-primary">
              {t('auth.sign_up')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
