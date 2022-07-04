import { createRouter } from '../create-router';
import { userRouter } from './users';

/**
 * Create your application's root router
 * If you want to use SSG, you need export this
 * @link https://trpc.io/docs/ssg
 * @link https://trpc.io/docs/router
 */
export const appRouter = createRouter()
  .query('health', {
    async resolve() {
      return 'healthy!';
    },
  })
  .merge('users.', userRouter);

export type AppRouter = typeof appRouter;
