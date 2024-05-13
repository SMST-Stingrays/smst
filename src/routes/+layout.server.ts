import type { LayoutServerLoad } from "./$types";
import { prisma } from '$lib/db';
import jwt from "jsonwebtoken";
import { JWT_KEY } from '$env/static/private';

export const load: LayoutServerLoad = async ({cookies}) => {
	let token = cookies.get("token");
	if (token) {
		let decoded = jwt.verify(token, JWT_KEY);
		let user = await prisma.user.findUnique({
			where: {
				// @ts-ignore
				id: decoded.id
			}
		});
		if (user) {
			return {
				user: user
			}
		} else {
			return {
				user: null
			}
		}
	} else {
		return {
			user: null
		}
	}
}