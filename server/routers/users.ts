import { z } from 'zod';
import { createRouter } from '../create-router';

export const userRouter = createRouter().query('all', {
  async resolve({ ctx }) {
    return await ctx.prisma.shadower.findMany({});
  },
});
