import {z} from 'zod';

export const invoiceFormSchema = z.object({
  bill_from: z.object({
    id: z.string().optional(),
    invoice_id: z.string().optional(),
    street_address: z.string().min(1, 'Address is required').max(100, 'Address is too long'),
    city: z.string().min(1, 'City is required').max(50, 'City name is too long'),
    post_code: z.coerce.number().int().gte(1000,).lte(99999),
    country: z.string().min(1, 'Country is required').max(50, 'Country name is too long'),
  }),

  bill_to: z.object({
    id: z.string().optional(),
    invoice_id: z.string().optional(),
    client_name: z.string().min(1, 'Name is required').max(70, 'Name is too long'),
    client_email: z.string().min(3, 'Email is too short',).email('Invalid email').max(254, 'Email is too long'),
    street_address: z.string().min(1, 'Address is required').max(100, 'Address is too long'),
    city: z.string().min(1, 'City is required').max(50, 'City name is too long'),
    post_code: z.coerce.number().int().gte(1000,).lte(99999),
    country: z.string().min(1, 'Country is required').max(50, 'Country name is too long'),
  }),

  invoice_details: z.object({
    id: z.string().optional(),
    custom_id: z.string().optional(),
    uid: z.string().optional(),
    invoice_date: z.date(),
    due_date: z.date().optional(),
    payment_terms: z.string(),
    project_description: z.string().min(1, 'Project description required').max(30, 'Description too long'),
    status: z.string().optional(),
    total: z.coerce.number().multipleOf(0.01).optional(),
    type: z.string().optional()
  }),

  item_list: z.array(z.object({
    id: z.string().optional(),
    invoice_id: z.string().optional(),
    name: z.string().min(1, 'Item name required').max(20, 'Item name too long'),
    quantity: z.coerce.number().int().lte(99),
    price: z.coerce.number().positive().multipleOf(0.01),
  })).optional()

});
