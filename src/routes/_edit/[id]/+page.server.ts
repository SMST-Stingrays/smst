import type { PageServerLoad, Actions } from "./$types";
import { EDITOR } from '$lib/permissions';
import { redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db';
import { loadUser } from '$lib/auth';

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

export const actions: Actions = {
	default: async (event) => {
		let user = await loadUser(event.cookies);
		if (!user || user.permissionLevel < EDITOR) {
			return redirect(307, "/dashboard");
		}
		let data = await event.request.formData();
		let newData = data.get("data")!;
		let newDataJ = JSON.parse(newData.toString());
		await prisma.page.update({
			where: {
				id: Number.parseInt(event.params.id)
			},
			data: {
				data: JSON.stringify(newDataJ)
			}
		});
		redirect(307, '/dashboard/editor');
	}
}