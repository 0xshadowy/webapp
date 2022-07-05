import { z } from 'zod';
import { createRouter } from '../create-router';

export const repositoryRouter = createRouter()
  .query('all', {
    async resolve({ ctx }) {
      return await ctx.prisma.repository.findMany();
    },
  })
  .query('byFullUrl', {
    input: z.object({
      fullURL: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.repository.findUnique({ where: { fullURL: input.fullURL } });
    },
  });
