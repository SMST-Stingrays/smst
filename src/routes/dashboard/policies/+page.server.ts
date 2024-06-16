import type { PageServerLoad, Actions } from "./$types";
import { ADMIN } from '$lib/permissions';
import { loadUser } from '$lib/auth';
import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
import type { PageTree } from '$lib/dynamicSlot';

export const load: PageServerLoad = async ({parent}) => {
	const { user } = await parent();
	if (!user || user.permissionLevel < ADMIN) {
		return redirect(307, "/dashboard");
	}

	const policies = await prisma.policy.findMany({});

	console.log(policies);

	return {
		title: "Policies",
		policies,
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
		if (user.permissionLevel < ADMIN) {
			return fail(401, { form });
		}

		await prisma.policy.create({
			data: {
				code: form.data.code,
				title: form.data.title,
				url: form.data.url
			}
		});
	}
}