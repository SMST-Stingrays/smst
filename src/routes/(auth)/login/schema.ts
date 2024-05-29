import { z } from "zod";

export const formSchema = z.object({
	username: z.string().min(2),
	password: z.string(),
});

export type FormSchema = typeof formSchema;