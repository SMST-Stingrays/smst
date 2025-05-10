import type { PageServerLoad } from './$types';
import { prisma } from '$lib/db';

export const load: PageServerLoad = async ({ params }) => {
	console.log("finding page...");
	const page = await prisma().page.findUnique({
		where: {
			slug: params.slug
		}
	});
	console.log("found!");

	if (!page) {
		return {
			title: 'Page not found',
			page: null
		};
	} else {
		return {
			title: page.name,
			page: {
				root: await JSON.parse(page.data),
				title: page.name,
				createdAt: page.createdAt,
				updatedAt: page.updatedAt,
			},
			sponsors: await prisma().sponsor.findMany({})
		};
	}
};
