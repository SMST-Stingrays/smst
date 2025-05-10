import type { PageServerLoad, Actions } from './$types';
import { EDITOR } from '$lib/permissions';
import { redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db';
import { loadUser } from '$lib/auth';

export const load: PageServerLoad = async ({ params, parent }) => {
	const { user } = await parent();
	if (!user || user.permissionLevel < EDITOR) {
		return redirect(307, '/dashboard');
	}

	const page = await prisma().page.findUnique({
		where: {
			id: Number.parseInt(params.id)
		}
	});

	if (!page) {
		return redirect(307, '/dashboard/editor');
	}

	return {
		title: `Editing ${page.name}`,
		page,
		sponsors: await prisma().sponsor.findMany({})
	};
};

export const actions: Actions = {
	default: async (event) => {
		const user = await loadUser(event.cookies);
		if (!user || user.permissionLevel < EDITOR) {
			return redirect(307, '/dashboard');
		}
		const data = await event.request.formData();
		const newData = data.get('data')!;
		const newDataJ = JSON.parse(newData.toString());
		await prisma().page.update({
			where: {
				id: Number.parseInt(event.params.id)
			},
			data: {
				data: JSON.stringify(newDataJ)
			}
		});
		redirect(307, '/dashboard/editor');
	}
};
