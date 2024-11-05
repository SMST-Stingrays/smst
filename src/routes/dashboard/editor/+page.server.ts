import type { PageServerLoad, Actions } from './$types';
import { EDITOR } from '$lib/permissions';
import { loadUser } from '$lib/auth';
import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
import type { PageTree } from '$lib/dynamicSlot';

export const load: PageServerLoad = async ({ parent }) => {
	const { user } = await parent();
	if (!user || user.permissionLevel < EDITOR) {
		return redirect(307, '/dashboard');
	}

	const pages = await prisma().page.findMany({
		orderBy: [
			{ listPrio: 'asc' }
		]
	});

	return {
		title: 'Page Editor',
		pages,
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	create: async (event) => {
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		const user = await loadUser(event.cookies);
		if (!user) {
			return fail(401, { form });
		}
		if (user.permissionLevel < EDITOR) {
			return fail(401, { form });
		}

		// check if the slug exists already
		const existingSlug = await prisma().page.findUnique({
			where: {
				slug: form.data.slug
			}
		});
		if (existingSlug) {
			return setError(form, 'slug', 'This slug is already in use.');
		}

		const pageData: PageTree = {
			components: []
		};

		await prisma().page.create({
			data: {
				name: form.data.name,
				slug: form.data.slug,
				data: JSON.stringify(pageData)
			}
		});

		return { form };
	},
	delete: async (event) => {
		const user = await loadUser(event.cookies);
		if (!user) {
			return fail(401, {});
		}
		if (user.permissionLevel < EDITOR) {
			return fail(401, {});
		}

		await prisma().page.delete({
			where: {
				id: Number.parseInt((await event.request.formData()).get("id")!.toString())
			}
		});
	},
	rename: async (event) => {
		const user = await loadUser(event.cookies);
		if (!user) {
			return fail(401, {});
		}
		if (user.permissionLevel < EDITOR) {
			return fail(401, {});
		}

		let data = (await event.request.formData());

		await prisma().page.update({
			where: {
				id: Number.parseInt(data.get("id")!.toString())
			},
			data: {
				name: data.get("name")!.toString()
			}
		});
	},
	up: async (event) => {
		const user = await loadUser(event.cookies);
		if (!user) {
			return fail(401, {});
		}
		if (user.permissionLevel < EDITOR) {
			return fail(401, {});
		}

		let data = (await event.request.formData());

		await prisma().page.update({
			where: {
				id: Number.parseInt(data.get("id")!.toString())
			},
			data: {
				listPrio: { decrement: 1 }
			}
		});
	},
	down: async (event) => {
		const user = await loadUser(event.cookies);
		if (!user) {
			return fail(401, {});
		}
		if (user.permissionLevel < EDITOR) {
			return fail(401, {});
		}

		let data = (await event.request.formData());

		await prisma().page.update({
			where: {
				id: Number.parseInt(data.get("id")!.toString())
			},
			data: {
				listPrio: { increment: 1 }
			}
		});
	}
};
