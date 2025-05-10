import { z } from 'zod';

export const formSchema = z.object({
	name: z.string(),

	logoUrl: z.string().url(),
	sponsorUrl: z.string().url(),
});

export type FormSchema = typeof formSchema;
