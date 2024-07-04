import type { PageServerLoad, Actions } from './$types';
import { ADMIN, EDITOR } from '$lib/permissions';
import { loadUser } from '$lib/auth';
import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
import { updateFormSchema } from './updateFormSchema';
import { resetFormSchema } from './resetFormSchema';
import { hashSync } from 'bcrypt-ts/browser';

export const load: PageServerLoad = async ({ parent }) => {
	const { user } = await parent();
	if (!user || user.permissionLevel < ADMIN) {
		return redirect(307, '/dashboard');
	}

	const users = await prisma.user.findMany({});

	return {
		title: 'Users',
		users,
		form: await superValidate(zod(formSchema)),
		updateForm: await superValidate(zod(updateFormSchema)),
		resetForm: await superValidate(zod(resetFormSchema))
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

		await prisma.user.create({
			data: {
				first_name: form.data.first_name,
				last_name: form.data.last_name,
				username: form.data.username,
				password: hashSync(form.data.password, 8),
				permissionLevel: form.data.permissionLevel
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

		await prisma.user.update({
			where: {
				id: form.data.id
			},
			data: {
				first_name: form.data.first_name,
				last_name: form.data.last_name,
				username: form.data.username,
				permissionLevel: form.data.permissionLevel,
			}
		});

		return { form };
	},
	reset: async (event) => {
		const form = await superValidate(event, zod(resetFormSchema));
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

		console.log(form.data);

		await prisma.user.update({
			where: {
				id: form.data.id
			},
			data: {
				password: hashSync(form.data.password, 8)
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

		await prisma.user.delete({
			where: {
				id: Number.parseInt((await event.request.formData()).get("id")!.toString())
			}
		});
	}
};
