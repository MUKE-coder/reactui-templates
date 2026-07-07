import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import {
  newPasswordSchema,
  type NewPasswordFormData,
} from '@/lib/validators/authSchemas';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { BrandLogo, AuthGradient } from './_brand';

export default function NewPasswordScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewPasswordFormData>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 1000));
    router.replace('/auth/login');
  };

  return (
    <View className="flex-1" style={{ paddingTop: 20 }}>
      <AuthGradient />
      <ScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}
      >
        <BrandLogo align="left" />
        <Text className="text-[30px] font-extrabold text-neutral-900 mt-8 mb-2">
          {t('auth.new_password')}
        </Text>
        <Text className="text-[15px] text-neutral-500 mb-8" style={{ lineHeight: 22 }}>
          {t('auth.new_password_subtitle')}
        </Text>

        <View className="gap-4">
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
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder={t('auth.confirm_password_placeholder')}
                leftIcon="lock-closed-outline"
                isPassword
                value={value}
                onChangeText={onChange}
                error={errors.confirmPassword?.message}
              />
            )}
          />
        </View>

        <View className="mt-6">
          <Button
            title={t('auth.create_new_password')}
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
          />
        </View>
      </ScrollView>
    </View>
  );
}
