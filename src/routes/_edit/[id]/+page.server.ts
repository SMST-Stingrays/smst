import type { PageServerLoad, Actions } from "./$types";
import { EDITOR } from '$lib/permissions';
import { loadUser } from '$lib/auth';
import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageTree } from '$lib/dynamicSlot';

export const load: PageServerLoad = async ({parent, params}) => {
	let { user } = await parent();
	if (!user || user.permissionLevel < EDITOR) {
		return redirect(307, "/dashboard");
	}

	let page = await prisma.page.findUnique({
		where: {
			id: Number.parseInt(params.id)
		}
	});

	return {
		title: `Editing ${page?.name}`,
		page
	}
}