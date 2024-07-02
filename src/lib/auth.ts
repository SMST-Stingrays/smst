import type { Cookies } from '@sveltejs/kit';
import type { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { JWT_KEY } from '$env/static/private';
import { prisma } from '$lib/db';

export async function loadUser(cookies: Cookies): Promise<User | null> {
	const token = cookies.get('token');
	if (token) {
		const decoded = jwt.verify(token, JWT_KEY);
		const user = await prisma.user.findUnique({
			where: {
				// @ts-ignore
				id: decoded.id
			}
		});
		if (user) {
			return user;
		} else {
			return null;
		}
	} else {
		return null;
	}
}
