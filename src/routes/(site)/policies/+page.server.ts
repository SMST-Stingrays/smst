import type {PageServerLoad} from "./$types";
import { prisma } from '$lib/db';

export const load: PageServerLoad = async () => {
	const policies = await prisma.policy.findMany({});
	return {
		policies
	}
}