import type { PageServerLoad } from './$types';
import { prisma } from '$lib/db';
import { blurhashToCssGradientString } from '@unpic/placeholder';

export const load: PageServerLoad = async () => {
	const photos = await prisma().media.findMany({
		where: {
			type: "galleryPhoto"
		}
	});

	const randomPhotoIndicies: number[] = [];
	for (let i = 0; i < 10; i++) {
		const thisPhoto = Math.floor(Math.random() * photos.length);
		if (randomPhotoIndicies.includes(thisPhoto)) {
			i--;
			continue;
		}
		randomPhotoIndicies.push(thisPhoto);
	}

	const photosRandom = [];
	for (const idx of randomPhotoIndicies) {
		photosRandom.push(photos[idx]);
	}

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

	let cols = [
		[],[],[]
	];
	for (let i = 0; i < photos2.length; i++) {
		cols[i % 3].push(photos2[i]);
	}

	return {
		photos2,
		cols
	};
};
