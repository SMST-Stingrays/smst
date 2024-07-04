import { z } from 'zod';

export const updateFormSchema = z.object({
	id: z.number(),
	first_name: z.string(),
	last_name: z.string(),
	username: z.string(),
	permissionLevel: z.number(),
});

export type UpdateFormSchema = typeof updateFormSchema;
