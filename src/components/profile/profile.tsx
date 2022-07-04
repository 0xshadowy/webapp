import { useSession } from 'next-auth/react';

type SurfaceProps = {
  text: string;
  value: string;
};

const Surface = (props: SurfaceProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-[100px] w-[100px] p-2 rounded-xl bg-gray-800">
      <div className="grow">
        <p className="text-sm">{props.text}</p>
      </div>
      <div className="w-full flex justify-end pr-1">
        <p>{props.value}</p>
      </div>
    </div>
  );
};

export const Profile = () => {
  const { data } = useSession();
  if (!data) return <div>Loading...</div>;
  return (
    <div className="flex flex-col w-[500px] border-solid border-r-[0.5px] px-2">
      <div className="flex w-full h-[150px] items-center justify-between">
        <div className="flex items-center space-x-2">
          <div>
            <div className="avatar">
              <div className="w-24 mask mask-hexagon">
                <img src={data.user.image} />
              </div>
            </div>
          </div>
          <div>
            <p className="text-2xl text-white">{data.user.name}</p>
            {/* @ts-expect-error */}
            <p>{data.profile.followers} followers</p>
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
      <div className="mt-10">
        <div className="text-lg uppercase">Repositories</div>
      </div>
    </div>
  );
};

export default Profile;
