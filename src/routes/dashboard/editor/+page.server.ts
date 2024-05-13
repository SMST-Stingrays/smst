import type { PageServerLoad } from "./$types";
import { EDITOR } from '$lib/permissions';
import { redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db';

export const load: PageServerLoad = async ({parent}) => {
	let { user } = await parent();
	if (!user || user.permissionLevel < EDITOR) {
		return redirect(307, "/dashboard");
	}

	let pages = await prisma.page.findMany({});

	return {
		title: "Page Editor",
		pages
	}
}