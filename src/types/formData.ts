import { z } from 'zod';

export const formDataSchema = z.object({
	budget: z.number().min(1),
	location: z.string().min(3),
	dPreferences: z.string().min(3),
	dRestrictions: z.string().min(3),
	cPreferences: z.optional(z.string())
});

export type FormData = z.infer<typeof formDataSchema>;
