import type { PageServerLoad, Actions } from "./$types";
import { EDITOR } from '$lib/permissions';
import { loadUser } from '$lib/auth';
import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
import type { PageTree } from '$lib/dynamicSlot';

export const load: PageServerLoad = async ({parent}) => {
	let { user } = await parent();
	if (!user || user.permissionLevel < EDITOR) {
		return redirect(307, "/dashboard");
	}

	let pages = await prisma.page.findMany({});

	return {
		title: "Page Editor",
		pages,
		form: await superValidate(zod(formSchema))
	}
}

export const actions: Actions = {
	default: async (event) => {
		let form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		let user = await loadUser(event.cookies);
		if (!user) {
			return fail(401, { form });
		}
		if (user.permissionLevel < EDITOR) {
			return fail(401, { form });
		}

		// check if the slug exists already
		let existingSlug = await prisma.page.findUnique({
			where: {
				slug: form.data.slug
			}
		});
		if (existingSlug) {
			return setError(form, 'slug', 'This slug is already in use.');
		}

		let pageData: PageTree = {
			components: []
		};

		await prisma.page.create({
			data: {
				name: form.data.name,
				slug: form.data.slug,
				data: JSON.stringify(pageData)
			}
		});
	}
}