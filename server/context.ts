import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { prisma } from './prisma';

export const createContext = async ({ req, res }: trpcNext.CreateNextContextOptions) => {
  return { req, res, prisma };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
