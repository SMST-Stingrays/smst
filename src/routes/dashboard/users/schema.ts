import { z } from 'zod';

export const formSchema = z.object({
	first_name: z.string(),
	last_name: z.string(),
	username: z.string(),
	password: z.string(),
	permissionLevel: z.number(),
});

export type FormSchema = typeof formSchema;
