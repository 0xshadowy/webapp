import { createContext, useContext } from 'react';
import { useSession } from 'next-auth/react';
import Github from '@/lib/github';

type GithubUser = {
  name: string;
  image: string;
  followers: number;
};

type Context = {
  github: Github | null;
  user: GithubUser | null;
};

const GithubContext = createContext<Context>({
  github: null,
  user: null,
});

export const GithubContextProvider = (props: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  let github: Context['github'] = null;
  let user: Context['user'] = null;
  if (session?.accessToken) {
    github = new Github(session.accessToken);
    user = {
      ...session.user,
      // @ts-expect-error
      followers: session.profile.followers,
    };
  }
  return <GithubContext.Provider value={{ github, user }}>{props.children}</GithubContext.Provider>;
};

export const useGithubContext = () => useContext<Context>(GithubContext);
