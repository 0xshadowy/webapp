import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { AiFillHome, AiOutlineLogout } from 'react-icons/ai';
import { GoTelescope } from 'react-icons/go';

const navButtons = [
  {
    href: '/',
    Icon: AiFillHome,
  },
  {
    href: '/explore',
    Icon: GoTelescope,
  },
];

export const Sidebar = () => {
  return (
    <div className="w-[80px] flex flex-col items-center border-solid border-r-[0.5px] border-slate-700 justify-between py-4">
      <div className="flex flex-col items-center">
        {navButtons.map(({ href, Icon }) => (
          <Link key={href} href={href} passHref>
            <a className="my-4 p-4 rounded-[12px] hover:bg-slate-700 duration-200">
              {<Icon size="1.7em" />}
            </a>
          </Link>
        ))}
      </div>
      <button
        className="my-4 p-4 rounded-[12px] hover:bg-slate-700 duration-200"
        onClick={() => signOut()}
      >
        {<AiOutlineLogout size="1.7em" />}
      </button>
    </div>
  );
};

export default Sidebar;
