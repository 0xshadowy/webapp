import { useState, useEffect } from 'react';
import { AiOutlinePullRequest } from 'react-icons/ai';
import { VscIssues } from 'react-icons/vsc';
import { BiGitMerge } from 'react-icons/bi';
import { useGithubContext } from '@/contexts/github-context';
import Switch from '@/components/switch';
import type { Repository } from '@/types/types';

type ProfileProps = {
  selectedRepositoryName: string | undefined;
  onRepositoryChange: (repository: Repository) => void;
};

export const Profile = ({ selectedRepositoryName, onRepositoryChange }: ProfileProps) => {
  const [active, setActive] = useState<number>(0);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const { github, user } = useGithubContext();

  useEffect(() => {
    (async () => {
      if (!github) return;
      const repos = await github.getAuthenticatedUserRepositories();
      console.log('repos', repos);
      setRepositories(repos);
      onRepositoryChange(repos[0]);
    })();
  }, [github]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="flex flex-col w-[600px] border-solid border-r-[0.5px] border-slate-700 px-4 overflow-auto">
      <div className="flex w-full h-[150px] items-center justify-between">
        <div className="flex items-center space-x-2">
          <div>
            <div className="avatar">
              <div className="w-24 mask mask-hexagon">
                <img src={user.image} />
              </div>
            </div>
          </div>
          <div>
            <p className="text-2xl text-white">{user.name}</p>
            <p>{user.followers} followers</p>
          </div>
        </div>
        <button className="btn btn-primary btn-sm">Connect Wallet</button>
      </div>
      <div className="flex justify-between">
        <Surface text="Repositories" value="2" />
        <Surface text="Issues" value="25" />
        <Surface text="Pull Requests" value="10" />
        <Surface text="Merges" value="6" />
      </div>
      <div className="mt-10 space-y-4">
        <div className="flex justify-between">
          <div className="text-lg">Repositories</div>
          <Switch active={active} setActive={(val) => setActive(val)} />
        </div>
        <div className="space-y-5">
          {repositories.map((repository) => (
            <div
              key={repository.name}
              className={`flex items-center justify-between p-4 border-solid border-[0.5px] border-gray-700 rounded-xl hover:bg-slate-700 duration-200 cursor-pointer ${
                selectedRepositoryName === repository.name ? 'bg-slate-700' : ''
              }`}
              onClick={() => {
                onRepositoryChange(repository);
              }}
            >
              <p>{repository.name}</p>
              <div className="flex space-x-3">
                <RepositoryIcon value={repository.open_issues_count}>
                  <VscIssues size="1.4em" />
                </RepositoryIcon>
                <RepositoryIcon value={3}>
                  <AiOutlinePullRequest size="1.4em" />
                </RepositoryIcon>
                <RepositoryIcon value={5}>
                  <BiGitMerge size="1.4em" />
                </RepositoryIcon>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

type SurfaceProps = {
  text: string;
  value: string;
};

const Surface = (props: SurfaceProps) => {
  return (
    <div className="flex flex-col justify-between items-center h-[100px] w-[100px] p-2 rounded-xl bg-gray-800">
      <div className="w-full flex justify-start">
        <p className="text-sm">{props.text}</p>
      </div>
      <div className="w-full flex justify-end pr-1">
        <p>{props.value}</p>
      </div>
    </div>
  );
};

type RepositoryIconProps = {
  value: number;
  children: React.ReactNode;
};

const RepositoryIcon = ({ value, children }: RepositoryIconProps) => {
  return (
    <div className="flex items-center space-x-1">
      {children} <p>{value}</p>
    </div>
  );
};

export default Profile;
