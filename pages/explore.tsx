import { trpc } from '../utils/trpc';
import { useWeb3Context } from '@/contexts/web3-context';

function Dashboard() {
  const { address } = useWeb3Context();
  console.log('address', address);
  const users = trpc.useQuery(['users.all']);

  if (users.isLoading || !users.data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        {users.data.map(({ id, username }) => {
          return <div key={id}>{username}</div>;
        })}
      </div>
      <button className="btn">Button</button>
    </div>
  );
}

export default Dashboard;
