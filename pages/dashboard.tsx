import { trpc } from '../utils/trpc';

function Dashboard() {
  const users = trpc.useQuery(['users.all']);

  if (!users.data) {
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
