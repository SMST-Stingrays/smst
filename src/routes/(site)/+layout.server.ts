import type { LayoutServerLoad } from "./$types";
import { prisma } from '$lib/db';

export const load: LayoutServerLoad = async () => {
	return {
		pages: await prisma.page.findMany({})
	}
};