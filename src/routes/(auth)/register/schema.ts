import { z } from 'zod';

export const formSchema = z.object({
	username: z.string().min(2),
	password: z.string(),
	password_confirm: z.string(),
	first_name: z.string(),
	last_name: z.string()
});

export type FormSchema = typeof formSchema;
