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
import { encode } from "blurhash";
import { getPixels } from '@unpic/pixels';
import type { Media } from '@prisma/client';

export const load: PageServerLoad = async ({ parent }) => {
	const { user } = await parent();
	if (!user || user.permissionLevel < EDITOR) {
		return redirect(307, '/dashboard');
	}

	const galleryPhotos = await prisma().media.findMany({
		where: {
			type: "galleryPhoto"
		}
	});
	const photos = await prisma().media.findMany({
		where: {
			type: "photo"
		}
	});
	const policies = await prisma().media.findMany({
		where: {
			type: "policy"
		}
	});

	return {
		title: 'Media',
		media: {
			galleryPhoto: galleryPhotos,
			photo: photos,
			policy: policies
		},
		form: await superValidate(zod(formSchema)),
	};
};

export const actions: Actions = {
	create: async (event) => {
		console.log("Got media ul req");
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			console.log("form invalid :(");
			return fail(400, withFiles({ form }));
		}

		console.log("form validated");

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

			const data = await file.arrayBuffer();

			const command = new PutObjectCommand({
				Bucket: S3_BUCKET_NAME,
				Key: key,
				// @ts-expect-error it works fine, shut up
				Body: data
			});

			await S3.send(command);

			let queryString = "";

			if (form.data.type === "photo" || form.data.type === "galleryPhoto") {
				// image, calculate blurhash and append it to the URL
				console.log("img upload: parsing");
				const imageData = await getPixels(data);
				console.log("img upload: clamping");
				const pdata = new Uint8ClampedArray(imageData.data);
				console.log("img upload: hashing");
				const hash = encode(pdata, imageData.width, imageData.height, 4, 4);
				const urlparams = new URLSearchParams();
				urlparams.set("bh", hash);
				urlparams.set("w", String(imageData.width));
				urlparams.set("h", String(imageData.height));
				urlparams.set("cx", "4");
				urlparams.set("cy", "4");
				queryString = `?${urlparams.toString()}`;
			}

			console.log("upload: writing");

			await prisma().media.create({
				data: {
					type: form.data.type,
					title: file.name,
					url: S3_BUCKET_BASE + key + queryString
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
	},
	optimizeMany: async (event) => {
		const user = await loadUser(event.cookies);
		if (!user) {
			return fail(401, {});
		}
		if (user.permissionLevel < EDITOR) {
			return fail(401, {});
		}

		const ids: number[] = JSON.parse((await event.request.formData()).get("id")!.toString());

		const cl = prisma();

		console.log("optimizing media");
		console.log(ids);

		let medias = await cl.media.findMany({});

		let fns = [];

		let total = ids.length;
		let i = 0;

		for (const id of ids) {
			i++;
			let media: Media | undefined = undefined;
			for (let m of medias) {
				if (m.id === id) {
					media = m;
				}
			}
			if (media === undefined) continue;
			if (!media.url.includes('?bh=')) {
				if (media.type === "photo" || media.type === "galleryPhoto") {
					let i2 = `${i}`;
					fns.push((async () => {
						console.log(`${i2}/${total} optimizing ${media.url} - load`);
						// image, calculate blurhash and append it to the URL
						const imageData = await getPixels(media.url);
						console.log(`${i2}/${total} optimizing ${media.url} - clamp`);
						const pdata = new Uint8ClampedArray(imageData.data);

						console.log(`${i2}/${total} optimizing ${media.url} - hash`);
						const hash = encode(pdata, imageData.width, imageData.height, 4, 4);
						console.log(`${i2}/${total} optimizing ${media.url} - urlencode`);
						let url = `${media.url}?bh=${hash}`;
						console.log(`${i2}/${total} optimizing ${media.url} - rewrite to ${url}`);
						await cl.media.update({
							where: {
								id: id
							},
							data: {
								url
							}
						});
					})());
				}
			}
		}
		await Promise.all(fns);
	}
};
