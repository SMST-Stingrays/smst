import type { PageServerLoad, Actions } from './$types';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db';
import { VISITOR } from '$lib/permissions';
import { JWT_KEY } from '$env/static/private';
import { nanoid } from 'nanoid';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		console.log('here');
		const form = await superValidate(event, zod(formSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		if (form.data.password !== form.data.password_confirm) {
			setError(form, 'password_confirm', 'The passwords do not match');
			return setError(form, 'password', 'The passwords do not match');
		}

		const existing_user = await prisma.user.findUnique({
			where: {
				username: form.data.username
			}
		});

		if (existing_user) {
			return setError(form, 'username', 'This username is already in use.');
		}

		try {
			const p_hash = await Bun.password.hash(form.data.password);

			const user = await prisma.user.create({
				data: {
					username: form.data.username,
					password: p_hash,
					permissionLevel: VISITOR,
					first_name: form.data.first_name,
					last_name: form.data.last_name
				}
			});

			const token = nanoid();
			await prisma.token.create({
				data: {
					userId: user.id,
					id: token
				}
			});

			event.cookies.set('token', token, { path: '/' });
		} catch (e) {
			return setError(
				form,
				'password',
				'There was an error processing your signup. Please try again later.'
			);
		}

		redirect(307, '/');
	}
};
