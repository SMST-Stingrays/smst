import { PrismaClient } from '@prisma/client';
import { neonConfig, Pool } from '@neondatabase/serverless';
import ws from 'ws'
import { DATABASE_URL } from '$env/static/private';
import { PrismaNeon } from '@prisma/adapter-neon';

export function prisma() {
	neonConfig.webSocketConstructor = ws;
	const pool = new Pool({ connectionString: DATABASE_URL });
	const adapter = new PrismaNeon(pool);

	return new PrismaClient({ adapter });
}