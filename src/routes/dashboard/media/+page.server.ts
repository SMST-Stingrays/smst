import type { PageServerLoad, Actions } from './$types';
import { ADMIN, EDITOR } from '$lib/permissions';
import { loadUser } from '$lib/auth';
import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db';
import { superValidate, withFiles } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { S3_BUCKET_NAME } from '$env/static/private';
import { nanoid } from 'nanoid';
import { S3 } from '$lib/s3';
import { S3_BUCKET_BASE } from "$env/static/private";

export const load: PageServerLoad = async ({ parent }) => {
	const { user } = await parent();
	if (!user || user.permissionLevel < EDITOR) {
		return redirect(307, '/dashboard');
	}

	const media = await prisma().media.findMany({});

	return {
		title: 'Media',
		media,
		form: await superValidate(zod(formSchema)),
	};
};

export const actions: Actions = {
	create: async (event) => {
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			return fail(400, withFiles({ form }));
		}

		const user = await loadUser(event.cookies);
		if (!user) {
			return fail(401, withFiles({ form }));
		}
		if (user.permissionLevel < EDITOR) {
			return fail(401, withFiles({ form }));
		}

		for (const file of form.data.file) {
			console.log(`Media Upload: Processing ${file.name}`);
			const key = `${form.data.type}/${nanoid()}/${file.name}`;

			const command = new PutObjectCommand({
				Bucket: S3_BUCKET_NAME,
				Key: key,
				// @ts-expect-error it works fine, shut up
				Body: await file.arrayBuffer()
			});

			await S3.send(command);
			await prisma().media.create({
				data: {
					type: form.data.type,
					title: file.name,
					url: S3_BUCKET_BASE + key
				}
			});
		}

		return withFiles({ form });
	},
	delete: async (event) => {
		const user = await loadUser(event.cookies);
		if (!user) {
			return fail(401, {});
		}
		if (user.permissionLevel < EDITOR) {
			return fail(401, {});
		}

		await prisma().media.delete({
			where: {
				id: Number.parseInt((await event.request.formData()).get("id")!.toString())
			}
		});
	},
	deleteMany: async (event) => {
		const user = await loadUser(event.cookies);
		if (!user) {
			return fail(401, {});
		}
		if (user.permissionLevel < EDITOR) {
			return fail(401, {});
		}

		const ids: number[] = JSON.parse((await event.request.formData()).get("id")!.toString());

		for (const id of ids) {
			await prisma().media.delete({
				where: {
					id
				}
			});
		}
	}
};
