import type { LayoutServerLoad } from './$types';
import { loadUser } from '$lib/auth';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const user = await loadUser(cookies);
	return {
		user
	};
};
