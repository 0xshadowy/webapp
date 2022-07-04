import { useEffect } from 'react';
import type { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { useGithubContext } from '@/contexts/github-context';

const Home: NextPage = () => {
  const { github } = useGithubContext();

  useEffect(() => {
    (async () => {
      if (!github) return;
      const data = await github?.getAuthenticatedUserRepositories();
      console.log('data', data);
    })();
  }, [github]);

  return (
    <div>
      <main>
        <h1>Hello</h1>
        <button onClick={() => signIn('github')}>Connect</button>
      </main>
    </div>
  );
};

export default Home;
