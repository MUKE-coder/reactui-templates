import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { editProfileSchema, type EditProfileFormData } from '@/lib/validators/profileSchemas';
import { useAuthStore } from '@/stores/authStore';
import ScreenHeader from '@/components/shared/ScreenHeader';
import Avatar from '@/components/ui/Avatar';
import Input from '@/components/ui/Input';
import SearchableSelect from '@/components/ui/SearchableSelect';
import Button from '@/components/ui/Button';

export default function EditProfileScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const user = useAuthStore((s) => s.user);

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: { name: user?.name ?? '', phone: user?.phone ?? '', email: user?.email ?? '', gender: user?.gender ?? '' },
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 500));
    router.back();
  };

  const genderOptions = [
    { label: t('auth.gender_male'), value: 'Male' },
    { label: t('auth.gender_female'), value: 'Female' },
    { label: t('auth.gender_other'), value: 'Other' },
  ];

  return (
    <View className="flex-1 bg-white">
      <ScreenHeader title={t('profile.your_profile')} />
      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}>
        <View className="items-center mb-6">
          <View className="relative">
            <Avatar source={user?.avatar} size="xl" name={user?.name} />
            <TouchableOpacity className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary items-center justify-center" accessibilityLabel="Change photo">
              <Ionicons name="pencil" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="gap-4">
          <Controller control={control} name="name" render={({ field: { onChange, value } }) => (
            <Input label={t('auth.name_placeholder')} value={value} onChangeText={onChange} error={errors.name?.message} />
          )} />
          <Controller control={control} name="phone" render={({ field: { onChange, value } }) => (
            <Input label={t('auth.phone_placeholder')} keyboardType="phone-pad" value={value} onChangeText={onChange} error={errors.phone?.message} />
          )} />
          <Controller control={control} name="email" render={({ field: { onChange, value } }) => (
            <Input label="Email" keyboardType="email-address" value={value} onChangeText={onChange} error={errors.email?.message} />
          )} />
          <Controller control={control} name="gender" render={({ field: { onChange, value } }) => (
            <SearchableSelect label={t('auth.gender_placeholder')} options={genderOptions} value={value} onChange={onChange} error={errors.gender?.message} />
          )} />
        </View>
        <View className="mt-6">
          <Button title={t('profile.update')} onPress={handleSubmit(onSubmit)} loading={isSubmitting} />
        </View>
      </ScrollView>
    </View>
  );
}
