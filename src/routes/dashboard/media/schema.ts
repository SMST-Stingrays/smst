import { z } from 'zod';

export const formSchema = z.object({
	type: z.enum(['policy', 'photo', 'galleryPhoto']),
	file: z.instanceof(File, { message: 'Please upload a file.' }).array().refine((files) => {
		const max = 104857600;
		let total = 0;
		for (const file of files) {
			total += file.size;
		}
		return total < max;
	}, "Files must be no more than 100MB total. Upload in multiple batches."),
});

export type FormSchema = typeof formSchema;
