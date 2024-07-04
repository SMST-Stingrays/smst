import { z } from 'zod';

export const resetFormSchema = z.object({
	id: z.number(),
	password: z.string()
});

export type ResetFormSchema = typeof resetFormSchema;
