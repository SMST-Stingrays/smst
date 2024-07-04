import { z } from 'zod';

export const formSchema = z.object({
	type: z.enum(['policy', 'photo', 'galleryPhoto']),
	file: z.instanceof(File, { message: 'Please upload a file.' }),
});

export type FormSchema = typeof formSchema;
