import { z } from 'zod';
import { createRouter } from '../create-router';

export const contributionRouter = createRouter().query('all', {
  async resolve({ ctx, input }) {
    return await ctx.prisma.shadower.findMany();
  },
});
