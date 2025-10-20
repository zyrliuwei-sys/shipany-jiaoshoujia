import { betterAuth } from 'better-auth';

import { isCloudflareWorker } from '@/shared/lib/env';

import { getAuthOptions } from './config';

// global auth instance
let authInstance: Awaited<ReturnType<typeof getAuth>> | null = null;

// Dynamic auth - with full database configuration
// Always use this in API routes that need database access
export async function getAuth(): Promise<
  Awaited<ReturnType<typeof betterAuth>>
> {
  if (isCloudflareWorker) {
    return betterAuth(await getAuthOptions());
  }

  // singleton mode only when not in Cloudflare Workers
  if (!authInstance) {
    authInstance = betterAuth(await getAuthOptions());
  }
  return authInstance;
}
