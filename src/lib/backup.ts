import type { Media, Page, Policy, User } from '@prisma/client';

export interface Backup {
	pages: Page[],
	users: User[],
	policies: Policy[],
	media: Media[],
	config: {
		database_url: string,
		jwt_key: string,
		s3_access_key_id: string,
		s3_access_key_secret: string,
		s3_region: string,
		s3_endpoint: string,
		s3_bucket_name: string,
		s3_bucket_base: string,
	}
}