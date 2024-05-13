import type { PageServerLoad } from "./$types";
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({parent}) => {
	let { user } = await parent();
	if (!user) {
		return redirect(307, "/");
	}

	return {
		title: "Dashboard"
	}
};