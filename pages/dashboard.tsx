import { trpc } from '../utils/trpc';

function Dashboard() {
  const hello = trpc.useQuery(['hello', { text: 'world' }]);

  if (!hello.data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>{hello.data.greeting}</p>
      <button className="btn">Button</button>
    </div>
  );
}

export default Dashboard;
