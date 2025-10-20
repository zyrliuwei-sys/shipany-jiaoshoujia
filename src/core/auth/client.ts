import { createAuthClient } from 'better-auth/react';

import { envConfigs } from '@/config';

// auth client for client-side use
export const authClient = createAuthClient({
  baseURL: envConfigs.auth_url,
  secret: envConfigs.auth_secret,
});

export const { signIn, signUp, signOut, useSession } = authClient;
