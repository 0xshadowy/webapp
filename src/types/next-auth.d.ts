import NextAuth from 'next-auth';
import type { Profile } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken: string;
    expires: string;
    user: {
      image: string;
      name: string;
    };
    profile: Profile;
  }
}
