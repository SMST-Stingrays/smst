import type { PageServerLoad, Actions } from './$types';
import { ADMIN, EDITOR } from '$lib/permissions';
import { loadUser } from '$lib/auth';
import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
import { updateFormSchema } from './updateFormSchema';

export const load: PageServerLoad = async ({ parent }) => {
	const { user } = await parent();
	if (!user || user.permissionLevel < ADMIN) {
		return redirect(307, '/dashboard');
	}

	const policies = await prisma().sponsor.findMany({
		orderBy: [
			{ listPrio: 'asc' }
		]
	});

	return {
		title: 'Sponsors',
		policies,
		form: await superValidate(zod(formSchema)),
		updateForm: await superValidate(zod(updateFormSchema))
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
		if (user.permissionLevel < ADMIN) {
			return fail(401, { form });
		}

		await prisma().sponsor.create({
			data: {
				name: form.data.name,
				logoUrl: form.data.logoUrl,
				sponsorLink: form.data.sponsorUrl
			}
		});

		return { form };
	},
	update: async (event) => {
		const form = await superValidate(event, zod(updateFormSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		const user = await loadUser(event.cookies);
		if (!user) {
			return fail(401, { form });
		}
		if (user.permissionLevel < ADMIN) {
			return fail(401, { form });
		}

		await prisma().sponsor.update({
			where: {
				id: form.data.id
			},
			data: {
				name: form.data.name,
				logoUrl: form.data.logoUrl,
				sponsorLink: form.data.sponsorLink
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

		await prisma().sponsor.delete({
			where: {
				id: Number.parseInt((await event.request.formData()).get("id")!.toString())
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

		await prisma().sponsor.update({
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

		await prisma().sponsor.update({
			where: {
				id: Number.parseInt(data.get("id")!.toString())
			},
			data: {
				listPrio: { increment: 1 }
			}
		});
	},
};
