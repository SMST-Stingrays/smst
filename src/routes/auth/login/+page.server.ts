import type { PageServerLoad, Actions } from './$types';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
import { fail, redirect } from '@sveltejs/kit';
import { hash, verify } from 'argon2';
import { prisma } from '$lib/db';
import { VISITOR } from '$lib/permissions';
import jwt from 'jsonwebtoken';
import { JWT_KEY } from '$env/static/private';

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
			const valid = await verify(existing_user.password, form.data.password);

			if (!valid) {
				return setError(form, 'password', 'Incorrect password');
			}

			const token = jwt.sign(
				{
					id: existing_user.id
				},
				JWT_KEY
			);

			event.cookies.set('token', token, { path: '/' });
		} catch (e) {
			return setError(
				form,
				'password',
				'There was an error processing your login. Please try again later.'
			);
		}

		redirect(307, '/');
	}
};
