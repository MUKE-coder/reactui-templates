import { z } from 'zod';

export const completeProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  gender: z.string().min(1, 'Please select a gender'),
});

export type CompleteProfileFormData = z.infer<typeof completeProfileSchema>;

export const editProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  email: z.string().email('Invalid email address'),
  gender: z.string().min(1, 'Please select a gender'),
});

export type EditProfileFormData = z.infer<typeof editProfileSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords must match',
    path: ['confirmNewPassword'],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
