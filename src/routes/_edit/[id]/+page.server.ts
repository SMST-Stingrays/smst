import type { PageServerLoad } from "./$types";
import { EDITOR } from '$lib/permissions';
import { redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db';

export const load: PageServerLoad = async ({params, parent}) => {
	let { user } = await parent();
	if (!user || user.permissionLevel < EDITOR) {
		return redirect(307, "/dashboard");
	}

	let page = await prisma.page.findUnique({
		where: {
			id: Number.parseInt(params.id)
		}
	});

	if (!page) {
		return redirect(307, "/dashboard/editor");
	}

	return {
		title: `Editing ${page.name}`,
		page,
	}
}