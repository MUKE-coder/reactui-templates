import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import {
  registerSchema,
  type RegisterFormData,
} from '@/lib/validators/authSchemas';
import { colors } from '@/lib/theme';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Divider from '@/components/ui/Divider';
import { BrandLogo, AuthGradient } from './_brand';

export default function RegisterScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', agreeTerms: false },
  });

  const onSubmit = async (data: RegisterFormData) => {
    await new Promise((r) => setTimeout(r, 1000));
    router.push('/auth/verify-otp');
  };

  return (
    <View className="flex-1" style={{ paddingTop: 20 }}>
      <AuthGradient />
      <ScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}
      >
        <BrandLogo align="left" />
        <Text className="text-[30px] font-extrabold text-neutral-900 mt-8 mb-2">
          {t('auth.create_account')}
        </Text>
        <Text className="text-[15px] text-neutral-500 mb-8" style={{ lineHeight: 22 }}>
          {t('auth.create_account_subtitle')}
        </Text>

        <View className="gap-4 mb-4">
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder={t('auth.name_placeholder')}
                leftIcon="person-outline"
                value={value}
                onChangeText={onChange}
                error={errors.name?.message}
              />
            )}
          />
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

        <Controller
          control={control}
          name="agreeTerms"
          render={({ field: { onChange, value } }) => (
            <View>
              <TouchableOpacity
                className="flex-row items-center mb-1"
                onPress={() => onChange(!value)}
                accessibilityLabel="Agree to terms"
              >
                <View
                  className={`w-5 h-5 rounded border mr-2 items-center justify-center ${
                    value ? 'bg-primary border-primary' : 'border-neutral-300'
                  }`}
                >
                  {value && (
                    <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                  )}
                </View>
                <Text className="text-[14px] text-neutral-700">
                  {t('auth.agree_terms')}{' '}
                </Text>
                <TouchableOpacity accessibilityLabel="Terms and conditions">
                  <Text className="text-[14px] font-semibold text-primary">
                    {t('auth.terms_condition')}
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
              {errors.agreeTerms && (
                <Text className="text-[12px] text-error">
                  {errors.agreeTerms.message}
                </Text>
              )}
            </View>
          )}
        />

        <View className="mt-6">
          <Button
            title={t('auth.sign_up')}
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
          />
        </View>

        <Divider label={t('auth.sign_up_with')} />

        <View className="flex-row justify-center gap-4">
          {(['logo-apple', 'logo-google', 'logo-facebook'] as const).map(
            (icon) => (
              <TouchableOpacity
                key={icon}
                className="w-14 h-14 rounded-full border border-neutral-300 items-center justify-center"
                accessibilityLabel={`Sign up with ${icon.replace('logo-', '')}`}
              >
                <Ionicons name={icon} size={24} color={colors.neutral[900]} />
              </TouchableOpacity>
            )
          )}
        </View>

        <View className="flex-row justify-center mt-6">
          <Text className="text-[14px] text-neutral-500">
            {t('auth.already_have_account')}{' '}
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/auth/login')}
            accessibilityLabel="Sign in"
          >
            <Text className="text-[14px] font-semibold text-primary">
              {t('auth.sign_in')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
