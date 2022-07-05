import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { FiExternalLink } from 'react-icons/fi';
import { AiOutlinePullRequest } from 'react-icons/ai';
import { VscIssues } from 'react-icons/vsc';
import { useContractWrite } from 'wagmi';
import Profile from '@/components/profile';
import type { Repository, Issue, PullRequest } from '@/types/types';
import { useGithubContext } from '@/contexts/github-context';
import { SHADOWER_ADDRESS } from '@/constants';
import ShadowerAbi from '@/abis/Shadower.json';

type ViewChoice = 'Issue' | 'PullRequest';

const Home: NextPage = () => {
  const [choice, setChoice] = useState<ViewChoice>('Issue');
  const [selectedRepository, setSelectedRepository] = useState<Repository>();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const { github, user } = useGithubContext();
  const { write } = useContractWrite({
    addressOrName: SHADOWER_ADDRESS,
    contractInterface: ShadowerAbi,
    functionName: 'registerContribution',
    args: [selectedRepository?.url, 2, 4],
  });
  const [issueTitle, setIssueTitle] = useState('');
  const [issueDescription, setIssueDescription] = useState('');

  useEffect(() => {
    (async () => {
      if (!user || !github || !selectedRepository) return;
      const issues = await github.getRepositoryIssues(selectedRepository.full_name);
      const pullRequests = await github.getRepositoryPullRequests(selectedRepository.full_name);
      setIssues(issues);
      setPullRequests(pullRequests);
    })();
  }, [user, github, selectedRepository]);

  if (!user) return null;

  const createIssue = () => {
    if (!github || !selectedRepository) return;
    write();
    github.createIssue(selectedRepository.full_name, issueTitle, issueDescription);
  };

  return (
    <main className="w-full flex">
      <Profile
        selectedRepositoryName={selectedRepository?.name}
        onRepositoryChange={(repository) => setSelectedRepository(repository)}
      />
      <div className="grow pt-12 px-8 space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl text-white">{selectedRepository?.name}</h1>
            <a href={selectedRepository?.html_url} rel="noopener noreferrer" target="_blank">
              <FiExternalLink size="1.2em" />
            </a>
          </div>
          <Switch choice={choice} setChoice={setChoice} />
        </div>

        <h2 className="text-xl">{choice === 'Issue' ? 'Issues' : 'Pull requests'}</h2>

        {choice === 'Issue' ? (
          <div className="space-y-4">
            {issues.map((issue) => (
              <div
                key={issue.id}
                className="flex items-center justify-between p-4 border-solid border-[0.5px] border-gray-700 rounded-xl hover:bg-slate-700 duration-300"
              >
                <a
                  href={issue.html_url}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="grow flex items-center"
                >
                  <div className="flex items-center space-x-4">
                    <VscIssues size="1.7em" color="orange" />
                    <div className="flex flex-col">
                      <p>{issue.title}</p>
                      <p>#{issue.number}</p>
                    </div>
                  </div>
                </a>
                <button className="flex items-center px-4 py-2 space-x-3 bg-gray-800 rounded-xl">
                  <AiOutlinePullRequest size="1.2em" />
                  <p className="text-sm">{'Create pull request'}</p>
                </button>
              </div>
            ))}
            <label
              htmlFor="my-modal"
              className="w-full flex items-center justify-center p-4 border-solid border-[0.5px] border-gray-700 rounded-xl hover:bg-slate-700 duration-300 cursor-pointer"
            >
              {'Create Issue'}
            </label>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box relative">
                <label htmlFor="my-modal" className="btn btn-sm btn-circle absolute right-2 top-2">
                  ✕
                </label>
                <h3 className="font-bold text-lg">Create a new Issue!</h3>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Title"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(val) => setIssueTitle(val.target.value)}
                  />
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Description"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(val) => setIssueDescription(val.target.value)}
                  />
                </div>

                <div className="modal-action">
                  <label htmlFor="my-modal" className="btn" onClick={createIssue}>
                    Create
                  </label>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {pullRequests.map((pullRequest) => (
              <div
                key={pullRequest.id}
                className="flex items-center justify-between p-4 border-solid border-[0.5px] border-gray-700 rounded-xl hover:bg-slate-700 duration-300"
              >
                <a
                  href={pullRequest.html_url}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="grow flex items-center"
                >
                  <div className="flex items-center space-x-4">
                    <VscIssues size="1.7em" color="orange" />
                    <div className="flex flex-col">
                      <p>{pullRequest.title}</p>
                      <p>#{pullRequest.number}</p>
                    </div>
                  </div>
                </a>
                <button className="flex items-center px-4 py-2 space-x-3 bg-gray-800 rounded-xl">
                  <AiOutlinePullRequest size="1.2em" />
                  <p className="text-sm">{'Create pull request'}</p>
                </button>
              </div>
            ))}
            <div className="w-full flex items-center justify-center p-4 border-solid border-[0.5px] border-gray-700 rounded-xl hover:bg-slate-700 duration-300 cursor-pointer">
              {'Create pull request'}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

type SwitchProps = {
  choice: ViewChoice;
  setChoice: (val: ViewChoice) => void;
};

const Switch = ({ choice, setChoice }: SwitchProps) => {
  return (
    <div className="p-1 bg-slate-800 rounded-xl">
      <button
        className={`btn btn-sm normal-case ${choice === 'Issue' ? 'bg-black' : ''}`}
        onClick={() => setChoice('Issue')}
      >
        Issues
      </button>
      <button
        className={`btn btn-sm normal-case ${choice === 'PullRequest' ? 'bg-black' : ''}`}
        onClick={() => setChoice('PullRequest')}
      >
        Pull requests
      </button>
    </div>
  );
};

export default Home;
