import React from 'react';
import Sidebar from '../sidebar';
import Profile from '../profile';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-screen h-screen flex">
      <Sidebar />
      <Profile />
      {children}
    </div>
  );
};

export default Layout;
