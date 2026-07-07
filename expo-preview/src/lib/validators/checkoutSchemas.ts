import { z } from 'zod';

export const addAddressSchema = z.object({
  label: z.string().min(1, 'Address label is required'),
  address: z.string().min(5, 'Complete address is required'),
  floor: z.string().optional(),
  landmark: z.string().optional(),
});

export type AddAddressFormData = z.infer<typeof addAddressSchema>;

export const addCardSchema = z.object({
  cardHolderName: z.string().min(2, 'Card holder name is required'),
  cardNumber: z
    .string()
    .min(16, 'Card number must be 16 digits')
    .max(19, 'Card number is too long'),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry date (MM/YY)'),
  cvv: z.string().min(3, 'CVV must be 3 digits').max(4, 'CVV is too long'),
  saveCard: z.boolean().optional(),
});

export type AddCardFormData = z.infer<typeof addCardSchema>;
