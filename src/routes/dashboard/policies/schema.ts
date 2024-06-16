import { z } from "zod";

export const formSchema = z.object({
	code: z.string(),
	title: z.string(),
	url: z.string().url()
});

export type FormSchema = typeof formSchema;