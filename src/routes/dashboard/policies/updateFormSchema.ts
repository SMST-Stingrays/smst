import { z } from 'zod';

export const updateFormSchema = z.object({
	id: z.number(),
	code: z.string(),
	title: z.string(),
	url: z.string().url()
});

export type UpdateFormSchema = typeof updateFormSchema;
