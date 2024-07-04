import { S3_REGION, S3_ENDPOINT, S3_ACCESS_KEY_ID, S3_ACCESS_KEY_SECRET } from '$env/static/private';
import { S3Client } from '@aws-sdk/client-s3';

export const S3 = new S3Client({
	region: S3_REGION,
	endpoint: S3_ENDPOINT,
	credentials: {
		accessKeyId: S3_ACCESS_KEY_ID,
		secretAccessKey: S3_ACCESS_KEY_SECRET,
	}
});