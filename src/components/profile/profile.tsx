import { useState, useEffect } from 'react';
import { AiOutlinePullRequest } from 'react-icons/ai';
import { VscIssues } from 'react-icons/vsc';
import { BiGitMerge } from 'react-icons/bi';
import { useContractRead, useContractWrite, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { useGithubContext } from '@/contexts/github-context';
import { useWeb3Context } from '@/contexts/web3-context';
import Switch from '@/components/switch';
import type { Repository } from '@/types/types';
import { trpc } from '@/utils/trpc';
import { SHADOWER_ADDRESS } from '@/constants';
import ShadowerAbi from '@/abis/Shadower.json';

type ProfileProps = {
  selectedRepositoryName: string | undefined;
  onRepositoryChange: (repository: Repository) => void;
};

type ViewChoice = 'account' | 'organizations';

export const Profile = ({ selectedRepositoryName, onRepositoryChange }: ProfileProps) => {
  const [viewChoice, setViewChoice] = useState<ViewChoice>('account');
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const { github, user } = useGithubContext();
  const { address, isConnected } = useWeb3Context();
  const { connect } = useConnect({ connector: new InjectedConnector() });
  const { disconnect } = useDisconnect();
  const { data: isAShad } = useContractRead({
    addressOrName: SHADOWER_ADDRESS,
    contractInterface: ShadowerAbi,
    functionName: 'isAShad',
    args: [address],
  });
  const { write } = useContractWrite({
    addressOrName: SHADOWER_ADDRESS,
    contractInterface: ShadowerAbi,
    functionName: 'registerAShad',
    args: [user?.name, user?.name],
  });

  const userMutation = trpc.useMutation(['users.register']);

  useEffect(() => {
    (async () => {
      if (!github) return;
      // lel
      const repos =
        viewChoice === 'account'
          ? await github.getAuthenticatedUserRepositories()
          : await github.getOrganizationRepositories('0xshadowy');
      setRepositories(repos);
      onRepositoryChange(repos[0]);
    })();
  }, [github, viewChoice]);

  const registerShadower = () => {
    if (!address || !user) return;
    userMutation.mutate({ address, handle: user.name, username: user.name });
    write();
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="flex flex-col w-[650px] border-solid border-r-[0.5px] border-slate-700 px-4 overflow-auto">
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
        <div className="space-x-2">
          {isConnected && !isAShad && (
            <button className="btn btn-secondary btn-sm" onClick={registerShadower}>
              Register
            </button>
          )}
          <button
            className="btn btn-primary btn-sm"
            onClick={() => (isConnected ? disconnect() : connect())}
          >
            {isConnected ? 'Disconnect' : 'Connect wallet'}
          </button>
        </div>
      </div>

      <div className="flex justify-between">
        <Surface text="Repositories" value="0" />
        <Surface text="Issues" value="0" />
        <Surface text="Pull Requests" value="0" />
        <Surface text="Merges" value="0" />
      </div>

      <div className="mt-10 space-y-4">
        <div className="flex justify-between">
          <div className="text-lg">Repositories</div>
          <Switch choice={viewChoice} setChoice={setViewChoice} />
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
                <RepositoryIcon value={0}>
                  <AiOutlinePullRequest size="1.4em" />
                </RepositoryIcon>
                <RepositoryIcon value={0}>
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

const Surface = ({ text, value }: SurfaceProps) => {
  return (
    <div className="w-[140px] flex justify-between py-2 px-3 rounded-xl bg-gray-800">
      <p className="text-sm">{text}</p>
      <p className="text-sm">{value}</p>
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
