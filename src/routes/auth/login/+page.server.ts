import type { PageServerLoad, Actions } from './$types';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db';
import { VISITOR } from '$lib/permissions';
import { JWT_KEY } from '$env/static/private';
import { nanoid } from 'nanoid';
import { compareSync } from 'bcrypt-ts/browser';

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

		const existing_user = await prisma.user.findUnique({
			where: {
				username: form.data.username
			}
		});

		if (!existing_user) {
			return setError(form, 'username', 'This username does not exist.');
		}

		try {
			const valid = compareSync(form.data.password, existing_user.password);

			if (!valid) {
				return setError(form, 'password', 'Incorrect password');
			}

			const token = nanoid();
			await prisma.token.create({
				data: {
					userId: existing_user.id,
					id: token
				}
			});

			event.cookies.set('token', token, { path: '/' });
		} catch (e) {
			console.log(e);
			return setError(
				form,
				'password',
				'There was an error processing your login. Please try again later.'
			);
		}

		redirect(307, '/');
	}
};
