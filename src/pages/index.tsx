import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import { FiExternalLink } from 'react-icons/fi';
import Profile from '@/components/profile';
import type { Repository, Issue } from '@/types/types';
import { useGithubContext } from '@/contexts/github-context';

const Home: NextPage = () => {
  const [active, setActive] = useState<number>(0);
  const [selectedRepository, setSelectedRepository] = useState<Repository>();
  const [issues, setIssues] = useState<Issue[]>();
  const { github, user } = useGithubContext();

  useEffect(() => {
    (async () => {
      if (!user || !github || !selectedRepository) return;
      const issues = await github.getRepositoryIssues(user.name, selectedRepository.name);
      console.log('issues', issues);
      setIssues(issues);
    })();
  }, [user, github, selectedRepository]);

  return (
    <main className="w-full flex">
      <Profile
        selectedRepositoryName={selectedRepository?.name}
        onRepositoryChange={(repository) => setSelectedRepository(repository)}
      />
      <div className="grow py-4 px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl text-white">{selectedRepository?.name}</h1>
            <a href={selectedRepository?.html_url} rel="noopener noreferrer" target="_blank">
              <FiExternalLink size="1.2em" />
            </a>
          </div>
          <Switch active={active} setActive={(val) => setActive(val)} />
        </div>
      </div>
    </main>
  );
};

type SwitchProps = {
  active: number;
  setActive: (val: number) => void;
};

const Switch = ({ active, setActive }: SwitchProps) => {
  return (
    <div className="p-1 bg-slate-800 rounded-xl">
      <button
        className={`btn btn-sm normal-case ${active === 0 ? 'btn-active bg-black' : ''}`}
        onClick={() => setActive(0)}
      >
        Issues
      </button>
      <button
        className={`btn btn-sm normal-case ${active === 1 ? 'btn-active bg-black' : ''}`}
        onClick={() => setActive(1)}
      >
        Pull requests
      </button>
    </div>
  );
};

export default Home;
