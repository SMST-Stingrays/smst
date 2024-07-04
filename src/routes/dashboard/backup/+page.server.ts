import type { PageServerLoad, Actions } from './$types';
import { ADMIN } from '$lib/permissions';
import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db';
import type { Backup } from '$lib/backup';
import {
	DATABASE_URL,
	JWT_KEY,
	S3_ACCESS_KEY_ID,
	S3_ACCESS_KEY_SECRET,
	S3_BUCKET_BASE,
	S3_BUCKET_NAME, S3_ENDPOINT, S3_REGION
} from '$env/static/private';
import { loadUser } from '$lib/auth';

export const load: PageServerLoad = async ({ parent }) => {
	const { user } = await parent();
	if (!user || user.permissionLevel < ADMIN) {
		return redirect(307, '/dashboard');
	}

	// generate the export file
	const backup: Backup = {
		config: {
			database_url: DATABASE_URL,
			jwt_key: JWT_KEY,
			s3_access_key_id: S3_ACCESS_KEY_ID,
			s3_access_key_secret: S3_ACCESS_KEY_SECRET,
			s3_bucket_base: S3_BUCKET_BASE,
			s3_bucket_name: S3_BUCKET_NAME,
			s3_endpoint: S3_ENDPOINT,
			s3_region: S3_REGION
		},
		media: await prisma().media.findMany(),
		pages: await prisma().page.findMany(),
		policies: await prisma().policy.findMany(),
		users: await prisma().user.findMany(),
	};

	return {
		title: 'Backup',
		backup,
	};
};

export const actions: Actions = {
	import: async (event) => {
		const user = await loadUser(event.cookies);
		if (!user) {
			return fail(401);
		}
		if (user.permissionLevel < ADMIN) {
			return fail(401);
		}

		const json_str: Backup = JSON.parse((await event.request.formData()).get("d")!.toString());
		// last sanity check: env vars must match
		const vars = [
			[json_str.config.s3_bucket_base, S3_BUCKET_BASE],
			[json_str.config.s3_bucket_name, S3_BUCKET_NAME],
			[json_str.config.s3_endpoint, S3_ENDPOINT],
			[json_str.config.s3_access_key_secret, S3_ACCESS_KEY_SECRET],
			[json_str.config.s3_access_key_id, S3_ACCESS_KEY_ID],
			[json_str.config.s3_region, S3_REGION],
			[json_str.config.database_url, DATABASE_URL],
			[json_str.config.jwt_key, JWT_KEY]
		];
		for (const vari of vars) {
			if (vari[0] != vari[1]) {
				console.log("bailing! variables do not match in backup");
				return fail(499);
			}
		}

		// everything is OK, wipe the database and load from the backup
		console.log("loading backup");
		console.log(json_str);

		await prisma().page.deleteMany();
		for (const p of json_str.pages) {
			await prisma().page.create({
				data: p
			});
		}

		await prisma().policy.deleteMany();
		for (const p of json_str.policies) {
			await prisma().policy.create({
				data: p
			});
			console.log(p);
		}

		await prisma().token.deleteMany();
		await prisma().user.deleteMany();
		for (const p of json_str.users) {
			await prisma().user.create({
				data: p
			});
			console.log(p);
		}

		await prisma().media.deleteMany();
		for (const p of json_str.media) {
			await prisma().media.create({
				data: p
			});
			console.log(p);
		}

		// log out the user, their token is probably no longer valid anyway
		event.cookies.delete("token", { path: "/"});

		// redirect to homepage
		redirect(301, '/');
	}
}