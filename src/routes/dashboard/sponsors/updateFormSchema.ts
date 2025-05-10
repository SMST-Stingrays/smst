import { z } from 'zod';

export const updateFormSchema = z.object({
	id: z.number(),
	name: z.string(),
	sponsorLink: z.string().url(),
	logoUrl: z.string().url()
});

export type UpdateFormSchema = typeof updateFormSchema;
