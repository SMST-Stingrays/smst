import { z } from "zod";

export const formSchema = z.object({
	name: z.string(),
	slug: z.string(),
});

export type FormSchema = typeof formSchema;