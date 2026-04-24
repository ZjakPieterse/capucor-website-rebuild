import { z } from 'zod';

export const LeadSchema = z.object({
  source: z.enum(['signup', 'quote', 'enterprise', 'contact', 'call']),
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Please enter a valid email address'),
  business: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  message: z.string().max(2000).optional(),
  config: z.record(z.string(), z.unknown()).optional(),
  consent_given: z.literal(true, {
    message: 'You must consent before submitting.',
  }),
  website: z.string().max(0).optional(), // honeypot — must be empty
});

export type LeadInput = z.infer<typeof LeadSchema>;

export const RevalidateSchema = z.object({
  secret: z.string().min(1),
});
