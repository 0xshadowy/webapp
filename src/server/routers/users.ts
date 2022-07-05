import { z } from 'zod';
import { createRouter } from '../create-router';

export const userRouter = createRouter()
  .query('all', {
    async resolve({ ctx }) {
      return await ctx.prisma.shadower.findMany({});
    },
  })
  .query('byId', {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.shadower.findUnique({ where: { id: input.id } });
    },
  })
  .query('byAddress', {
    input: z.object({
      address: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.shadower.findUnique({ where: { address: input.address } });
    },
  })
  .query('byHandle', {
    input: z.object({
      handle: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.shadower.findUnique({ where: { handle: input.handle } });
    },
  })
  .mutation('register', {
    input: z.object({
      address: z.string(),
      handle: z.string(),
      username: z.string(),
    }),
    async resolve({ ctx, input }) {
      console.log('input', input);
      /* await ctx.prisma.shadower.create({
        data: input,
      }); */
    },
  });
