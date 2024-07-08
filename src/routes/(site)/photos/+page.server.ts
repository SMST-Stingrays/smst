import type { PageServerLoad } from './$types';
import { prisma } from '$lib/db';

export const load: PageServerLoad = async () => {
	const photos = await prisma().media.findMany({
		where: {
			type: "galleryPhoto"
		}
	});
	return {
		photos
	};
};
