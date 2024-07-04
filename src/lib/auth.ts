import type { Cookies } from '@sveltejs/kit';
import type { User } from '@prisma/client';
import { prisma } from '$lib/db';

export async function loadUser(cookies: Cookies): Promise<User | null> {
	const token = cookies.get('token');
	if (token) {
		const token2 = await prisma.token.findUnique({
			where: {
				id: token
			},
			include: {
				user: true
			}
		});
		if (token2) {
			return token2.user;
		} else {
			return null;
		}
	} else {
		return null;
	}
}
