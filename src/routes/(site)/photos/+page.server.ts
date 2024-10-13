import type { PageServerLoad } from './$types';
import { prisma } from '$lib/db';
import { blurhashToCssGradientString } from '@unpic/placeholder';

export const load: PageServerLoad = async () => {
	const photos = await prisma().media.findMany({
		where: {
			type: "galleryPhoto"
		}
	});

	const photos2 = [];
	for (const photo of photos) {
		const url = new URL(photo.url);
		if (url.searchParams.has("w") && url.searchParams.has("h") && url.searchParams.has("bh")) {
			photos2.push({
				w: Number.parseInt(url.searchParams.get("w")!),
				h: Number.parseInt(url.searchParams.get("h")!),
				bh: blurhashToCssGradientString(url.searchParams.get("bh")!),
				photo
			});
		} else {
			photos2.push({
				w: 0,
				h: 0,
				bh: "",
				photo
			});
		}
	}

	return {
		photos2
	};
};
