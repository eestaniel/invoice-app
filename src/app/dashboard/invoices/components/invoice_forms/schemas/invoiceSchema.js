import { z } from 'zod';

export const invoiceFormSchema = z.object({
  billFrom: z.object({
    address: z.string().min(1, 'Address is required').max(100, 'Address is too long'),
    city: z.string().min(1, 'City is required').max(50, 'City name is too long'),
    post_code: z.number().min(1000).max(99999),
    country: z.string().min(1, 'Country is required').max(50, 'Country name is too long')
  }),


});
