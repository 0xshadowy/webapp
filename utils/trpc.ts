import { createReactQueryHooks } from '@trpc/react';
import type { AppRouter } from '@/api/trpc/[trpc]';

export const trpc = createReactQueryHooks<AppRouter>();
